import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertJobSchema, insertApplicationSchema, insertPaymentSchema } from "@shared/schema";
import { z } from "zod";
import Razorpay from "razorpay";
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SIDzkLGGibqEns";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "Z0Bh3UCPSCAet8FSu9CrfA9a";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Job routes
  app.post('/api/jobs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const jobData = insertJobSchema.parse({
        ...req.body,
        employerId: userId,
      });

      const job = await storage.createJob(jobData);
      res.json(job);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(400).json({ message: "Failed to create job" });
    }
  });

  app.get('/api/jobs', async (req, res) => {
    try {
      const {
        search,
        location,
        type,
        experience,
        page = "1",
        limit = "10",
      } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;

      const result = await storage.getJobs({
        search: search as string,
        location: location as string,
        type: type as string,
        experience: experience as string,
        limit: limitNum,
        offset,
      });

      res.json({
        jobs: result.jobs,
        total: result.total,
        page: pageNum,
        totalPages: Math.ceil(result.total / limitNum),
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get('/api/jobs/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJob(id);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  app.get('/api/jobs/employer/:employerId', isAuthenticated, async (req: any, res) => {
    try {
      const employerId = req.params.employerId;
      const userId = req.user.claims.sub;

      // Only allow users to view their own jobs
      if (employerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const result = await storage.getJobs({ employerId });
      res.json(result.jobs);
    } catch (error) {
      console.error("Error fetching employer jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.put('/api/jobs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.employerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updates = insertJobSchema.partial().parse(req.body);
      const updatedJob = await storage.updateJob(id, updates);
      
      res.json(updatedJob);
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(400).json({ message: "Failed to update job" });
    }
  });

  app.delete('/api/jobs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.employerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const deleted = await storage.deleteJob(id);
      
      if (deleted) {
        res.json({ message: "Job deleted successfully" });
      } else {
        res.status(404).json({ message: "Job not found" });
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ message: "Failed to delete job" });
    }
  });

  // Application routes
  app.post('/api/applications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applicationData = insertApplicationSchema.parse({
        ...req.body,
        applicantId: userId,
      });

      const application = await storage.createApplication(applicationData);
      res.json(application);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(400).json({ message: "Failed to create application" });
    }
  });

  app.get('/api/applications/job/:jobId', isAuthenticated, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const userId = req.user.claims.sub;

      // Check if user is the employer of this job
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.employerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const applications = await storage.getApplicationsByJob(jobId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.get('/api/applications/user/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.params.userId;
      const requesterId = req.user.claims.sub;

      // Only allow users to view their own applications
      if (userId !== requesterId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const applications = await storage.getApplicationsByUser(userId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching user applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.put('/api/applications/:id/status', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const userId = req.user.claims.sub;

      const application = await storage.getApplication(id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Check if user is the employer of this job
      const job = await storage.getJob(application.jobId);
      if (!job || job.employerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedApplication = await storage.updateApplicationStatus(id, status);
      res.json(updatedApplication);
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(400).json({ message: "Failed to update application status" });
    }
  });

  // Payment routes
  app.post('/api/payments/create-order', isAuthenticated, async (req: any, res) => {
    try {
      const { jobId, amount = 100 } = req.body; // 1 INR in paise
      const userId = req.user.claims.sub;

      // Create payment record
      const payment = await storage.createPayment({
        jobId,
        employerId: userId,
        amount: (amount / 100).toString(), // Convert paise to rupees
        currency: "INR",
        status: "pending",
      });

      // Create real Razorpay order
      const order = await razorpay.orders.create({
        amount: amount, // amount in paise
        currency: "INR",
        receipt: `job_${jobId}_${Date.now()}`,
        notes: {
          jobId: jobId.toString(),
          employerId: userId,
          paymentId: payment.id.toString(),
        },
      });

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
        paymentId: payment.id,
      });
    } catch (error) {
      console.error("Error creating payment order:", error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  app.post('/api/payments/verify', isAuthenticated, async (req: any, res) => {
    try {
      const { paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
      const userId = req.user.claims.sub;

      const payment = await storage.getPayment(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      if (payment.employerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Verify Razorpay signature
      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        return res.status(400).json({ message: "Invalid payment signature" });
      }

      // Verify payment with Razorpay
      const razorpayPayment = await razorpay.payments.fetch(razorpayPaymentId);
      
      if (razorpayPayment.status !== "captured") {
        return res.status(400).json({ message: "Payment not captured" });
      }

      // Update payment status
      const updatedPayment = await storage.updatePaymentStatus(
        paymentId,
        "completed",
        razorpayPaymentId
      );

      // Update job status to active
      await storage.updateJob(payment.jobId, {
        status: "active",
        paymentId: razorpayPaymentId,
        paymentStatus: "completed",
      });

      res.json({ success: true, payment: updatedPayment });
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  app.get('/api/payments/user/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.params.userId;
      const requesterId = req.user.claims.sub;

      // Only allow users to view their own payments
      if (userId !== requesterId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const payments = await storage.getPaymentsByUser(userId);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching user payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Dashboard stats
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;

      const { jobs: userJobs } = await storage.getJobs({ employerId: userId });
      const payments = await storage.getPaymentsByUser(userId);
      
      let totalApplications = 0;
      let pendingApplications = 0;

      for (const job of userJobs) {
        const applications = await storage.getApplicationsByJob(job.id);
        totalApplications += applications.length;
        pendingApplications += applications.filter(app => app.status === "pending").length;
      }

      const totalSpent = payments
        .filter(p => p.status === "completed")
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);

      const stats = {
        activeJobs: userJobs.filter(job => job.status === "active").length,
        totalApplications,
        pendingReview: pendingApplications,
        totalSpent: totalSpent * 100, // Convert to paise for display
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
