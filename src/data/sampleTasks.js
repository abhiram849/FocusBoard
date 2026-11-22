/**
 * Initial sample task data for FocusBoard
 * Minimum 6 tasks required with unique ID, title, description, category, status, priority, and dueDate.
 */
export const initialTasks = [
  {
    id: "task-101",
    title: "Design System Tokens & Color Palette",
    description: "Establish scalable CSS variables, spacing scales, and typography tokens based on the Figma UI kit.",
    category: "Design",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-20"
  },
  {
    id: "task-102",
    title: "Implement Focus Notes Carousel Component",
    description: "Build a 3-slide interactive carousel with slide indicators, touch-friendly next/prev controls, and circular navigation.",
    category: "Development",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-24"
  },
  {
    id: "task-103",
    title: "Conduct User Accessibility & Contrast Audit",
    description: "Verify WCAG 2.1 AA compliance, keyboard navigation, focus indicators, and aria-labels across all interactive controls.",
    category: "Research",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-25"
  },
  {
    id: "task-104",
    title: "Cross-browser & Mobile Viewport QA Testing",
    description: "Validate dashboard responsiveness at 390px mobile, 768px tablet, and 1440px desktop breakpoints.",
    category: "Testing",
    status: "To do",
    priority: "High",
    dueDate: "2026-11-26"
  },
  {
    id: "task-105",
    title: "Write Production Deployment Documentation",
    description: "Document project architecture, state management rationale, and deployment setup for Vercel and GitHub.",
    category: "Development",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-28"
  },
  {
    id: "task-106",
    title: "Review Dashboard Performance & Core Web Vitals",
    description: "Optimize component render cycles, asset loading, and bundle size for lightning-fast page responsiveness.",
    category: "Testing",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-21"
  },
  {
    id: "task-107",
    title: "Setup CI/CD Pipeline & Automated Build Verification",
    description: "Configure GitHub Actions workflow to run linting, build checks, and automated preview deployments.",
    category: "Development",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-19"
  }
];

export const CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Research",
  "Testing",
  "Marketing",
  "Planning"
];

export const STATUS_OPTIONS = ["To do", "In progress", "Completed"];
export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
