import React from 'react';
import { Plus, Check } from 'lucide-react';

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center border border-stone/10 dark:border-white/10 rounded-full bg-white dark:bg-white/5 shadow-sm`}>
    <svg viewBox="0 0 100 100" className="w-5 h-5">
      <path d="M30,60 Q50,30 70,60" fill="none" stroke="#4fd1c5" strokeWidth="12" strokeLinecap="round" />
    </svg>
  </div>
);

export const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

interface PortalSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  icon?: any;
}

export const PortalSection = ({ title, subtitle, children, icon: Icon }: PortalSectionProps) => (
  <section className="py-20 border-b border-stone/5 dark:border-white/5 animate-fade-in">
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          {Icon && <div className="w-10 h-10 rounded-full bg-aqua-primary/5 dark:bg-aqua-primary/10 flex items-center justify-center text-aqua-primary"><Icon size={20} /></div>}
          <h2 className="text-3xl font-display font-light uppercase tracking-tighter text-stone dark:text-white">{title}</h2>
        </div>
        {subtitle && <p className="text-[12px] font-black uppercase tracking-widest text-stone/30 dark:text-white/50">{subtitle}</p>}
      </header>
      <div className="max-w-3xl">
        {children}
      </div>
    </div>
  </section>
);
