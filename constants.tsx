import CH0_DOCTRINE_CONTENT from './content/ch0_doctrine.md?raw';
import CH1_ELIGIBILITY_CONTENT from './content/ch1_eligibility.md?raw';
import CH2_ASSESSMENT_CONTENT from './content/ch2_assessment.md?raw';
import CH3_RESEARCH_CONTENT from './content/ch3_research.md?raw';
import CH4_SITTING_CULTURE_CONTENT from './content/ch4_sitting_culture.md?raw';
import CH5_CORE_MECHANIC_CONTENT from './content/ch5_core_mechanic.md?raw';
import CH6_TECHNICAL_MODEL_CONTENT from './content/ch6_technical_model.md?raw';
import CH7_PHYSIOLOGY_CONTENT from './content/ch7_physiology.md?raw';
import CH8_STRUCTURE_CONTENT from './content/ch8_structure.md?raw';
import CH9_MOVEMENT_THEORY_CONTENT from './content/ch9_movement_theory.md?raw';
import CH10_VESTIBULAR_CONTENT from './content/ch10_vestibular.md?raw';
import CH11_METHOD_OPENING_CONTENT from './content/ch11_method_opening.md?raw';
import CH12_FRAMEWORK_CONTENT from './content/ch12_framework.md?raw';
import CH13_PILLARS_DETAIL_CONTENT from './content/ch13_pillars_detail.md?raw';
import CH14_UKEMI_CONTENT from './content/ch14_ukemi.md?raw';
import CH15_DAILY_PRACTICE_CONTENT from './content/ch15_daily_practice.md?raw';
import CH16_APPLICATIONS_CONTENT from './content/ch16_applications.md?raw';
import CH17_CLOSING_CONTENT from './content/ch17_closing.md?raw';


import { BlogPost } from './types';

export const CH0_DOCTRINE: BlogPost = {
  id: 'doctrine',
  title: "AQUA JUDO",
  subtitle: "The Coastal Performance Method",
  author: "Terry Shark",
  publishedAt: 1710000000000,
  slug: "doctrine",
  chapterNumber: 0,
  keywords: ["Aqua Judo", "Doctrine", "Capacities"],
  takeaways: [
    "Balance is a dynamic negotiation, not a static state.",
    "The environment is the most honest laboratory for structural integrity.",
    "Longevity is built by training the systems that decline with age."
  ],
  content: CH0_DOCTRINE_CONTENT
};

export const CH1_ELIGIBILITY: BlogPost = {
  id: 'eligibility',
  title: "Eligibility",
  subtitle: "For Whom",
  author: "Terry Shark",
  publishedAt: 1710100000000,
  slug: "eligibility",
  chapterNumber: 1,
  keywords: ["Eligibility", "Age", "Requirements"],
  takeaways: [
    "The method is for those 35+ seeking physical capacity that compounds over decades.",
    "It requires a willingness to be uncomfortable and adapt to unpredictable environments.",
    "It is not for peak athletic optimization, acute injuries, or those seeking scripted programs."
  ],
  content: CH1_ELIGIBILITY_CONTENT
};

export const CH2_ASSESSMENT: BlogPost = {
  id: 'assessment',
  title: "Assessment",
  subtitle: "Baseline Metrics",
  author: "Terry Shark",
  publishedAt: 1710200000000,
  slug: "assessment",
  chapterNumber: 2,
  keywords: ["Assessment", "Metrics", "Tracking"],
  takeaways: [
    "Five baseline markers track functional change over the seven-day residency.",
    "Single-leg balance is the most clinically validated predictor of fall risk.",
    "Measurements are an honest record of real-world proprioceptive function."
  ],
  content: CH2_ASSESSMENT_CONTENT
};

export const CH3_RESEARCH: BlogPost = {
  id: 'research',
  title: "The Research",
  subtitle: "Why Judo Ages Well",
  author: "Terry Shark",
  publishedAt: 1710300000000,
  slug: "research",
  chapterNumber: 3,
  keywords: ["Research", "Science", "Judo Benefits"],
  takeaways: [
    "Judo produces multi-system adaptation simultaneously: balance, strength, mobility, and aerobic endurance.",
    "Coastal terrain is inferred to amplify the proprioceptive demands of judo.",
    "The central hypothesis is that coastal judo accelerates structural adaptation relative to dojo-only training."
  ],
  content: CH3_RESEARCH_CONTENT
};

export const CH4_SITTING_CULTURE: BlogPost = {
  id: 'sitting-culture',
  title: "The Sitting Culture",
  subtitle: "We Age From Our Legs",
  author: "Terry Shark",
  publishedAt: 1710350000000,
  slug: "sitting-culture",
  chapterNumber: 4,
  keywords: ["Sitting Culture", "Leg Strength", "Longevity"],
  takeaways: [
    "Aging starts from the legs; maintain foundation for autonomy.",
    "Sitting shuts down the proprioceptive link between feet and brain.",
    "Shifting surfaces force the kinetic chain to remain 'awake'."
  ],
  content: CH4_SITTING_CULTURE_CONTENT
};

