import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Share2, BookOpen, Menu, X, ChevronRight, ExternalLink, Maximize2, Minimize2, CheckCircle2, Twitter, Facebook, Linkedin, Instagram, Moon, Sun } from 'lucide-react';
import { BlogPost } from '../types';
import { Logo } from './Common';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { GLOSSARY } from '../src/glossary';
import { GlossaryModal } from './GlossaryModal';

import { MasterKeyDiagram, FivePillarsDiagram, TheWaveDiagram, BalanceEcologyDiagram, EnvironmentalKuzushiDiagram, EligibilityGrid, AssessmentTable, NoteOnAge, ResearchStats, ResearchThreeTier, WavePhasesDetail, SessionStructure, JudoFundamentals, UkemiDiagram, ActiveReconDetail, SittingStats } from './Diagrams';
import { BreathingTools } from './BreathingTools';

interface BlogPageProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onNavigate: (index: number) => void;
  onNextPost?: () => void;
  hasNextPost?: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({ post, allPosts, onNavigate, onNextPost, hasNextPost }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('aqua-judo-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('00');
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem('aqua-judo-progress');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<string | null>(null);
  
  useEffect(() => {
    localStorage.setItem('aqua-judo-progress', JSON.stringify(completedChapters));
  }, [completedChapters]);

  useEffect(() => {
    localStorage.setItem('aqua-judo-dark-mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleChapterCompletion = (chapterId: string) => {
    setCompletedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const currentIndex = allPosts.findIndex(p => p.id === post.id);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const getTextContent = (children: any): string => {
    return React.Children.toArray(children)
      .map((child: any) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return child;
        }
        if (child.props && child.props.children) {
          return getTextContent(child.props.children);
        }
        return '';
      })
      .join('');
  };

  // Dynamically generate sections from markdown content
  const sections = React.useMemo(() => {
    const headingRegex = /^##\s+(?:(\d{2})\s+)?(.+)$/gm;
    const matches = Array.from(post.content.matchAll(headingRegex));
    return matches.map((match, index) => {
      const numFromText = match[1];
      const title = match[2].replace(/[*_~`]/g, '').trim(); // Strip basic markdown
      const fullText = numFromText ? `${numFromText} ${title}` : title;
      const id = slugify(fullText);
      
      return {
        id,
        num: numFromText || index.toString().padStart(2, '0'),
        title
      };
    });
  }, [post.content]);

  useEffect(() => {
    setActiveSection('00');
    window.scrollTo(0, 0);
  }, [post.id]);

  useEffect(() => {
    // Update Page Title with Chapter Number
    const chapterPrefix = post.chapterNumber ? `Chapter ${post.chapterNumber}: ` : '';
    document.title = `${chapterPrefix}${post.title} | Aqua Judo Cabo`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', post.subtitle || `Read ${post.title} by ${post.author} on Aqua Judo Cabo.`);

    // Update Open Graph Tags
    const updateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('og:title', `${post.chapterNumber ? `Chapter ${post.chapterNumber}: ` : ''}${post.title} | The Aqua Judo Method`);
    updateMeta('og:description', post.subtitle);
    updateMeta('og:type', 'article');

    // Update Keywords Meta Tag
    if (post.keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', post.keywords.join(', '));
    }

    // Update Twitter Tags
    const updateTwitter = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateTwitter('twitter:title', `${post.chapterNumber ? `Chapter ${post.chapterNumber}: ` : ''}${post.title} | The Aqua Judo Method`);
    updateTwitter('twitter:description', post.subtitle);
    updateTwitter('twitter:card', 'summary_large_image');

    // JSON-LD Structured Data for AI & Search Engines
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${post.chapterNumber ? `Chapter ${post.chapterNumber}: ` : ''}${post.title}`,
      "description": post.subtitle,
      "keywords": post.keywords?.join(', '),
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://aquajudo-cabo.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aqua Judo Cabo",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aquajudo-cabo.com/logo.png"
        }
      },
      "datePublished": new Date(post.publishedAt).toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://aquajudo-cabo.com/${post.slug}`
      },
      "articleSection": "The Aqua Judo Method Curriculum",
      "about": post.keywords,
      "inLanguage": "en-US",
      "isAccessibleForFree": "True",
      "learningResourceType": "Curriculum",
      "educationalUse": "Physical Education, Longevity Research"
    };

    let script = document.getElementById('json-ld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
    
    return () => {
      // Optional: Reset title when leaving page if needed
    };
  }, [post]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id);
          if (section) {
            setActiveSection(section.num);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, post.id]); // Re-run when post changes

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsSidebarOpen(false);
    }
  };

  const getDisplayTitle = (children: any) => {
    const text = getTextContent(children);
    const match = text.match(/^(\d{2})\s+(.+)$/);
    
    if (match) {
      const num = match[1];
      const rest = match[2];
      return (
        <span className="flex items-start gap-2 md:gap-4">
          <span className="text-[0.4em] font-black tracking-widest text-aqua-primary pt-[0.6em] shrink-0">{num}</span>
          <span>{rest}</span>
        </span>
      );
    }

    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    
    const section = sections.find(s => s.id === id);
    if (section) {
      return (
        <span className="flex items-start gap-2 md:gap-4">
          <span className="text-[0.4em] font-black tracking-widest text-aqua-primary pt-[0.6em] shrink-0">{section.num}</span>
          <span>{children}</span>
        </span>
      );
    }
    return children;
  };

  const renderTextWithGlossary = (text: string) => {
    if (!text || typeof text !== 'string') return text;

    const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

    const parts = text.split(pattern);
    if (parts.length === 1) return text;

    return parts.map((part, i) => {
      const lowerPart = part.toLowerCase();
      const matchedTerm = terms.find(t => t.toLowerCase() === lowerPart);
      
      if (matchedTerm) {
        return (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedGlossaryTerm(matchedTerm);
            }}
            className="inline-block border-b border-dotted border-aqua-primary/40 hover:border-aqua-primary hover:text-aqua-primary transition-all cursor-help font-medium"
          >
            {part}
          </button>
        );
      }
      return part;
    });
  };

  const processChildrenForGlossary = (children: any): any => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return renderTextWithGlossary(child);
      }
      if (React.isValidElement(child) && (child.props as any) && (child.props as any).children) {
        return React.cloneElement(child as React.ReactElement<any>, {
          children: processChildrenForGlossary((child.props as any).children)
        });
      }
      return child;
    });
  };

  // Custom components for Markdown to inject diagrams
  const components = {
    h1: ({ children }: any) => {
      const text = getTextContent(children);
      const id = slugify(text);
      return (
        <h1 id={id} className="text-4xl md:text-7xl font-display font-light uppercase tracking-tighter leading-[0.9] text-stone dark:text-white mt-24 mb-12 scroll-mt-32">
          {getDisplayTitle(children)}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      const text = getTextContent(children);
      const id = slugify(text);
      return (
        <h2 id={id} className="text-xs font-black uppercase tracking-[0.3em] text-aqua-primary mt-20 mb-8 scroll-mt-32">
          {getDisplayTitle(children)}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const text = getTextContent(children);
      const id = slugify(text);
      return (
        <h3 id={id} className="text-lg md:text-xl font-display font-light uppercase tracking-tight text-stone dark:text-white mt-12 mb-6 scroll-mt-32">
          {getDisplayTitle(children)}
        </h3>
      );
    },
    p: ({ children }: any) => {
      const text = getTextContent(children);
      if (text === '[DIAGRAM:MASTER_KEY]') return <MasterKeyDiagram />;
      if (text === '[DIAGRAM:FIVE_PILLARS]') return <FivePillarsDiagram />;
      if (text === '[DIAGRAM:THE_WAVE]' || text === '[SECTION:THE_WAVE_DIAGRAM]') return <TheWaveDiagram />;
      if (text === '[DIAGRAM:BALANCE_ECOLOGY]') return <BalanceEcologyDiagram />;
      if (text === '[DIAGRAM:ENVIRONMENTAL_KUZUSHI]') return <EnvironmentalKuzushiDiagram />;
      if (text === '[SECTION:ELIGIBILITY]') return <EligibilityGrid />;
      if (text === '[SECTION:ASSESSMENT_TABLE]') return <AssessmentTable />;
      if (text === '[SECTION:NOTE_ON_AGE]') return <NoteOnAge />;
      if (text === '[SECTION:RESEARCH_STATS]') return <ResearchStats />;
      if (text === '[SECTION:RESEARCH_THREE_TIER]') return <ResearchThreeTier />;
      if (text === '[SECTION:WAVE_PHASES_DETAIL]') return <WavePhasesDetail />;
      if (text === '[SECTION:SESSION_STRUCTURE]') return <SessionStructure />;
      if (text === '[DIAGRAM:JUDO_FUNDAMENTALS]') return <JudoFundamentals />;
      if (text === '[DIAGRAM:UKEMI]') return <UkemiDiagram />;
      if (text === '[SECTION:ACTIVE_RECON_DETAIL]') return <ActiveReconDetail />;
      if (text === '[SECTION:SITTING_STATS]') return <SittingStats />;
      if (text === '[SECTION:BREATHING_TOOLS]') return <BreathingTools />;
      return <p>{processChildrenForGlossary(children)}</p>;
    },
    li: ({ children }: any) => {
      return <li className="mb-4">{processChildrenForGlossary(children)}</li>;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isFocusMode ? (isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f4f0]') : (isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#fcfbf9]')} text-stone dark:text-[#fcfbf9] font-sans selection:bg-aqua-primary/20`}>
      {/* Reading Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 bg-aqua-primary z-[100] origin-left transition-opacity duration-700 ${isFocusMode ? 'opacity-20' : 'opacity-100'}`}
        style={{ scaleX }}
      />

      <GlossaryModal 
        term={selectedGlossaryTerm}
        definition={selectedGlossaryTerm ? GLOSSARY[selectedGlossaryTerm] : null}
        onClose={() => setSelectedGlossaryTerm(null)}
      />

      {/* Book Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between border-b border-stone/5 transition-all duration-700 ${isFocusMode ? 'opacity-0 pointer-events-none -translate-y-full' : (isDarkMode ? 'bg-[#0a0a0a]/80 backdrop-blur-xl opacity-100' : 'bg-[#fcfbf9]/80 backdrop-blur-xl opacity-100')}`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/60">
            <a 
              href="https://aquajudo.com" 
              className="hover:text-aqua-primary transition-colors flex items-center gap-1"
            >
              Return to Residency
            </a>
            <ChevronRight size={8} className="opacity-20" />
            <span className="text-stone/60 dark:text-white/80">The Method</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-aqua-primary/10 text-aqua-primary' : 'bg-stone/5 text-stone/60 hover:bg-stone/10 hover:text-stone'}`}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`p-2 rounded-full transition-all duration-300 ${isFocusMode ? 'bg-aqua-primary/10 text-aqua-primary' : 'bg-stone/5 text-stone/60 hover:bg-stone/10 hover:text-stone'}`}
            title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsShareOpen(!isShareOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${isShareOpen ? 'bg-aqua-primary/10 text-aqua-primary' : 'bg-stone/5 text-stone/60 hover:bg-stone/10 hover:text-stone'}`}
              title="Share Study"
            >
              <Share2 size={16} />
            </button>
            <AnimatePresence>
              {isShareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 p-4 bg-white dark:bg-[#1a1a1a] border border-stone/5 dark:border-white/10 shadow-2xl rounded-2xl flex flex-col gap-4 z-[60] min-w-[160px] pointer-events-auto"
                >
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone/40 dark:text-white/40 px-2">Share Study</p>
                  <div className="flex flex-col gap-1">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 p-2 hover:bg-stone/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                      <Twitter size={14} className="text-stone/40 dark:text-white/60 group-hover:text-[#1DA1F2]" />
                      <span className="text-xs font-display font-light uppercase tracking-tight">Twitter</span>
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 p-2 hover:bg-stone/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                      <Facebook size={14} className="text-stone/40 dark:text-white/60 group-hover:text-[#1877F2]" />
                      <span className="text-xs font-display font-light uppercase tracking-tight">Facebook</span>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 p-2 hover:bg-stone/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                      <Linkedin size={14} className="text-stone/40 dark:text-white/60 group-hover:text-[#0A66C2]" />
                      <span className="text-xs font-display font-light uppercase tracking-tight">LinkedIn</span>
                    </a>
                    <a 
                      href="https://instagram.com/aquajudo" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 p-2 hover:bg-stone/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                      <Instagram size={14} className="text-stone/40 dark:text-white/60 group-hover:text-[#E4405F]" />
                      <span className="text-xs font-display font-light uppercase tracking-tight">Instagram</span>
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setIsShareOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-stone/5 dark:hover:bg-white/5 rounded-lg transition-colors group w-full text-left"
                    >
                      <Share2 size={14} className="text-stone/40 dark:text-white/60 group-hover:text-aqua-primary" />
                      <span className="text-xs font-display font-light uppercase tracking-tight">Copy Link</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-stone dark:text-white hover:text-aqua-primary transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Sidebar Table of Contents */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-stone/20 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0a0a0a] z-[120] shadow-2xl p-12 flex flex-col transition-colors duration-700"
            >
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-8 right-8 p-2 text-stone/40 dark:text-white/60 hover:text-stone dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-12 mt-12 overflow-y-auto flex-1 pr-4 custom-scrollbar">
                {/* Curriculum Progress Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-aqua-primary">Your Progress</p>
                    <p className="text-[10px] font-mono text-stone/40 dark:text-white/60">{Math.round((completedChapters.length / allPosts.length) * 100)}%</p>
                  </div>
                  <div className="h-1 w-full bg-stone/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedChapters.length / allPosts.length) * 100}%` }}
                      className="h-full bg-aqua-primary"
                    />
                  </div>
                </div>

                {/* Global Chapter Navigation */}
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/60">The Curriculum</p>
                  <div className="space-y-4">
                    {allPosts.map((p, i) => (
                      <button 
                        key={p.id}
                        onClick={() => {
                          onNavigate(i);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex items-start gap-4 group text-left w-full transition-colors ${post.id === p.id ? 'text-stone dark:text-white' : 'text-stone/40 dark:text-white/60 hover:text-stone dark:hover:text-white'}`}
                      >
                        <div className="relative pt-1 shrink-0">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${post.id === p.id ? 'text-aqua-primary' : 'text-stone/40 dark:text-white/60'}`}>
                            {p.chapterNumber === 0 ? 'PR' : p.chapterNumber === 17 ? 'CN' : p.chapterNumber.toString().padStart(2, '0')}
                          </span>
                          {completedChapters.includes(p.id) && (
                            <div className="absolute -top-1 -right-2 text-aqua-primary">
                              <CheckCircle2 size={10} fill="currentColor" className="text-white dark:text-[#0a0a0a]" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-display font-light uppercase tracking-tight leading-tight">{p.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full bg-stone/5 dark:bg-white/5" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/60">Current Chapter</p>
                    <h3 className="text-xl font-display font-light uppercase tracking-tighter text-stone dark:text-white">{post.title}</h3>
                  </div>

                  <div className="space-y-6">
                    {sections.map((item, i) => (
                      <button 
                        key={i}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-start gap-6 group text-left w-full ${activeSection === item.num ? 'text-stone dark:text-white' : 'text-stone/40 dark:text-white/60 hover:text-stone dark:hover:text-white'} transition-colors`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest pt-1">{item.num}</span>
                        <span className="text-lg font-display font-light uppercase tracking-tight leading-tight">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-stone/5 dark:border-white/5">
                <div className="flex items-center gap-4 opacity-60 dark:opacity-90">
                  <div className="leading-tight text-stone dark:text-white">
                    <p className="text-[9px] font-black uppercase tracking-widest">Aqua Judo Cabo</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest">Estate Registry</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Focus Mode Toggle (Floating when in focus mode) */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsFocusMode(false)}
            className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-aqua-primary text-white shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group"
            title="Exit Focus Mode"
          >
            <Minimize2 size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500">Exit Focus Mode</span>
          </motion.button>
        )}
      </AnimatePresence>

      <main className={`mx-auto grid transition-all duration-700 relative px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-16 ${isFocusMode ? 'max-w-[850px] grid-cols-1' : 'max-w-screen-2xl grid-cols-1 lg:grid-cols-[1fr_850px_1fr] gap-4 lg:gap-8'}`}>
        {!isFocusMode && <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />}
        {/* Left Margin - Meta Info */}
        {!isFocusMode && (
          <aside className="hidden lg:block space-y-20 sticky top-48 h-fit pr-12 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar opacity-60 hover:opacity-100 transition-opacity duration-500">
          {/* Global Chapter Navigation */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black uppercase tracking-widest text-aqua-primary">Curriculum Progress</p>
                <p className="text-[10px] font-mono text-stone/60 dark:text-white/80">{Math.round((completedChapters.length / allPosts.length) * 100)}%</p>
              </div>
              <div className="h-0.5 w-full bg-stone/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedChapters.length / allPosts.length) * 100}%` }}
                  className="h-full bg-aqua-primary"
                />
              </div>
            </div>

            <div className="space-y-4">
              {allPosts.map((p, i) => (
                  <button 
                    key={p.id}
                    onClick={() => onNavigate(i)}
                    className={`flex items-start gap-4 group text-left w-full transition-all duration-300 ${post.id === p.id ? 'text-stone dark:text-white' : 'text-stone/40 dark:text-white/60 hover:text-stone/60 dark:hover:text-white/80'}`}
                  >
                    <div className="relative pt-0.5 shrink-0">
                      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${post.id === p.id ? 'text-aqua-primary' : 'text-stone/40 dark:text-white/60'}`}>
                      {p.chapterNumber === 0 ? 'PR' : p.chapterNumber === 17 ? 'CN' : p.chapterNumber.toString().padStart(2, '0')}
                    </span>
                    {completedChapters.includes(p.id) && (
                      <div className="absolute -top-1 -right-2 text-aqua-primary">
                        <CheckCircle2 size={8} fill="currentColor" className="text-white dark:text-[#0a0a0a]" />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-display font-light uppercase tracking-widest leading-tight">{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px w-8 bg-stone/5 dark:bg-white/5" />

          {/* Table of Contents (Current Chapter) */}
          <div className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Current Chapter</p>
            <div className="space-y-6">
              {sections.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-start gap-4 group text-left w-full transition-all duration-300 ${activeSection === item.num ? 'text-stone dark:text-white' : 'text-stone/40 dark:text-white/60 hover:text-stone/60 dark:hover:text-white/80'}`}
                >
                  <span className={`text-[9px] font-black uppercase tracking-widest pt-0.5 transition-colors ${activeSection === item.num ? 'text-aqua-primary' : 'text-stone/40 dark:text-white/60'}`}>{item.num}</span>
                  <span className="text-[11px] font-display font-light uppercase tracking-widest leading-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px w-8 bg-stone/5 dark:bg-white/5" />

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Author</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone/5 dark:bg-white/5 overflow-hidden grayscale">
                <img src="https://picsum.photos/seed/terry/100/100" alt={`Portrait of ${post.author}, Aqua Judo Head Coach`} referrerPolicy="no-referrer" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone dark:text-white">{post.author}</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Published</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone dark:text-white">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone/40 dark:text-white/80">Reading Time</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone dark:text-white">12 Minutes</p>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-stone/5 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest text-stone/60 dark:text-white/60 hover:text-aqua-primary dark:hover:text-aqua-primary transition-all"
            >
              {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
              <span>{isDarkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </aside>
      )}

      {/* Center - Content */}
        <article className={`space-y-16 md:space-y-24 transition-all duration-700 ${isFocusMode ? 'relative z-10' : ''}`}>
          {/* Header */}
          <header className="space-y-6 md:space-y-8 text-center mb-8 md:mb-12">
            <div className="space-y-4 md:space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-aqua-primary"
              >
                <div className="h-px w-8 md:w-12 bg-aqua-primary/20" />
                {post.chapterNumber === 0 ? 'Preface' : post.chapterNumber === 17 ? 'Conclusion' : `Chapter ${post.chapterNumber}`}
                <div className="h-px w-8 md:w-12 bg-aqua-primary/20" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-[120px] font-display font-light uppercase tracking-tighter leading-[0.9] text-stone dark:text-[#fcfbf9] break-words"
              >
                {getDisplayTitle(post.title)}
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl font-serif italic text-stone/50 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4"
            >
              {post.subtitle}
            </motion.p>
          </header>

            {/* Body Content */}
          <div className={`markdown-body max-w-[850px] mx-auto transition-all duration-700 ${isFocusMode ? (isDarkMode ? 'bg-white/5 backdrop-blur-sm p-8 md:p-16 rounded-[3rem] shadow-sm border border-white/10 mt-12 mb-24' : 'bg-white/30 backdrop-blur-sm p-8 md:p-16 rounded-[3rem] shadow-sm border border-white/20 mt-12 mb-24') : ''}`}>
            <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
          </div>

          {/* Social Share Section */}
          <div className="max-w-[720px] mx-auto pt-12 border-t border-stone/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-700">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone/60 dark:text-white">Share the Study</p>
              <p className="text-sm font-serif italic text-stone/60 dark:text-white/80">Help expand the research by sharing this chapter.</p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-stone/5 dark:border-white/20 flex items-center justify-center text-stone/40 dark:text-white hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20 transition-all"
                title="Share on Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-stone/5 dark:border-white/20 flex items-center justify-center text-stone/40 dark:text-white hover:text-[#1877F2] hover:border-[#1877F2]/20 transition-all"
                title="Share on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-stone/5 dark:border-white/20 flex items-center justify-center text-stone/40 dark:text-white hover:text-[#0A66C2] hover:border-[#0A66C2]/20 transition-all"
                title="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://instagram.com/aquajudo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-stone/5 dark:border-white/20 flex items-center justify-center text-stone/40 dark:text-white hover:text-[#E4405F] hover:border-[#E4405F]/20 transition-all"
                title="Follow on Instagram"
              >
                <Instagram size={18} />
              </a>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-10 h-10 rounded-full border border-stone/5 dark:border-white/20 flex items-center justify-center text-stone/40 dark:text-white hover:text-aqua-primary hover:border-aqua-primary/20 transition-all"
                title="Copy Link"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Bento Summary - Principles for Practice */}
          {post.takeaways && (
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-8 mb-12 md:mb-20 p-8 md:p-12 bg-[#f5f4f0] dark:bg-white/[0.02] border border-stone/10 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group transition-colors duration-700"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 space-y-8 md:space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-aqua-primary/10 flex items-center justify-center text-aqua-primary">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-aqua-primary">Principles for Practice</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {post.takeaways.map((takeaway, i) => (
                    <div key={i} className="space-y-3 md:space-y-4 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-white/[0.03] border border-stone/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-700">
                      <span className="text-[9px] md:text-[10px] font-mono text-stone/20 dark:text-white/40">0{i + 1}</span>
                      <p className="text-sm font-serif italic leading-relaxed text-stone/70 dark:text-white/60">
                        {takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Deepen the Study Section - Only on final page */}
          {currentIndex === allPosts.length - 1 && (
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-[800px] mx-auto pt-8 md:pt-12"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-[#fdfcfb] dark:bg-white/[0.02] border border-stone/5 dark:border-white/5 p-10 md:p-16 text-center space-y-8 md:space-y-10 group transition-colors duration-700">
                {/* Decorative Background Element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-aqua-primary/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 pointer-events-none" />
                
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <div className="flex items-center justify-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-aqua-primary">
                    <div className="h-px w-6 md:w-8 bg-aqua-primary/30" />
                    The Direct Experience
                    <div className="h-px w-6 md:w-8 bg-aqua-primary/30" />
                  </div>
                  
                  <h2 className="text-4xl md:text-7xl font-display font-light uppercase tracking-tighter leading-[0.9] text-stone dark:text-white">
                    DEEPEN THE STUDY
                  </h2>
                  
                  <p className="text-lg md:text-2xl font-serif italic text-stone/60 dark:text-white/80 max-w-xl mx-auto leading-relaxed px-4">
                    The architecture of resilience is forged through direct environmental interaction.
                  </p>
                </div>

                <div className="relative z-10 pt-4 md:pt-8">
                  <a 
                    href="https://aquajudo.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-6 bg-stone dark:bg-white/10 text-white rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-aqua-primary transition-all shadow-2xl hover:scale-105 active:scale-95 group"
                  >
                    Apply for Residency
                    <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="pt-12 relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone/20 dark:text-white/40">Limited Capacity — Estate Registry Required</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* Closing */}
          <footer className="pt-4 md:pt-6 border-t border-stone/5 dark:border-white/5 transition-colors duration-700">
            <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
              <div className="space-y-3">
                <Logo className="w-12 h-12 mx-auto opacity-60 dark:opacity-100" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone/60 dark:text-white/90">
                  End of Chapter {post.chapterNumber === 0 ? 'Preface' : post.chapterNumber === 17 ? 'Conclusion' : post.chapterNumber}
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 pt-4">
                  <div className="flex flex-col items-center gap-6">
                    <button 
                      onClick={() => toggleChapterCompletion(post.id)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 ${completedChapters.includes(post.id) ? 'bg-aqua-primary border-aqua-primary text-white' : 'bg-transparent border-stone/20 dark:border-white/40 text-stone/60 dark:text-white hover:border-aqua-primary/50 hover:text-aqua-primary'}`}
                    >
                      <CheckCircle2 size={16} fill={completedChapters.includes(post.id) ? "white" : "transparent"} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {completedChapters.includes(post.id) ? 'Chapter Completed' : 'Mark as Completed'}
                      </span>
                    </button>
                  </div>

                  {currentIndex > 0 && (
                    <button 
                      onClick={() => {
                        onNavigate(currentIndex - 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group flex flex-col items-center gap-6"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone/20 dark:text-white/60 group-hover:text-aqua-primary transition-colors">Previous</span>
                      <span className="text-2xl md:text-3xl font-display font-light uppercase tracking-tight text-stone/40 dark:text-white/40 group-hover:text-stone dark:group-hover:text-white transition-colors border-b border-transparent group-hover:border-stone/10 dark:group-hover:border-white/10 pb-2">
                        {allPosts[currentIndex - 1].title}
                      </span>
                    </button>
                  )}
                  
                  {currentIndex < allPosts.length - 1 ? (
                    <button 
                      onClick={() => {
                        onNavigate(currentIndex + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group flex flex-col items-center gap-6"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-aqua-primary">Next Chapter</span>
                      <span className="text-3xl md:text-5xl font-display font-light uppercase tracking-tighter text-stone dark:text-white group-hover:text-aqua-primary transition-colors border-b border-transparent group-hover:border-aqua-primary/20 pb-2">
                        {allPosts[currentIndex + 1].title}
                      </span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        onNavigate(0);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group flex flex-col items-center gap-6"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone/20 dark:text-white/60 group-hover:text-aqua-primary transition-colors">Complete</span>
                      <span className="text-2xl md:text-3xl font-display font-light uppercase tracking-tight text-stone/40 dark:text-white/40 group-hover:text-stone dark:group-hover:text-white transition-colors border-b border-transparent group-hover:border-stone/10 dark:group-hover:border-white/10 pb-2">
                        Return to Preface
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Right Margin - Annotations/Quotes/Field Notes */}
        {!isFocusMode && (
          <aside className="hidden lg:block space-y-32 sticky top-48 h-fit opacity-60 hover:opacity-100 transition-opacity duration-500">
            {post.fieldNotes?.map((note) => (
            <div key={note.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-aqua-primary/30" />
                <span className="text-[8px] font-black uppercase tracking-widest text-aqua-primary">Field Note</span>
              </div>
              <p className="text-[12px] font-serif italic text-stone/60 dark:text-white/80 leading-relaxed border-l border-stone/5 dark:border-white/5 pl-4">
                {note.text}
              </p>
            </div>
          ))}
          
          {!post.fieldNotes && (
            <>
              <div className="space-y-6">
                <div className="h-px w-12 bg-aqua-primary/30" />
                <p className="text-[12px] font-serif italic text-stone/30 dark:text-white/50 leading-relaxed">
                  "Movement intelligence grew from solving these physical problems."
                </p>
              </div>
              <div className="space-y-6">
                <div className="h-px w-12 bg-stone/5 dark:bg-white/5" />
                <p className="text-[12px] font-serif italic text-stone/30 dark:text-white/50 leading-relaxed">
                  The method reintroduces environmental interaction as a component of physical development.
                </p>
              </div>
            </>
          )}
          
          <div className="pt-40">
            <div className="w-12 h-12 rounded-full border border-stone/10 dark:border-white/20 flex items-center justify-center text-stone/20 dark:text-white/40">
              <BookOpen size={18} />
            </div>
          </div>
        </aside>
      )}
    </main>
    </div>
  );
};

export default BlogPage;
