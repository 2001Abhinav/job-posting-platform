import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Find the Perfect Candidates</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Post your job openings and reach qualified professionals. Simple pricing, powerful results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-primary px-8 py-3 text-lg font-semibold hover:bg-gray-100"
              onClick={() => window.location.href = "/api/login"}
            >
              Post a Job - ₹1
            </Button>
            <Link href="/jobs">
              <Button 
                variant="outline" 
                className="border-white text-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-primary"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose JobPost Pro?</h3>
            <p className="text-gray-600">Simple, effective, and results-driven job posting platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">Quick Setup</h4>
              <p className="text-gray-600">Post your job in minutes with our simple form</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">Quality Candidates</h4>
              <p className="text-gray-600">Reach skilled professionals actively looking for opportunities</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-warning rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">Track Performance</h4>
              <p className="text-gray-600">Monitor applications and manage candidates from your dashboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JobPost Pro</h3>
              <p className="text-gray-400 mb-4">The most trusted platform for job postings and recruitment in India.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Post a Job</a></li>
                <li><a href="#" className="hover:text-white">Dashboard</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Career Advice</a></li>
                <li><a href="#" className="hover:text-white">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white">Job Alerts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobPost Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
