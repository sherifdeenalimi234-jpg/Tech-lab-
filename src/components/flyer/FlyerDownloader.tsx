'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { FlyerTemplate } from './FlyerTemplate';
import { Button } from '@/components/ui/Button';
import { Download, Share2, ArrowLeft, Save, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveFlyer } from '@/lib/actions';

interface FlyerDownloaderProps {
  registration: {
    id: string;
    full_name: string;
    role: string;
    photo_url: string;
  };
  onReset: () => void;
}

export const FlyerDownloader = ({ registration, onReset }: FlyerDownloaderProps) => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const generateFile = async (quality = 1): Promise<File> => {
    if (!flyerRef.current) throw new Error('Flyer ref not found');

    // Ensure images are loaded
    await new Promise(resolve => setTimeout(resolve, 500));

    const dataUrl = await toPng(flyerRef.current, {
      quality: quality,
      pixelRatio: 2,
      cacheBust: true,
    });

    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], `Nova-Tech-Lab-Flyer-${registration.full_name.replace(/\s+/g, '-')}.png`, { type: 'image/png' });
  };

  const handleDownload = async () => {
    if (!flyerRef.current) return;

    setIsGenerating(true);
    try {
      const file = await generateFile();
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.download = file.name;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0070f3', '#7928ca', '#ff9d00']
      });
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Could not generate flyer image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToProfile = async () => {
    setIsSaving(true);
    try {
      const file = await generateFile(0.8);
      await saveFlyer(registration.id, file);
      setIsSaved(true);
      alert('Flyer saved to your profile successfully!');
    } catch (err) {
      console.error('Failed to save flyer', err);
      alert('Failed to save flyer to profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      const file = await generateFile(0.7);
      if (navigator.share) {
        await navigator.share({
          title: 'My Nova Tech Lab Launch Flyer',
          text: 'I just registered for the Launch of Nova Tech Lab! Join me!',
          files: [file],
        });
      } else {
        alert('Sharing is not supported on this browser. You can download the flyer instead.');
      }
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
          <Download className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Registration <span className="text-gradient">Successful!</span></h2>
        <p className="text-white/60">Your personalized flyer is ready.</p>
      </div>

      <div className="relative group w-full flex justify-center">
         {/* Scaled down preview for mobile/tablet */}
         <div className="transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top mb-[-420px] sm:mb-[-280px] md:mb-[-150px] lg:mb-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10">
            <FlyerTemplate ref={flyerRef} registration={registration} />
         </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-12 w-full max-w-lg">
        <Button onClick={handleDownload} isLoading={isGenerating} className="flex-1 min-w-[140px]">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button
          variant={isSaved ? "outline" : "primary"}
          onClick={handleSaveToProfile}
          isLoading={isSaving}
          disabled={isSaved}
          className="flex-1 min-w-[140px]"
        >
          {isSaved ? <Check className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaved ? 'Saved' : 'Save to Profile'}
        </Button>
        <Button variant="outline" onClick={handleShare} className="flex-1 min-w-[140px]">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button variant="ghost" onClick={onReset} className="w-full mt-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Register Another Person
        </Button>
      </div>
    </div>
  );
};
