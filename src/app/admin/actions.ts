'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function getRegistrations(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    throw new Error('Unauthorized');
  }

  const { data, error } = await supabaseAdmin
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching registrations:', error);
    throw new Error('Failed to fetch registrations');
  }

  return data;
}
