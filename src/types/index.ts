export type UserRole = 'Participant' | 'Speaker' | 'Panelist' | 'Volunteer' | 'Guest';

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  institution: string;
  role: UserRole;
  photo_url: string;
  flyer_url?: string;
  created_at: string;
}

export interface RegistrationFormData {
  full_name: string;
  email: string;
  institution: string;
  role: UserRole;
  photo: FileList;
}
