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
Run the following SQL in your Supabase SQL Editor to create the `registrations` table:

```sql
create table registrations (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  institution text not null,
  role text not null,
  photo_url text not null,
  flyer_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table registrations enable row level security;

-- Policies
create policy "Allow public insertions" on registrations for insert with check (true);
create policy "Allow public read access" on registrations for select using (true);
```

### 3. Storage Setup
1. Create a **public** bucket named `registrations` in Supabase Storage.
2. Set up policies to allow public uploads and reads.

### 4. Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### 5. Installation
```bash
npm install
npm run dev
```

## Admin Access

- **URL**: `/admin`
- **Default Password**: `admin123` (Can be changed via `NEXT_PUBLIC_ADMIN_PASSWORD` env variable)

## Deployment

This app is ready to be deployed on **Vercel**.
Ensure you add the environment variables in the Vercel dashboard.

---
Produced by **Institute of Future Intelligence (IFI)** & **Nova Community**
