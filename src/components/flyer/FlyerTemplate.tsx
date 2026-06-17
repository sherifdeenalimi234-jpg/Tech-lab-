'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { IFILogo, NovaLogo } from '../Logos';

interface FlyerTemplateProps {
  registration: {
    full_name: string;
    role: string;
    photo_url: string;
  };
}

export const FlyerTemplate = React.forwardRef<HTMLDivElement, FlyerTemplateProps>(
  ({ registration }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[600px] h-[800px] bg-[#050505] text-white overflow-hidden relative font-sans p-0 m-0"
        style={{ width: '600px', height: '800px' }}
      >
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-brand-blue/30 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-brand-purple/30 rounded-full blur-[100px]" />
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 h-full flex flex-col p-12 border-[16px] border-white/5">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <IFILogo className="w-12 h-12 text-brand-gold" />
              <div className="space-y-0.5">
                <p className="text-brand-gold font-bold text-sm tracking-[0.1em] uppercase leading-tight">Institute of Future <br/> Intelligence</p>
                <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">Nova Community</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold tracking-tighter text-white/30 uppercase vertical-text">Official Flyer</span>
               <NovaLogo className="w-12 h-12 text-brand-blue" />
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold leading-tight mb-2">
              LAUNCH OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-gold">
                NOVA TECH LAB
              </span>
            </h1>
            <p className="text-white/70 text-sm italic">&ldquo;Empowering Innovation, Intelligence and Sustainable Development&rdquo;</p>
          </div>

          {/* Profile Section */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-6">
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-purple rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden bg-white/5">
                   <img
                     src={registration.photo_url}
                     alt={registration.full_name}
                     className="w-full h-full object-cover"
                     crossOrigin="anonymous"
                   />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-blue px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border border-white/20">
                   {registration.role}
                </div>
             </div>

             <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">{registration.full_name}</h2>
             <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full mb-8" />
          </div>

          {/* Footer Info */}
          <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-end">
            <div className="space-y-4">
              <div className="flex gap-8">
                 <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                   <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Date</p>
                   <p className="text-sm font-black text-brand-gold">FRIDAY</p>
                 </div>
                 <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                   <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Time</p>
                   <p className="text-sm font-black text-brand-blue">8:00 PM (WAT)</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <NovaLogo className="w-5 h-5 text-brand-gold" />
                </div>
                <p className="text-[9px] text-white/40 leading-tight max-w-[180px]">
                  Official attendee of the Nova Tech Lab Launch. Join the future of innovation.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
               <div className="p-2 bg-white rounded-xl shadow-lg shadow-brand-blue/20">
                 <QRCodeSVG value="https://novatechlab.vercel.app" size={64} />
               </div>
               <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">Verify Invite</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FlyerTemplate.displayName = 'FlyerTemplate';
