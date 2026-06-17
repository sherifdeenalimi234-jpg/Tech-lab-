'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Speakers } from '@/components/sections/Speakers';
import { InnovationShowcase } from '@/components/sections/InnovationShowcase';
import { PanelDiscussion } from '@/components/sections/PanelDiscussion';
import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { FlyerDownloader } from '@/components/flyer/FlyerDownloader';
import { uploadProfilePhoto, registerUser } from '@/lib/actions';
import type { Registration } from '@/types';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState<Registration | null>(null);

  const handleRegistrationSuccess = async (data: {
    full_name: string;
    email: string;
    institution: string;
    role: "Participant" | "Speaker" | "Panelist" | "Volunteer" | "Guest";
    photo: FileList
  }) => {
    try {
      const photoUrl = await uploadProfilePhoto(data.photo[0]);
      const registration = await registerUser({
        full_name: data.full_name,
        email: data.email,
        institution: data.institution,
        role: data.role,
        photo_url: photoUrl,
      });

      setUserData(registration);
      setIsRegistered(true);

      // Scroll to top to show flyer
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please check your connection and try again.');
    }
  };

  if (isRegistered && userData) {
    return (
      <main className="min-h-screen bg-[#050505] bg-mesh">
        <FlyerDownloader
          registration={userData}
          onReset={() => {
            setIsRegistered(false);
            setUserData(null);
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] bg-mesh selection:bg-brand-blue selection:text-white">
      <Hero />
      <About />
      <Speakers />
      <InnovationShowcase />
      <PanelDiscussion />
      <RegistrationForm onSuccess={handleRegistrationSuccess} />

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Institute of Future Intelligence (IFI) & Nova Community. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
