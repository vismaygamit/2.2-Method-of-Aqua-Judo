import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Shield, ShieldCheck, Zap, RefreshCw, Layers, Waves, Mountain, Anchor, Compass, Target, Info, ChevronRight, CheckCircle2, BarChart3, Clock, MapPin, Users, BookOpen } from 'lucide-react';

export const MasterKeyDiagram = () => (
  <div className="my-8 md:my-12 p-8 md:p-12 bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group transition-colors duration-700">
    <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
    
    <div className="relative z-10 space-y-12">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
          <Wind size={20} />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">The Master Key — Breath Cycle</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[
          { step: '01', label: 'Inhale', action: 'Kuzushi', desc: 'Disrupt Equilibrium', icon: Wind },
          { step: '02', label: 'Hold', action: 'Tsukuri', desc: 'Align & Stabilize', icon: Shield },
          { step: '03', label: 'Exhale', action: 'Kake', desc: 'Release Force', icon: Zap },
          { step: '04', label: 'Reset', action: 'Rhythm', desc: 'Recalibrate', icon: RefreshCw },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-white/[0.08] border border-stone/5 dark:border-white/10 shadow-sm space-y-4 transition-all duration-500 cursor-default group/item"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-stone/20 dark:text-white/80">{item.step}</span>
              <item.icon size={16} className="text-aqua-primary/40 group-hover/item:text-aqua-primary group-hover/item:scale-110 transition-all" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/90 mb-1">{item.label}</p>
              <p className="text-sm font-display font-light uppercase tracking-tight text-stone dark:text-white group-hover/item:text-aqua-primary transition-colors">{item.action}</p>
              <p className="text-[10px] font-serif italic text-stone/30 dark:text-white/80 mt-2">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const FivePillarsDiagram = () => (
  <div className="my-8 md:my-12 grid grid-cols-1 md:grid-cols-5 gap-4">
    {[
      { id: '01', title: 'Structure', icon: Anchor, desc: 'Dynamic Alignment' },
      { id: '02', title: 'Ground', icon: Mountain, desc: 'Proprioceptive Feedback' },
      { id: '03', title: 'Water', icon: Waves, desc: 'Fluid Resistance' },
      { id: '04', title: 'Breath', icon: Wind, desc: 'Autonomic Resilience' },
      { id: '05', title: 'Commitment', icon: Target, desc: 'Total Commitment' },
    ].map((pillar, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8 }}
        transition={{ delay: i * 0.05 }}
        className="p-6 rounded-2xl bg-[#f5f4f0] dark:bg-white/[0.08] border border-stone/5 dark:border-white/10 text-center space-y-4 group hover:bg-white dark:hover:bg-white/[0.12] hover:shadow-xl transition-all duration-500 cursor-default"
      >
        <motion.div 
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          className="w-10 h-10 mx-auto rounded-full bg-white dark:bg-white/20 flex items-center justify-center text-stone/20 dark:text-white/80 group-hover:text-aqua-primary transition-colors"
        >
          <pillar.icon size={20} />
        </motion.div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-aqua-primary mb-1">{pillar.id}</p>
          <p className="text-xs font-display font-light uppercase tracking-tight text-stone dark:text-white">{pillar.title}</p>
          <p className="text-[9px] font-serif italic text-stone/30 dark:text-white/80 mt-2 leading-tight">{pillar.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export const TheWaveDiagram = () => {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const phases = [
    { phase: 'Collapse', desc: 'The wave descends. Structure is disrupted. This is the moment of vulnerability—and, for a trained practitioner, the moment of entry.', color: '#f87171', borderColor: 'border-red-400/40', x: 150, y: 110 },
    { phase: 'Pause', desc: 'The wave reaches its lowest point. A brief stillness. The nervous system recalibrates. In partner work, this is the entry window.', color: '#60a5fa', borderColor: 'border-blue-400/40', x: 500, y: 200 },
    { phase: 'Recovery', desc: 'Balance is being restored. The window is closing.', color: '#34d399', borderColor: 'border-emerald-400/40', x: 750, y: 350 },
    { phase: 'Intercept', desc: 'At approximately two-thirds of recovery, mechanical advantage peaks. This is where the throw lives—and where the trained body instinctively moves.', color: '#4fd1c5', borderColor: 'border-aqua-primary/40', x: 900, y: 280 },
  ];

  return (
    <div className="my-8 md:my-12 p-8 md:p-12 bg-[#0a0a0a] dark:bg-[#111111] rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden relative border border-white/10 shadow-2xl transition-all duration-700">
      {/* Animated Wave Background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none" className="opacity-40">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0" />
              <stop offset="50%" stopColor="#4fd1c5" stopOpacity="1" />
              <stop offset="100%" stopColor="#4fd1c5" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Static Background Wave */}
          <path 
            d="M0,200 Q250,50 500,200 T1000,200" 
            fill="none" 
            stroke="white" 
            strokeWidth="1" 
            strokeOpacity="0.1" 
          />
          
          {/* Animated Primary Wave */}
          <motion.path
            d="M0,200 Q250,50 500,200 T1000,200"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="4"
            filter="url(#glow)"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ 
              pathLength: [0.2, 0.5, 0.2],
              pathOffset: [0, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Phase Markers on Wave */}
          {phases.map((p, i) => (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredPhase(i)}
              onMouseLeave={() => setHoveredPhase(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoveredPhase === i ? "10" : "6"}
                fill={p.color}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ 
                  r: hoveredPhase === i ? 10 : 6,
                  fillOpacity: hoveredPhase === i ? 1 : 0.8
                }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 200, damping: 20 }}
              />
              {hoveredPhase === i && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="18"
                  fill={p.color}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.15, scale: 1.4 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
              <motion.text
                x={p.x}
                y={p.y - 20}
                textAnchor="middle"
                fill={p.color}
                fontSize={hoveredPhase === i ? "12" : "10"}
                fontWeight="bold"
                className="font-mono uppercase tracking-widest pointer-events-none"
                animate={{ 
                  y: hoveredPhase === i ? p.y - 22 : p.y - 15,
                  opacity: hoveredPhase === i ? 1 : 0.6
                }}
              >
                {p.phase}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="relative z-10 space-y-12">
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="w-10 h-10 rounded-full bg-aqua-primary/20 flex items-center justify-center text-aqua-primary shadow-[0_0_20px_rgba(79,209,197,0.3)]"
          >
            <Waves size={20} />
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">Technical Model</h3>
            <p className="text-2xl font-display font-light uppercase tracking-tight !text-white">The Wave Mechanics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setHoveredPhase(i)}
              onMouseLeave={() => setHoveredPhase(null)}
              animate={{ 
                backgroundColor: hoveredPhase === i ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'
              }}
              transition={{ delay: i * 0.1 }}
              className={`space-y-4 p-6 rounded-2xl backdrop-blur-sm border ${item.borderColor} transition-all group cursor-default h-full min-h-[320px] flex flex-col`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono transition-colors ${hoveredPhase === i ? 'text-white' : 'text-aqua-primary'}`}>0{i + 1}</span>
                <div className={`h-px flex-1 transition-colors ${hoveredPhase === i ? 'bg-white/30' : 'bg-white/10'}`} />
              </div>
              <p className="text-lg font-display font-light uppercase tracking-tight !text-white group-hover:text-aqua-primary transition-colors">{item.phase}</p>
              <p className="text-xs font-serif italic !text-white leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity flex-1">{item.desc}</p>
              
              {hoveredPhase === i && (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-aqua-primary">
                    <Info size={10} />
                    <span>Phase Detail</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BalanceEcologyDiagram = () => (
  <div className="my-8 md:my-12 p-8 md:p-12 bg-stone/[0.02] dark:bg-white/[0.08] border border-stone/5 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative transition-colors duration-700">
    <div className="relative z-10 space-y-12">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
          <Layers size={20} />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">Balance Ecology</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 lg:gap-8">
        {[
          { label: 'Disruption', icon: Zap, desc: 'Kuzushi: The breaking of structural integrity.' },
          { label: 'Reorganization', icon: RefreshCw, desc: 'Tsukuri: The alignment of the practitioner.' },
          { label: 'Expression', icon: Target, desc: 'Kake: The execution of the technique.' },
        ].map((item, i) => (
          <React.Fragment key={i}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-white/[0.1] border border-stone/5 dark:border-white/10 shadow-sm text-center space-y-6 group transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary group-hover:scale-110 group-hover:bg-aqua-primary group-hover:text-white transition-all duration-500">
                <item.icon size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-display font-light uppercase tracking-tight text-stone dark:text-white">{item.label}</p>
                <p className="text-[11px] font-serif italic text-stone/40 dark:text-white/80 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
            {i < 2 && (
              <div className="hidden lg:flex flex-col items-center gap-2 text-aqua-primary/30">
                <ChevronRight size={32} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export const EnvironmentalKuzushiDiagram = () => (
  <div className="my-8 md:my-12 p-8 md:p-12 bg-stone/[0.02] dark:bg-white/[0.08] border border-stone/5 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative transition-colors duration-700">
    <div className="relative z-10 space-y-12">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
          <Compass size={20} />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">Environmental Kuzushi</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Sand', desc: 'Shifting dunes. Non-linear compression. Continuous micro-kuzushi.' },
          { title: 'Ocean', desc: 'Surf swells. Fluid resistance. Omnidirectional destabilization.' },
          { title: 'Terrain', desc: 'Irregular rock. Variable elevation. Proprioceptive demand.' },
        ].map((item, i) => (
          <div key={i} className="space-y-4 p-6 rounded-2xl bg-white dark:bg-white/[0.1] border border-stone/5 dark:border-white/10 shadow-sm transition-colors duration-700">
            <p className="text-sm font-display font-light uppercase tracking-tight text-stone dark:text-white">{item.title}</p>
            <p className="text-[10px] font-serif italic text-stone/30 dark:text-white/80 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="pt-8 border-t border-stone/5 dark:border-white/10 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone/20 dark:text-white/80">The practitioner continuously reorganizes against these forces.</p>
      </div>
    </div>
  </div>
);

export const EligibilityGrid = () => (
  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-8 rounded-3xl bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
          <CheckCircle2 size={16} />
        </div>
        <p className="text-sm font-black uppercase tracking-widest text-stone dark:text-white">This Method Is For You If</p>
      </div>
      <ul className="space-y-4">
        {[
          { bold: 'You are 35 or older', text: 'and want to build physical capacity that compounds over decades, not peaks and declines.' },
          { bold: 'You have a judo or martial arts background', text: 'and want to apply those mechanics in an open-water, coastal environment.' },
          { bold: 'You have no judo background', text: 'but understand that balance, coordination, and structural integrity matter more than isolated strength.' },
          { bold: 'You are already active', text: 'but have noticed that your training does not fully prepare you for unpredictable environments.' },
          { bold: 'You are willing to be uncomfortable', text: 'for one week in exchange for a movement baseline that lasts for years.' },
        ].map((item, i) => (
          <li key={i} className="flex gap-3 text-sm font-serif italic text-stone/60 dark:text-white/80 leading-relaxed">
            <span className="text-aqua-primary mt-1">—</span>
            <span><strong className="font-sans font-bold not-italic text-stone dark:text-white">{item.bold}</strong> {item.text}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="p-8 rounded-3xl bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <span className="text-xs font-black">✕</span>
        </div>
        <p className="text-sm font-black uppercase tracking-widest text-stone dark:text-white">This Method Is Not For You If</p>
      </div>
      <ul className="space-y-4">
        {[
          { bold: 'You are seeking performance optimization', text: 'for a specific competitive sport. This method serves longevity and functional capacity, not peak athletic output.' },
          { bold: 'You have acute injuries', text: 'that would prevent movement on uneven surfaces, in water, or through basic judo mechanics. Consult a physician before applying.' },
          { bold: 'You expect results without discomfort', text: 'The coast is an honest teacher. Some sessions will be physically and mentally demanding.' },
          { bold: 'You want a scripted program', text: 'with fixed sets, reps, and weekly progressions. This method trains adaptability, not compliance.' },
        ].map((item, i) => (
          <li key={i} className="flex gap-3 text-sm font-serif italic text-stone/60 dark:text-white/80 leading-relaxed">
            <span className="text-red-500/50 mt-1">—</span>
            <span><strong className="font-sans font-bold not-italic text-stone dark:text-white">{item.bold}</strong> {item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const AssessmentTable = () => (
  <div className="my-12 space-y-8">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-stone/10 dark:border-white/10">
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Metric</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Protocol</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Unit</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Day 1</th>
            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Day 7</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone/5 dark:divide-white/5">
          {[
            { metric: 'Single-leg balance', protocol: 'Stand on one leg, eyes open. Time until first touch-down.', unit: 'Seconds', day1: '<20s typical', day7: 'Goal: >40s' },
            { metric: 'Uneven-surface walk', protocol: 'Walk 10m across irregular terrain (rock/sand). Timed.', unit: 'Seconds', day1: 'Baseline time', day7: 'Improvement: -15%+' },
            { metric: 'Breath-hold comfort', protocol: 'Seated, normal breath, hold after exhale. Stop at first discomfort.', unit: 'Seconds', day1: 'Varies widely', day7: 'Goal: +30% from baseline' },
            { metric: 'Recovery heart rate', protocol: 'HR at 2 min after standardized exertion (3 min brisk movement).', unit: 'BPM', day1: 'Baseline reading', day7: 'Improvement: lower = better' },
            { metric: 'Movement confidence', protocol: 'Self-rating: "How confident am I moving on unpredictable surfaces?"', unit: '1–10 scale', day1: 'Baseline self-rating', day7: 'Goal: +2–3 points' },
          ].map((row, i) => (
            <tr key={i} className="group hover:bg-stone/[0.02] dark:hover:bg-white/[0.02] transition-colors">
              <td className="py-4 px-6 text-sm font-display font-light text-stone dark:text-white">{row.metric}</td>
              <td className="py-4 px-6 text-xs font-serif italic text-stone/60 dark:text-white/80">{row.protocol}</td>
              <td className="py-4 px-6 text-[10px] font-mono text-stone/40 dark:text-white/60">{row.unit}</td>
              <td className="py-4 px-6 text-xs font-mono text-stone/60 dark:text-white/80">{row.day1}</td>
              <td className="py-4 px-6 text-xs font-mono text-aqua-primary">{row.day7}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const NoteOnAge = () => (
  <div className="my-8 p-8 rounded-3xl bg-aqua-primary/5 border border-aqua-primary/10 flex gap-6 items-start">
    <div className="w-12 h-12 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary shrink-0">
      <Info size={24} />
    </div>
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-aqua-primary">A Note on Age</p>
      <p className="text-sm font-serif italic text-stone/60 dark:text-white/80 leading-relaxed">
        The research that supports this method was conducted with older adults. The methods measurable benefits—+20% balance improvement, +9–34% strength, +13% aerobic endurance—were produced in structured judo programs for aging populations. This is not a method adapted for aging. It was built around it.
      </p>
    </div>
  </div>
);

export const ResearchStats = () => (
  <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { label: 'Strength', value: '+9–34%', desc: 'International Journal of Exercise Science, 2022', icon: Zap },
      { label: 'Mobility', value: '+9.5–13.6%', desc: 'Structured judo training programs', icon: Waves },
      { label: 'Aerobic Endurance', value: '+13%', desc: 'Same study', icon: Wind },
      { label: 'Balance', value: '+20%', desc: 'The most critical marker for independence', icon: ShieldCheck },
    ].map((stat, i) => (
      <div key={i} className="p-6 rounded-3xl bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 text-center space-y-4 hover:border-aqua-primary/30 transition-colors">
        <div className="w-12 h-12 mx-auto rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
          <stat.icon size={20} />
        </div>
        <div>
          <p className="text-3xl font-display font-light text-stone dark:text-white">{stat.value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80 mt-1">{stat.label}</p>
        </div>
        <p className="text-[10px] font-serif italic text-stone/40 dark:text-white/60 leading-relaxed">{stat.desc}</p>
      </div>
    ))}
  </div>
);

export const ResearchThreeTier = () => (
  <div className="my-12 grid grid-cols-1 gap-6">
    {[
      { tier: 'Established', title: 'Judo/Exercise Science Research', desc: 'Judo training in older adults produces multi-system adaptation simultaneously: balance (+20%), strength (+9-34%), mobility (+9.5-13.6%), and aerobic endurance (+13%). Source: Miller, Climstein, Del Vecchio, International Journal of Exercise Science, 2022. This is directly measured in structured judo programs.' },
      { tier: 'Inferred', title: 'Related Research (Proprioception, Breath, Water)', desc: 'Training on variable, unpredictable surfaces produces greater proprioceptive adaptation than flat-surface training. Source: Munoz-Martel et al., Scientific Reports, 2021. This research was not conducted in judo or coastal settings—but the stimulus mechanism is the same. We infer that coastal terrain amplifies the proprioceptive demands of judo.\n\nBreath-hold training expands CO₂ tolerance and improves autonomic resilience under physiological stress. Source: Elia et al., European Journal of Applied Physiology, 2025. The specific application to judo uchikomi pacing is inferred, not directly studied.' },
      { tier: 'Field-Tested', title: 'Practitioner Observation, 25 Years', desc: 'Placing judo mechanics inside the coastal environment appears to accelerate proprioceptive and structural adaptation relative to dojo-only training. This is based on 25 years of practice and observation—it is not yet peer-reviewed. It is the central hypothesis of Aqua Judo, and it is the one that the baseline metrics are designed to begin testing.' },
    ].map((tier, i) => (
      <div key={i} className="p-8 rounded-[2rem] bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 space-y-4 hover:border-aqua-primary/30 transition-colors">
        <p className="text-[10px] font-black uppercase tracking-widest text-aqua-primary">{tier.tier}</p>
        <p className="text-xl font-display font-light uppercase tracking-tight text-stone dark:text-white">{tier.title}</p>
        <p className="text-sm font-serif italic text-stone/60 dark:text-white/80 leading-relaxed whitespace-pre-wrap">{tier.desc}</p>
      </div>
    ))}
  </div>
);

export const WavePhasesDetail = () => (
  <div className="my-12 space-y-6">
    {[
      { phase: 'Collapse', desc: 'The wave descends. Structure is disrupted. This is the moment of vulnerability—and, for a trained practitioner, the moment of entry.' },
      { phase: 'Pause', desc: 'The wave reaches its lowest point. A brief stillness. The nervous system recalibrates. In partner work, this is the entry window.' },
      { phase: 'Recovery', desc: 'Balance is being restored. The window is closing.' },
      { phase: 'Intercept', desc: 'At approximately two-thirds of recovery, mechanical advantage peaks. This is where the throw lives—and where the trained body instinctively moves.' },
    ].map((item, i) => (
      <div key={i} className="flex items-center gap-8 p-6 rounded-2xl bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 group hover:bg-white dark:hover:bg-white/[0.08] transition-all">
        <span className="text-2xl font-display font-light text-aqua-primary/30 group-hover:text-aqua-primary transition-colors">0{i+1}</span>
        <div>
          <p className="text-lg font-display font-light uppercase tracking-tight text-stone dark:text-white">{item.phase}</p>
          <p className="text-xs font-serif italic text-stone/40 dark:text-white/80">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export const SessionStructure = () => (
  <div className="my-12 p-8 md:p-12 bg-stone/5 dark:bg-white/[0.05] rounded-[3rem] space-y-12">
    <div className="text-center space-y-4">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">Daily Session Structure</h3>
      <p className="text-3xl font-display font-light uppercase tracking-tight text-stone dark:text-white">90 Minutes of Immersion</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { time: '15m', title: 'Warm Up', desc: 'Joint mobilization and thermal prep.' },
        { time: '15m', title: 'Autonomic Prep', desc: 'Breathwork and cold exposure.' },
        { time: '40m', title: 'Dynamic Flow', desc: 'Aquatic judo and movement.' },
        { time: '20m', title: 'Integration', desc: 'Stillness and field notes.' },
      ].map((item, i) => (
        <div key={i} className="space-y-4 text-center">
          <p className="text-4xl font-display font-light text-aqua-primary">{item.time}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-stone dark:text-white">{item.title}</p>
          <p className="text-[10px] font-serif italic text-stone/40 dark:text-white/80">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export const JudoFundamentals = () => (
  <div className="my-12 p-8 md:p-12 bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 rounded-[3rem] space-y-12">
    <div className="text-center space-y-4">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">基本動作</h3>
      <p className="text-3xl font-display font-light uppercase tracking-tight text-stone dark:text-white">The Fundamentals of Judo</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
      {[
        { id: '01', title: 'SHISEI', sub: '姿勢', desc: 'Posture. Natural posture (Shizentai) and defensive posture (Jigotai).' },
        { id: '02', title: 'MA-AI', sub: '間合い', desc: 'Positioning. The critical distance between you and the adversary or environment.' },
        { id: '03', title: 'TAI SABAKI', sub: '体さばき', desc: 'Body mechanics. Rotation and movement to redirect force and create opening.' },
        { id: '04', title: 'KUMIKATA', sub: '組み方', desc: 'Gripping techniques. The science of connection and control through the hands.' },
        { id: '05', title: 'AYUMI & TSUGI ASHI', sub: '歩み・継ぎ足', desc: 'Footwork. Natural walking and sliding steps to maintain stability.' },
        { id: '06', title: 'KUZUSHI', sub: '崩し', desc: 'Off-balancing. The art of Kuzushi: breaking the structural integrity. Core principles include Maximum efficiency and minimum effort (Seiryoku-Zenyo) and Mutual Benefit (Jita-Kyoei).' },
      ].map((item, i) => (
        <div key={i} className="flex gap-6 group">
          <span className="text-2xl font-display font-light text-aqua-primary/20 group-hover:text-aqua-primary transition-colors">{item.id}</span>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-black uppercase tracking-widest text-stone dark:text-white">{item.title}</p>
              <p className="text-[10px] font-serif italic text-stone/40 dark:text-white/60">{item.sub}</p>
            </div>
            <p className="text-xs text-stone/60 dark:text-white/80 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const UkemiDiagram = () => (
  <div className="my-12 p-8 md:p-12 bg-stone/5 dark:bg-white/[0.05] rounded-[3rem] space-y-12 transition-colors duration-700">
    <div className="text-center space-y-4">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">受身 — UKEMI</h3>
      <p className="text-3xl font-display font-light uppercase tracking-tight text-stone dark:text-white">The Art of Falling</p>
      <p className="max-w-2xl mx-auto text-xs font-serif italic text-stone/60 dark:text-white/80 leading-relaxed">
        In Aqua Judo, we don't just train to stay upright; we train to fall with absolute safety. 
        Ukemi is the skill of dissipating kinetic energy to protect the spine and brain.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { 
          title: 'Tuck the Chin', 
          sub: 'Protect Head', 
          desc: 'Engage neck stabilizers to prevent the head from whipping back.',
          icon: ShieldCheck
        },
        { 
          title: 'Exhale on Impact', 
          sub: 'Brace Spine', 
          desc: 'Create internal hydrostatic pressure to support the core.',
          icon: Wind
        },
        { 
          title: 'Energy Slap', 
          sub: 'Disperse Force', 
          desc: 'Increase surface area to spread impact across the body.',
          icon: Zap
        },
        { 
          title: 'Rolling Geometry', 
          sub: 'Maintain Flow', 
          desc: 'Convert linear falls into angular rolls to return to feet.',
          icon: RefreshCw
        },
      ].map((item, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="p-6 rounded-2xl bg-white dark:bg-white/[0.08] border border-stone/5 dark:border-white/10 shadow-sm space-y-4 group transition-all"
        >
          <div className="flex justify-between items-center">
            <div className="w-8 h-8 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary group-hover:scale-110 transition-transform">
              <item.icon size={16} />
            </div>
            <div className="w-6 h-6 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={12} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone dark:text-white">{item.title}</p>
            <p className="text-[9px] font-serif italic text-stone/40 dark:text-white/60 mb-2">{item.sub}</p>
            <p className="text-[11px] text-stone/60 dark:text-white/80 leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="pt-8 border-t border-stone/10 dark:border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <p className="text-2xl font-display font-light text-stone dark:text-white">Mae-Ukemi</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-stone/30 dark:text-white/50">Forward Fall</p>
        </div>
        <div>
          <p className="text-2xl font-display font-light text-stone dark:text-white">Ushiro-Ukemi</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-stone/30 dark:text-white/50">Backward Fall</p>
        </div>
        <div>
          <p className="text-2xl font-display font-light text-stone dark:text-white">Yoko-Ukemi</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-stone/30 dark:text-white/50">Side Fall</p>
        </div>
      </div>
    </div>
  </div>
);

export const SittingStats = () => (
  <div className="my-12 p-8 md:p-12 bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] space-y-12 transition-colors duration-700">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
        <BarChart3 size={20} />
      </div>
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">The Cost of Sitting</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {[
        { label: 'Proprioceptive Clarity', sitting: 'Filtered', method: 'High-Fidelity', desc: 'The brain stops "listening" to the feet and glutes during static sitting.' },
        { label: 'Kinetic Chain Integrity', sitting: 'Compromised', method: 'Unified', desc: 'Chronic hip flexion leads to gluteal amnesia and restricted power transfer.' },
        { label: 'Reflexive Response', sitting: 'Delayed', method: 'Automatic', desc: 'The ability to recover balance before the conscious mind intervenes.' },
      ].map((item, i) => (
        <div key={i} className="flex flex-col h-full p-8 rounded-3xl bg-white dark:bg-white/[0.08] border border-stone/5 dark:border-white/10 shadow-sm group hover:border-aqua-primary/30 transition-all duration-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/90 mb-8">{item.label}</p>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-stone/[0.02] dark:bg-white/[0.02] border border-stone/5 dark:border-white/5">
              <p className="text-[9px] font-black uppercase tracking-widest text-stone/20 dark:text-white/40 mb-1">Sitting</p>
              <p className="text-2xl font-display font-light text-stone/40 dark:text-white/60">{item.sitting}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-aqua-primary/5 border border-aqua-primary/10">
              <p className="text-[9px] font-black uppercase tracking-widest text-aqua-primary mb-1">Method</p>
              <p className="text-2xl font-display font-light text-aqua-primary">{item.method}</p>
            </div>
          </div>
          
          <div className="mt-auto">
            <p className="text-[12px] font-serif italic text-stone/40 dark:text-white/80 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ActiveReconDetail = () => (
  <div className="my-12 p-8 rounded-[2rem] bg-stone/[0.02] dark:bg-white/[0.05] border border-stone/5 dark:border-white/10 space-y-8">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
        <Users size={20} />
      </div>
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">Active Reconnaissance</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <p className="text-sm font-black uppercase tracking-widest text-stone dark:text-white">The Protocol</p>
        <p className="text-xs font-serif italic text-stone/40 dark:text-white/80 leading-relaxed">
          Continuous observation of environmental variables—tide, wind, terrain—integrated into movement decisions.
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-black uppercase tracking-widest text-stone dark:text-white">The Outcome</p>
        <p className="text-xs font-serif italic text-stone/40 dark:text-white/80 leading-relaxed">
          Enhanced situational awareness and reduced reaction time in non-linear environments.
        </p>
      </div>
    </div>
  </div>
);
