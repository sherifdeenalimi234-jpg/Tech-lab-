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

export async function saveFlyer(registrationId: string, flyerFile: File): Promise<string> {
  const fileName = `flyers/${registrationId}.png`;

  const { error: uploadError } = await supabase.storage
    .from('registrations')
    .upload(fileName, flyerFile, {
      upsert: true
    });

  if (uploadError) {
    throw new Error(`Flyer upload failed: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('registrations')
    .getPublicUrl(fileName);

  const { error: updateError } = await supabase
    .from('registrations')
    .update({ flyer_url: publicUrl })
    .eq('id', registrationId);

  if (updateError) {
    throw new Error(`Database update failed: ${updateError.message}`);
  }

  return publicUrl;
}