export const CH5_CORE_MECHANIC: BlogPost = {
  id: 'core-mechanic',
  title: "The Core Mechanic",
  subtitle: "Kuzushi",
  author: "Terry Shark",
  publishedAt: 1710400000000,
  slug: "core-mechanic",
  chapterNumber: 5,
  keywords: ["Kuzushi", "Balance", "Disruption"],
  takeaways: [
    "Kuzushi is the continuous disruption of balance, acting as a training stimulus.",
    "The coast provides a micro-kuzushi density that exceeds partner judo alone.",
    "Partner interaction translates maximum efficiency into a biological reflex."
  ],
  content: CH5_CORE_MECHANIC_CONTENT
};

export const CH6_TECHNICAL_MODEL: BlogPost = {
  id: 'technical-model',
  title: "Technical Model",
  subtitle: "The Wave",
  author: "Terry Shark",
  publishedAt: 1710500000000,
  slug: "technical-model",
  chapterNumber: 6,
  keywords: ["The Wave", "Timing", "Geometry"],
  takeaways: [
    "All balance disruption follows a predictable wave structure.",
    "A trained body reads instability before it arrives, preventing the fall.",
    "The 'Intercept' phase is where mechanical advantage peaks."
  ],
  content: CH6_TECHNICAL_MODEL_CONTENT
};

export const CH7_PHYSIOLOGY: BlogPost = {
  id: 'physiology',
  title: "Physiology",
  subtitle: "Breath Synchronization",
  author: "Terry Shark",
  publishedAt: 1710600000000,
  slug: "physiology",
  chapterNumber: 7,
  keywords: ["Breath", "Physiology", "Diaphragm"],
  takeaways: [
    "The diaphragm is the body's most important structural stabilizer.",
    "Loss of core stability is a primary contributor to postural decline.",
    "Breath synchronization creates internal pressure to support the spine."
  ],
  content: CH7_PHYSIOLOGY_CONTENT
};

export const CH8_STRUCTURE: BlogPost = {
  id: 'training-structure',
  title: "Training Structure",
  subtitle: "Three Domains & Five Pillars",
  author: "Terry Shark",
  publishedAt: 1710700000000,
  slug: "training-structure",
  chapterNumber: 8,
  keywords: ["Structure", "Domains", "Pillars"],
  takeaways: [
    "Aqua Judo trains balance disruption across three domains simultaneously: Partner, Environment, and Internal.",
    "The method is organized around five pillars that target specific types of stimulus.",
    "The coast is an open system that introduces variables continuously, forcing genuine balance intelligence."
  ],
  content: CH8_STRUCTURE_CONTENT
};

export const CH9_MOVEMENT_THEORY: BlogPost = {
  id: 'movement-theory',
  title: "Movement Theory",
  subtitle: "The Balance Ecology",
  author: "Terry Shark",
  publishedAt: 1710800000000,
  slug: "movement-theory",
  chapterNumber: 9,
  keywords: ["Ecology", "Disruption", "Reorganization"],
  takeaways: [
    "Balance is a continuous negotiation between the body and the forces acting upon it.",
    "The trained body does not seek perfect balance; it reorganizes faster than instability grows.",
    "Fluid systems adapt where rigid systems break. Softness is not weakness; it is precision."
  ],
  content: CH9_MOVEMENT_THEORY_CONTENT
};

export const CH10_VESTIBULAR: BlogPost = {
  id: 'vestibular',
  title: "The Missing Piece",
  subtitle: "The Vestibular System",
  author: "Terry Shark",
  publishedAt: 1710900000000,
  slug: "vestibular",
  chapterNumber: 10,
  keywords: ["Vestibular", "Inner Ear", "Balance Sensor"],
  takeaways: [
    "The vestibular system is the master sensor of human balance, detecting head acceleration, rotation, and gravity.",
    "Deprived of challenge in flat environments, the inner ear declines, leading to instability and fall risk.",
    "Paddleboard movement provides a high-fidelity vestibular laboratory that cannot be replicated on land."
  ],
  content: CH10_VESTIBULAR_CONTENT
};

export const CH11_METHOD_OPENING: BlogPost = {
  id: 'method-opening',
  title: "The Method",
  subtitle: "Movement Is Intelligence",
  author: "Terry Shark",
  publishedAt: 1711000000000,
  slug: "method-opening",
  chapterNumber: 11,
  keywords: ["Method", "Intelligence", "Lake Ontario"],
  takeaways: [
    "The real test of a trained body is what it does automatically, under real conditions, without warning.",
    "Dynamic stability is the ability to remain organized, responsive, and efficient under continuous unpredictable load.",
    "The coast is the most honest training environment available."
  ],
  content: CH11_METHOD_OPENING_CONTENT
};

