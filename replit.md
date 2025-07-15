# Overview

This is a full-stack job posting platform built with React (frontend) and Express.js (backend), using PostgreSQL with Drizzle ORM. The application allows users to post jobs, browse job listings, apply for positions, and manage applications through a dashboard. It includes Razorpay payment integration for job posting fees and uses Replit's authentication system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OIDC authentication with Passport.js
- **Session Management**: Express sessions stored in PostgreSQL
- **Payment Processing**: Razorpay integration for job posting fees
- **API Design**: RESTful API endpoints with proper error handling

## Key Components

### Database Schema
- **Users**: Store user profile information from Replit auth
- **Jobs**: Job postings with details like title, company, location, salary, type
- **Applications**: Job applications linking users to jobs
- **Payments**: Payment records for job posting fees
- **Sessions**: Session storage for authentication

### Authentication System
- Replit OIDC authentication for secure login
- Session-based authentication with PostgreSQL storage
- Middleware for protecting authenticated routes
- User profile management and persistence

### Payment Integration
- Real Razorpay payment gateway for job posting fees (₹2,500 per job)
- Live API integration with order creation and payment verification
- Cryptographic signature validation for payment security
- Payment status tracking in database with real-time updates
- Secure payment modal with UPI/card/netbanking support

### Job Management
- Job posting with rich form validation
- Job browsing with filtering and search capabilities
- Application management system
- Dashboard for employers to manage their jobs and applications

## Data Flow

1. **User Authentication**: Users authenticate via Replit OIDC, sessions stored in PostgreSQL
2. **Job Posting**: Authenticated users create jobs, payment processed via Razorpay
3. **Job Browsing**: Public job listings with filtering and search
4. **Job Applications**: Users can apply to jobs with cover letters
5. **Dashboard**: Employers manage jobs and review applications

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit OIDC service
- **Payments**: Razorpay payment gateway
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date formatting

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Drizzle Kit**: Database schema management and migrations
- **Vite**: Fast development server and build tool
- **ESBuild**: Production backend bundling

## Deployment Strategy

### Production Build
- Frontend: Vite builds static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations applied via `db:push` command

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Razorpay live API keys integrated for real payment processing
- Session secret for authentication security
- Replit-specific configuration for OIDC
- Real-time payment verification with signature validation

### Railway Deployment
- Configured for Railway platform with railway.json
- Free PostgreSQL database included
- Automatic deployments from GitHub
- $5 monthly credit covers typical usage
- Custom domain support available

### File Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express application
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Production build output
```

The application follows a monorepo structure with clear separation between frontend, backend, and shared code, making it easy to maintain and scale.