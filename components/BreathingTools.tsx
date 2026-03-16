import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Settings, Timer, Wind, Trophy, ChevronRight } from 'lucide-react';

export const BreathingTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'circular' | 'box' | 'hold'>('circular');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-12 p-6 md:p-10 rounded-[2.5rem] bg-stone/5 dark:bg-white/5 border border-stone/5 dark:border-white/10 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-aqua-primary">
            <Wind size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Interactive Tools</span>
          </div>
          <h3 className="text-2xl font-display font-light uppercase tracking-tight text-stone dark:text-white">
            Breath Work
          </h3>
        </div>
        
        <div className="flex p-1 bg-stone/5 dark:bg-white/5 rounded-full self-start flex-wrap gap-1">
          <button
            onClick={() => setActiveTool('circular')}
            className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTool === 'circular' 
                ? 'bg-white dark:bg-white/10 text-aqua-primary shadow-sm' 
                : 'text-stone/40 dark:text-white/40 hover:text-stone dark:hover:text-white'
            }`}
          >
            Circular Breathing
          </button>
          <button
            onClick={() => setActiveTool('box')}
            className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTool === 'box' 
                ? 'bg-white dark:bg-white/10 text-aqua-primary shadow-sm' 
                : 'text-stone/40 dark:text-white/40 hover:text-stone dark:hover:text-white'
            }`}
          >
            Box Breathing
          </button>
          <button
            onClick={() => setActiveTool('hold')}
            className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTool === 'hold' 
                ? 'bg-white dark:bg-white/10 text-aqua-primary shadow-sm' 
                : 'text-stone/40 dark:text-white/40 hover:text-stone dark:hover:text-white'
            }`}
          >
            Breath Hold
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTool === 'circular' ? (
          <motion.div
            key="circular"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CircularBreathingLoop />
          </motion.div>
        ) : activeTool === 'box' ? (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <BoxBreathingLoop />
          </motion.div>
        ) : (
          <motion.div
            key="hold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <BreathHoldTimer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BoxBreathingLoop: React.FC = () => {
  const [intervalTime, setIntervalTime] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.5);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.4);
  const [sessionTime, setSessionTime] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const phases = {
    inhale: { label: 'In' },
    hold1: { label: 'Hold' },
    exhale: { label: 'Out' },
    hold2: { label: 'Hold' }
  };

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      const voices = window.speechSynthesis.getVoices();
      
      // Look for a deep, smooth British male voice
      const preferredVoice = 
        voices.find(v => v.name.includes('Natural') && v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) ||
        voices.find(v => v.name === 'Google UK English Male') ||
        voices.find(v => v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) ||
        voices.find(v => v.lang === 'en-GB' && (v.name.includes('Daniel') || v.name.includes('Arthur') || v.name.includes('Oliver'))) ||
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Meditative settings: slow, gentle, and smooth
      utterance.rate = voiceSpeed * 0.8; // Slightly slower for meditation
      utterance.pitch = 0.9; // More natural resonance, less robotic
      utterance.volume = voiceVolume; // Adjustable volume
      
      window.speechSynthesis.speak(utterance);
    }, 50);
  }, [voiceSpeed, voiceVolume]);

  useEffect(() => {
    if (isActive) {
      speak(phases[phase].label);
    }
  }, [phase, isActive, speak]);

  useEffect(() => {
    if (!isActive) {
      window.speechSynthesis?.cancel();
      return;
    }

    const step = 100 / (intervalTime * 10); // 100ms steps
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          return 100;
        }
        return next;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [isActive, intervalTime]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setPhase((current) => {
        if (current === 'inhale') return 'hold1';
        if (current === 'hold1') return 'exhale';
        if (current === 'exhale') return 'hold2';
        return 'inhale';
      });
    }
  }, [progress]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setProgress(0);
    setSessionTime(0);
    window.speechSynthesis?.cancel();
  };

  useEffect(() => {
    let intervalTimer: NodeJS.Timeout;
    if (isActive) {
      intervalTimer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalTimer);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Dynamic size calculations based on intervalTime
  const baseSize = 160;
  const expandedSize = baseSize + (intervalTime * 10); // Expands more for longer intervals
  
  let currentSize = baseSize;
  if (phase === 'inhale') {
    currentSize = baseSize + (expandedSize - baseSize) * (progress / 100);
  } else if (phase === 'hold1') {
    currentSize = expandedSize;
  } else if (phase === 'exhale') {
    currentSize = expandedSize - (expandedSize - baseSize) * (progress / 100);
  } else if (phase === 'hold2') {
    currentSize = baseSize;
  }

  let dotX = 0;
  let dotY = 0;

  if (phase === 'inhale') {
    dotX = (progress / 100) * currentSize;
    dotY = 0;
  } else if (phase === 'hold1') {
    dotX = currentSize;
    dotY = (progress / 100) * currentSize;
  } else if (phase === 'exhale') {
    dotX = currentSize - (progress / 100) * currentSize;
    dotY = currentSize;
  } else if (phase === 'hold2') {
    dotX = 0;
    dotY = currentSize - (progress / 100) * currentSize;
  }

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative flex items-center justify-center w-72 h-72">
        {/* Professional, clean background */}
        <motion.div
          className="absolute bg-stone-100 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700/50 shadow-sm"
          animate={{
            width: currentSize + 40,
            height: currentSize + 40
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        {/* The Square Track - Animated */}
        <motion.div 
          className="absolute border-[2px] border-stone-200 dark:border-stone-700 rounded-xl"
          animate={{ width: currentSize, height: currentSize }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        
        {/* The indicator dot - Solid and clean */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-stone-800 dark:bg-stone-200 z-10 shadow-sm"
          animate={{
            left: `calc(50% - ${currentSize / 2}px + ${dotX}px - 8px)`,
            top: `calc(50% - ${currentSize / 2}px + ${dotY}px - 8px)`,
            opacity: isActive ? 1 : 0.3
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-sm font-medium tracking-[0.2em] uppercase ${
                phase.includes('hold') ? 'text-stone-400 dark:text-stone-500' : 'text-stone-800 dark:text-stone-200'
              }`}
            >
              {phases[phase].label}
            </motion.span>
          </AnimatePresence>
          {isActive && (
            <span className="text-[10px] font-mono opacity-40 mt-2 text-stone-600 dark:text-stone-400">
              {Math.ceil(intervalTime - (progress / 100) * intervalTime)}s
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="text-[10px] font-mono font-bold tracking-widest text-stone-400 dark:text-stone-500 uppercase">
          Session Time: {formatTime(sessionTime)}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="w-16 h-16 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center hover:bg-stone-800 dark:hover:bg-white transition-all shadow-md"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <button
            onClick={reset}
            className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 flex items-center justify-center hover:text-stone-900 dark:hover:text-stone-100 transition-all border border-stone-200 dark:border-stone-700"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${
              showSettings 
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100' 
                : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Settings size={20} />
          </button>
        </div>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden w-full"
            >
              <div className="pt-4 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Interval</span>
                    <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">{intervalTime}s</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setIntervalTime(t);
                          reset();
                        }}
                        className={`w-10 h-10 rounded-lg text-[10px] font-bold transition-all border ${
                          intervalTime === t 
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm' 
                            : 'bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        {t}s
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Voice Speed</span>
                    <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
                      {voiceSpeed === 0.5 ? 'Very Slow' : voiceSpeed === 0.75 ? 'Slow' : voiceSpeed === 1 ? 'Normal' : 'Fast'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      { label: 'Very Slow', value: 0.5 },
                      { label: 'Slow', value: 0.75 },
                      { label: 'Normal', value: 1.0 },
                      { label: 'Fast', value: 1.25 }
                    ].map((speed) => (
                      <button
                        key={speed.label}
                        onClick={() => setVoiceSpeed(speed.value)}
                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                          voiceSpeed === speed.value 
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm' 
                            : 'bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        {speed.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Voice Volume</span>
                    <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">{Math.round(voiceVolume * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={voiceVolume} 
                    onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CircularBreathingLoop: React.FC = () => {
  const [interval, setIntervalTime] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.5);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.4);
  const [sessionTime, setSessionTime] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const phases = {
    inhale: { label: 'In', color: 'text-aqua-primary' },
    exhale: { label: 'Out', color: 'text-aqua-primary' }
  };

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      const voices = window.speechSynthesis.getVoices();
      
      // Look for a deep, smooth British male voice
      const preferredVoice = 
        voices.find(v => v.name.includes('Natural') && v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) ||
        voices.find(v => v.name === 'Google UK English Male') ||
        voices.find(v => v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) ||
        voices.find(v => v.lang === 'en-GB' && (v.name.includes('Daniel') || v.name.includes('Arthur') || v.name.includes('Oliver'))) ||
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Meditative settings: slow, gentle, and smooth
      utterance.rate = voiceSpeed * 0.8; // Slightly slower for meditation
      utterance.pitch = 0.9; // More natural resonance, less robotic
      utterance.volume = voiceVolume; // Adjustable volume
      
      window.speechSynthesis.speak(utterance);
    }, 50);
  }, [voiceSpeed, voiceVolume]);

  useEffect(() => {
    if (isActive) {
      speak(phases[phase].label);
    }
  }, [phase, isActive, speak]);

  useEffect(() => {
    if (!isActive) {
      window.speechSynthesis?.cancel();
      return;
    }

    const step = 100 / (interval * 10); // 100ms steps
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          return 100;
        }
        return next;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [isActive, interval]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setPhase((current) => {
        if (current === 'inhale') return 'exhale';
        return 'inhale';
      });
    }
  }, [progress]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setProgress(0);
    setSessionTime(0);
    window.speechSynthesis?.cancel();
  };

  useEffect(() => {
    let intervalTimer: NodeJS.Timeout;
    if (isActive) {
      intervalTimer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalTimer);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-stone/5 dark:border-white/5" />
        
        {/* Animated Circle */}
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1 + (progress / 100) * 0.5 : 1.5 - (progress / 100) * 0.5,
            opacity: isActive ? 1 : 0.3
          }}
          transition={{ duration: 0.1, ease: "linear" }}
          className="w-32 h-32 rounded-full bg-aqua-primary/20 border-2 border-aqua-primary"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-xs font-black uppercase tracking-[0.4em] ${phases[phase].color}`}
            >
              {phases[phase].label}
            </motion.span>
          </AnimatePresence>
          {isActive && (
            <span className="text-[10px] font-mono opacity-40 mt-2">
              {Math.ceil(interval - (progress / 100) * interval)}s
            </span>
          )}
        </div>

        {/* Progress Ring Overlay */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="126"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-aqua-primary opacity-20"
            strokeDasharray={2 * Math.PI * 126}
            strokeDashoffset={2 * Math.PI * 126 * (1 - progress / 100)}
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="text-[10px] font-mono font-bold tracking-widest text-stone-400 dark:text-stone-500 uppercase">
          Session Time: {formatTime(sessionTime)}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="w-16 h-16 rounded-full bg-stone dark:bg-white text-white dark:text-stone flex items-center justify-center hover:bg-aqua-primary dark:hover:bg-aqua-primary transition-all shadow-xl"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <button
            onClick={reset}
            className="w-12 h-12 rounded-full bg-stone/5 dark:bg-white/5 text-stone/40 dark:text-white/40 flex items-center justify-center hover:text-stone dark:hover:text-white transition-all"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              showSettings ? 'bg-aqua-primary text-white' : 'bg-stone/5 dark:bg-white/5 text-stone/40 dark:text-white/40 hover:text-stone dark:hover:text-white'
            }`}
          >
            <Settings size={20} />
          </button>
        </div>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden w-full"
            >
              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Interval</span>
                  <span className="text-xs font-mono font-bold text-aqua-primary">{interval}s</span>
                </div>
                <div className="flex justify-between gap-2">
                  {[2, 3, 4, 5, 6].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setIntervalTime(t);
                        reset();
                      }}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
                        interval === t 
                          ? 'bg-aqua-primary text-white' 
                          : 'bg-stone/5 dark:bg-white/5 text-stone/40 dark:text-white/40 hover:bg-stone/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Voice Speed</span>
                  <span className="text-xs font-mono font-bold text-aqua-primary">
                    {voiceSpeed === 0.5 ? 'Very Slow' : voiceSpeed === 0.75 ? 'Slow' : voiceSpeed === 1 ? 'Normal' : 'Fast'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { label: 'Very Slow', value: 0.5 },
                    { label: 'Slow', value: 0.75 },
                    { label: 'Normal', value: 1.0 },
                    { label: 'Fast', value: 1.25 }
                  ].map((speed) => (
                    <button
                      key={speed.label}
                      onClick={() => setVoiceSpeed(speed.value)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all ${
                        voiceSpeed === speed.value 
                          ? 'bg-aqua-primary text-white' 
                          : 'bg-stone/5 dark:bg-white/5 text-stone/40 dark:text-white/40 hover:bg-stone/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {speed.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Voice Volume</span>
                    <span className="text-xs font-mono font-bold text-aqua-primary">{Math.round(voiceVolume * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={voiceVolume} 
                    onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-stone/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-aqua-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BreathHoldTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [maxTime, setMaxTime] = useState(() => {
    const saved = localStorage.getItem('aqua-judo-max-hold');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    if (isActive) {
      if (time > maxTime) {
        setMaxTime(time);
        localStorage.setItem('aqua-judo-max-hold', time.toString());
      }
      setIsActive(false);
    } else {
      setTime(0);
      setIsActive(true);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return {
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
      c: centiseconds.toString().padStart(2, '0')
    };
  };

  const current = formatTime(time);
  const best = formatTime(maxTime);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative flex flex-col items-center justify-center py-12">
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-7xl md:text-8xl font-light tracking-tighter text-stone dark:text-white">
            {current.m}:{current.s}
          </span>
          <span className="text-2xl md:text-3xl font-light text-aqua-primary opacity-60">
            .{current.c}
          </span>
        </div>
        <div className="absolute -bottom-2 flex items-center gap-2 px-4 py-1 rounded-full bg-aqua-primary/10 text-aqua-primary">
          <Trophy size={12} />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Best: {best.m}:{best.s}.{best.c}
          </span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl ${
              isActive 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-stone dark:bg-white text-white dark:text-stone hover:bg-aqua-primary dark:hover:bg-aqua-primary'
            }`}
          >
            {isActive ? 'Stop & Record' : 'Start Hold'}
          </button>
          {!isActive && time > 0 && (
            <button
              onClick={() => setTime(0)}
              className="w-16 h-16 rounded-full bg-stone/5 dark:bg-white/5 text-stone/40 dark:text-white/40 flex items-center justify-center hover:text-stone dark:hover:text-white transition-all shrink-0"
            >
              <RotateCcw size={24} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-stone/5 dark:bg-white/5 space-y-1">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Current Session</span>
            <div className="text-lg font-mono font-bold text-stone dark:text-white">
              {current.m}:{current.s}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-stone/5 dark:bg-white/5 space-y-1">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Personal Record</span>
            <div className="text-lg font-mono font-bold text-aqua-primary">
              {best.m}:{best.s}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-center text-stone/40 dark:text-white/40 leading-relaxed max-w-xs">
        Hold your breath only in a safe, seated, or lying position. Never practice breath holds in water without professional supervision.
      </p>
    </div>
  );
};
