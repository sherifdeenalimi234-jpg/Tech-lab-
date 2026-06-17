'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassCard } from '@/components/ui/Card';
import { Upload } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  institution: z.string().min(2, 'Institution name must be at least 2 characters'),
  role: z.enum(['Participant', 'Speaker', 'Panelist', 'Volunteer', 'Guest'] as const),
  photo: z
    .any()
    .refine((files) => files?.length === 1, "Profile photo is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type FormData = z.infer<typeof schema>;

interface RegistrationFormProps {
  onSuccess: (data: FormData) => Promise<void>;
}

export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'Participant',
    }
  });

  const photoFile = watch('photo');

  React.useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Logic for upload will be handled by the parent or an action
      // For now, we pass the data up
      await onSuccess(data);
    } catch (error) {
      console.error('Submission failed', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Secure Your <span className="text-gradient">Spot</span></h2>
          <p className="text-white/60">Register now to get your personalized event flyer and event access.</p>
        </div>

        <GlassCard className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register('full_name')}
              error={errors.full_name?.message}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Institution / Organization"
              placeholder="e.g. University of Lagos"
              {...register('institution')}
              error={errors.institution?.message}
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/70 ml-1">Role</label>
              <select
                {...register('role')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all duration-200 appearance-none text-base md:text-sm"
              >
                <option value="Participant" className="bg-black">Participant</option>
                <option value="Speaker" className="bg-black">Speaker</option>
                <option value="Panelist" className="bg-black">Panelist</option>
                <option value="Volunteer" className="bg-black">Volunteer</option>
                <option value="Guest" className="bg-black">Guest</option>
              </select>
              {errors.role && <p className="text-xs text-red-500 ml-1">{errors.role.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/70 ml-1">Profile Photo</label>
              <div className="relative">
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  {...register('photo')}
                />
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl hover:border-brand-blue/50 hover:bg-white/5 transition-all cursor-pointer overflow-hidden relative"
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-white/30 mb-2" />
                      <span className="text-sm text-white/40">Click to upload photo</span>
                    </div>
                  )}
                </label>
              </div>
              {errors.photo && <p className="text-xs text-red-500 ml-1">{errors.photo.message as string}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
              Complete Registration
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};