export const CH12_FRAMEWORK: BlogPost = {
  id: 'framework',
  title: "The Framework",
  subtitle: "The Master Key",
  author: "Terry Shark",
  publishedAt: 1711100000000,
  slug: "framework",
  chapterNumber: 12,
  keywords: ["Master Key", "Breath Cycle", "Rhythm"],
  takeaways: [
    "The breath cycle governs every movement in the method, mapping breath onto the mechanics of balance disruption.",
    "A body that breathes with its movement maintains stabilizing systems that remain active and coordinated throughout life.",
    "The loss of breath-structure coordination is a primary contributor to postural decline and fall risk."
  ],
  content: CH12_FRAMEWORK_CONTENT
};

export const CH13_PILLARS_DETAIL: BlogPost = {
  id: 'pillars-detail',
  title: "The Pillars",
  subtitle: "Structure, Ground, Water, Terrain, Commitment",
  author: "Terry Shark",
  publishedAt: 1711200000000,
  slug: "pillars-detail",
  chapterNumber: 13,
  keywords: ["Pillars", "Shisei", "Sand", "Commitment"],
  takeaways: [
    "A body aligned by geometry carries load for free, keeping muscles soft and available.",
    "Sand is the diagnostic surface; it reveals excess tension and misalignment immediately.",
    "Terrain trains the decision made before the step lands, demanding visual foresight (Active Recon)."
  ],
  content: CH13_PILLARS_DETAIL_CONTENT
};

export const CH14_UKEMI: BlogPost = {
  id: 'ukemi',
  title: "The Art of Ukemi",
  subtitle: "Absorbing Force with Precision",
  author: "Terry Shark",
  publishedAt: 1711250000000,
  slug: "ukemi",
  chapterNumber: 14,
  keywords: ["Ukemi", "Falling", "Safety", "Energy Dissipation"],
  takeaways: [
    "Protect the head by maintaining a tucked chin at all times.",
    "Exhale on impact to stabilize the spine with internal pressure.",
    "Dissipate energy by slapping the surface with a relaxed arm.",
    "Convert linear falls into angular rolls to maintain momentum."
  ],
  content: CH14_UKEMI_CONTENT
};

export const CH15_DAILY_PRACTICE: BlogPost = {
  id: 'daily-practice',
  title: "Daily Practice",
  subtitle: "The Training Rhythm",
  author: "Terry Shark",
  publishedAt: 1711260000000,
  slug: "daily-practice",
  chapterNumber: 15,
  keywords: ["Training", "Rhythm", "Activation", "Exploration", "Regulation"],
  takeaways: [
    "Every session consists of three phases: Activation, Exploration, and Regulation.",
    "The nervous system does not count reps. It counts quality.",
    "The session ends when quality degrades, not at a fixed time."
  ],
  content: CH15_DAILY_PRACTICE_CONTENT
};

export const CH16_APPLICATIONS: BlogPost = {
  id: 'applications',
  title: "Applications",
  subtitle: "The Seven Days",
  author: "Terry Shark",
  publishedAt: 1711300000000,
  slug: "applications",
  chapterNumber: 16,
  keywords: ["Residency", "Cabo Bello", "Schedule", "Integration"],
  takeaways: [
    "The residency is a seven-day immersion in biological resilience.",
    "Each day adds a layer of complexity until there are no more drills, only movement.",
    "Synthesis occurs when movement becomes a reflexive baseline."
  ],
  content: CH16_APPLICATIONS_CONTENT
};

export const CH17_CLOSING: BlogPost = {
  id: 'closing',
  title: "Closing",
  subtitle: "The Long Game & Glossary",
  author: "Terry Shark",
  publishedAt: 1711400000000,
  slug: "closing",
  chapterNumber: 17,
  keywords: ["Closing", "Glossary", "Terms", "Longevity"],
  takeaways: [
    "A movement that cost effort now costs nothing. You are not stronger. You are more organized.",
    "The body that trains this way at 50 moves better at 60 than a body that spent the same decade in a gym.",
    "Movement is not a performance. It is the ongoing evidence that the body is still capable, still organized, still alive to the world."
  ],
  content: CH17_CLOSING_CONTENT
};

export const BLOG_POSTS: BlogPost[] = [
  CH0_DOCTRINE,
  CH1_ELIGIBILITY,
  CH2_ASSESSMENT,
  CH3_RESEARCH,
  CH4_SITTING_CULTURE,
  CH5_CORE_MECHANIC,
  CH6_TECHNICAL_MODEL,
  CH7_PHYSIOLOGY,
  CH8_STRUCTURE,
  CH9_MOVEMENT_THEORY,
  CH10_VESTIBULAR,
  CH11_METHOD_OPENING,
  CH12_FRAMEWORK,
  CH13_PILLARS_DETAIL,
  CH14_UKEMI,
  CH15_DAILY_PRACTICE,
  CH16_APPLICATIONS,
  CH17_CLOSING
];

