import {
  users,
  jobs,
  applications,
  payments,
  type User,
  type UpsertUser,
  type InsertJob,
  type Job,
  type InsertApplication,
  type Application,
  type InsertPayment,
  type Payment,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, count } from "drizzle-orm";

export interface IStorage {
  // User operations - Required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Job operations
  createJob(job: InsertJob): Promise<Job>;
  getJob(id: number): Promise<Job | undefined>;
  getJobs(filters?: {
    search?: string;
    location?: string;
    type?: string;
    experience?: string;
    status?: string;
    employerId?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ jobs: Job[]; total: number }>;
  updateJob(id: number, updates: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: number): Promise<boolean>;
  
  // Application operations
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationsByJob(jobId: number): Promise<Application[]>;
  getApplicationsByUser(userId: string): Promise<Application[]>;
  updateApplicationStatus(id: number, status: string): Promise<Application | undefined>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentByJobId(jobId: number): Promise<Payment | undefined>;
  updatePaymentStatus(id: number, status: string, razorpayPaymentId?: string): Promise<Payment | undefined>;
  getPaymentsByUser(userId: string): Promise<Payment[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Job operations
  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db.insert(jobs).values(job).returning();
    return newJob;
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job;
  }

  async getJobs(filters: {
    search?: string;
    location?: string;
    type?: string;
    experience?: string;
    status?: string;
    employerId?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ jobs: Job[]; total: number }> {
    const {
      search,
      location,
      type,
      experience,
      status = "active",
      employerId,
      limit = 10,
      offset = 0,
    } = filters;

    let query = db.select().from(jobs);
    let countQuery = db.select({ count: count() }).from(jobs);

    const conditions = [];

    if (status) {
      conditions.push(eq(jobs.status, status));
    }

    if (employerId) {
      conditions.push(eq(jobs.employerId, employerId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(jobs.title, `%${search}%`),
          ilike(jobs.company, `%${search}%`),
          ilike(jobs.description, `%${search}%`)
        )
      );
    }

    if (location) {
      conditions.push(ilike(jobs.location, `%${location}%`));
    }

    if (type) {
      conditions.push(eq(jobs.type, type));
    }

    if (experience) {
      conditions.push(eq(jobs.experience, experience));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
      countQuery = countQuery.where(and(...conditions));
    }

    const [jobResults, countResult] = await Promise.all([
      query.orderBy(desc(jobs.createdAt)).limit(limit).offset(offset),
      countQuery,
    ]);

    return {
      jobs: jobResults,
      total: countResult[0]?.count || 0,
    };
  }

  async updateJob(id: number, updates: Partial<InsertJob>): Promise<Job | undefined> {
    const [job] = await db
      .update(jobs)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(jobs.id, id))
      .returning();
    return job;
  }

  async deleteJob(id: number): Promise<boolean> {
    const result = await db.delete(jobs).where(eq(jobs.id, id));
    return result.rowCount > 0;
  }

  // Application operations
  async createApplication(application: InsertApplication): Promise<Application> {
    const [newApplication] = await db.insert(applications).values(application).returning();
    return newApplication;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application;
  }

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.jobId, jobId)).orderBy(desc(applications.createdAt));
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.applicantId, userId)).orderBy(desc(applications.createdAt));
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    const [application] = await db
      .update(applications)
      .set({ status, updatedAt: new Date() })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    return newPayment;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }

  async getPaymentByJobId(jobId: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.jobId, jobId));
    return payment;
  }

  async updatePaymentStatus(id: number, status: string, razorpayPaymentId?: string): Promise<Payment | undefined> {
    const updates: any = { status, updatedAt: new Date() };
    if (razorpayPaymentId) {
      updates.razorpayPaymentId = razorpayPaymentId;
    }

    const [payment] = await db
      .update(payments)
      .set(updates)
      .where(eq(payments.id, id))
      .returning();
    return payment;
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.employerId, userId)).orderBy(desc(payments.createdAt));
  }
}

export const storage = new DatabaseStorage();
