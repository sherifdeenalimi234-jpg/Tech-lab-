import { supabase } from './supabase';
import type { UserRole } from '@/types';

export async function uploadProfilePhoto(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `profile-photos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('registrations')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('registrations')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function registerUser(userData: {
  full_name: string;
  email: string;
  institution: string;
  role: UserRole;
  photo_url: string;
}) {
  const { data, error } = await supabase
    .from('registrations')
    .insert([userData])
    .select()
    .single();

  if (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }

  return data;
}

export async function getRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch registrations: ${error.message}`);
  }

  return data;
}
