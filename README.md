# Nova Tech Lab Flyer Generator

A modern, production-ready web application for the Nova Tech Lab Launch Event, built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- **User Registration**: Collects participant details and profile photos.
- **Personalized Flyer**: Automatically generates a custom event flyer with the user's name, role, and photo.
- **Innovation Showcase**: Highlights event themes and objectives.
- **Admin Dashboard**: Secure panel to manage registrations and export data.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Flyer Generation**: `html-to-image` & `canvas-confetti`

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Supabase Account

### 2. Database Setup
Run the `supabase/schema.sql` in your Supabase SQL Editor to create the `registrations` table and secure it with Row Level Security (RLS).

Note: Public read access is disabled by default to protect PII. The Admin dashboard uses the `SUPABASE_SERVICE_ROLE_KEY` via Server Actions.

### 3. Storage Setup
1. Create a **public** bucket named `registrations` in Supabase Storage.
2. Allow public inserts and selects in the bucket policies.
3. **CRITICAL:** To enable flyer generation, you must configure **CORS** on your Supabase bucket. Go to Storage -> Settings -> API -> CORS and add:
   ```json
   [
     {
       "allowedOrigins": ["*"],
       "allowedMethods": ["GET"],
       "allowedHeaders": ["*"],
       "maxAgeSeconds": 3600
     }
   ]
   ```

### 4. Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=secure_admin_password_here
```

### 5. Installation
```bash
npm install
npm run dev
```

## Admin Access

- **URL**: `/admin`
- **Authentication**: Uses the `ADMIN_PASSWORD` environment variable.

## Deployment

This app is ready to be deployed on **Vercel**.
Ensure you add the environment variables in the Vercel dashboard.

---
Produced by **Institute of Future Intelligence (IFI)** & **Nova Community**
