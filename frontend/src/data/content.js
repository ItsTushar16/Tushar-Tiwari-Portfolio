export const CONFIG = {
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || (import.meta.env.DEV ? 'http://localhost:8080/inquiry' : ''), // local dev talks to your local backend automatically; in production set VITE_FORM_ENDPOINT
  resumeUrl: '',    // TODO: add a hosted resume PDF link
  email: 'tushartiwari.tech@gmail.com',
  location: 'Gurugram, Haryana, India',
  linkedin: 'https://www.linkedin.com/in/tushar-tiwari-dev',
  github: 'https://github.com/ItsTushar16',
  x: 'https://x.com/tushar_tiwari16',
  sourceRepo: '', // paste your portfolio's own repo URL to show a "View Source" link in the footer
}

export const NAV = ['about', 'skills', 'projects', 'services', 'process', 'contact']

export const ROLES = ['Builder', 'Creator', 'Developer', 'Problem Solver', 'Builder'] // last item duplicates the first for a seamless loop

export const TICK_ITEMS = ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'MVC Architecture', 'JavaScript', 'Bootstrap', 'C++', 'MySQL', 'Authentication', 'Cloud Deploy', 'Passport.js', 'CRUD']

export const EDUCATION = [
  { school: 'SGT University', sub: 'B.Tech · Computer Science & Engineering', years: '2025 — 2029', badge: 'Ongoing' },
  { school: 'Royal Public Sr. Sec. School', sub: 'Higher Secondary · Science', years: '2024 — 2025', badge: '80%' },
]

export const SEMS = [
  { id: 'S1', label: 'Semester 1', sgpa: 8.67, pct: 86.7, status: 'done' },
  { id: 'S2', label: 'Semester 2', sgpa: 9.29, pct: 92.9, status: 'done' },
  { id: 'S3', label: 'Semester 3', sgpa: null, pct: 0, status: 'current' },
  { id: 'S4', label: 'Semester 4', sgpa: null, pct: 0, status: 'upcoming' },
]
export const OVERALL_CGPA = 8.98

export const SKILLS = [
  { n: '01', name: 'Frontend', items: ['React.js', 'JavaScript ES6+', 'HTML5 / CSS3', 'Bootstrap'] },
  { n: '02', name: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'MVC Architecture'] },
  { n: '03', name: 'Database', items: ['MongoDB', 'MySQL', 'Query Optimization', 'Schema Design'] },
  { n: '04', name: 'Auth & Security', items: ['Passport.js', 'Role-based Access', 'Sessions', 'Secure APIs'] },
  { n: '05', name: 'Languages', items: ['JavaScript', 'C++', 'SQL', 'HTML / CSS'] },
  { n: '06', name: 'Cloud & DevOps', items: ['Cloud Deploy', 'Env Config', 'Image APIs', 'Prod Setup'] },
]

const GH = 'https://github.com/ItsTushar16/'
export const PROJECTS = [
  { n: '01', name: 'StaySphere', desc: 'Full-stack property listing platform with role-based auth, cloud image storage, category search & filtering, and a star-rating review system.', tags: ['Node.js', 'Express', 'MongoDB', 'Passport.js', 'MVC', 'Bootstrap'], live: 'https://stay-sphere-qgq3.onrender.com/listings', repo: GH + 'Stay_Sphere' },
  { n: '02', name: 'React Weather App', desc: 'Real-time weather lookup using a public API, with async error handling, Hooks-based state, and conditional rendering.', tags: ['React', 'JavaScript', 'Weather API'], repo: GH + 'react-weather-app' },
  { n: '03', name: 'Exam Seat Allocator', desc: 'Object-oriented C++ system that assigns students to halls and seats and manages invigilators, with records kept via direct file handling.', tags: ['C++', 'OOP', 'File Handling'], repo: GH + 'exam-seat-allocator' },
  { n: '04', name: 'Billing System', desc: 'Console-based billing system built in C to get properly comfortable with the language before reaching for a framework.', tags: ['C', 'Console App'], repo: GH + 'Billing-System-using-C' },
]

export const SERVICES = [
  { n: '01', t: 'Web Applications', d: 'Full-stack builds with React, Node.js, Express and MongoDB — from a landing page to a working product with a real database and login.' },
  { n: '02', t: 'Backend & APIs', d: 'REST APIs, authentication, and schema design built to hold up under real traffic, not just a demo.' },
  { n: '03', t: 'Custom Tools & Automation', d: 'C / C++ / JavaScript tools built for one specific, repetitive problem — not a generic template.' },
  { n: '04', t: 'Fixes & Feature Work', d: "Jumping into an existing codebase to fix what's broken or ship a new feature, without months of onboarding." },
]

export const PROCESS = [
  { n: '01', t: 'Understand', d: 'Deep-dive into requirements. I ask questions others skip — understanding the problem is half the solution.' },
  { n: '02', t: 'Architect', d: 'Design the system before writing a line. Clean schemas, clear API contracts, scalable structure.' },
  { n: '03', t: 'Build', d: 'Ship iteratively. Start with core functionality, layer features, keep code readable at every step.' },
  { n: '04', t: 'Refine', d: 'Optimize queries, polish the UI, harden auth, and deploy with proper environment configuration.' },
]

export const BOOT_LINES = [
  '> Initializing modules',
  '> Establishing connection',
  '> Loading core components',
  '> Fetching skills.json',
  '> Compiling experience logs',
  '> Deploying awesomeness',
]

export const TERMINAL_HELP = 'available: about, skills, projects, services, process, contact, socials, clear'
