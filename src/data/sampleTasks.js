/**
 * Sample tasks matching the exact FocusBoard Figma design
 * 12 total tasks: 5 In progress, 7 Completed
 * (Matches the exact figures in the Figma design: Total tasks: 12, In progress: 5, Completed: 7)
 */
export const initialTasks = [
  {
    id: "task-1",
    title: "Design landing page",
    description: "Website redesign · Due soon",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-22"
  },
  {
    id: "task-2",
    title: "Fix mobile navigation",
    description: "Frontend sprint · UI polish",
    category: "Development",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-24"
  },
  {
    id: "task-3",
    title: "Review onboarding copy",
    description: "Content updates · Approved",
    category: "Content",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-18"
  },
  {
    id: "task-4",
    title: "Implement dark mode tokens",
    description: "Design system · Phase 2",
    category: "Design",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-25"
  },
  {
    id: "task-5",
    title: "Optimize image compression pipeline",
    description: "Performance sprint · Assets",
    category: "Development",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-26"
  },
  {
    id: "task-6",
    title: "User interview session preparation",
    description: "Customer discovery · Cohort B",
    category: "Research",
    status: "In progress",
    priority: "Low",
    dueDate: "2026-11-27"
  },
  {
    id: "task-7",
    title: "Setup analytics event tracking",
    description: "Telemetry · Core funnel",
    category: "Development",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-15"
  },
  {
    id: "task-8",
    title: "Create authentication wireframes",
    description: "User flows · v1.2",
    category: "Design",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-14"
  },
  {
    id: "task-9",
    title: "Update privacy policy and terms",
    description: "Legal review · Compliance",
    category: "Content",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-12"
  },
  {
    id: "task-10",
    title: "Database indexing for search",
    description: "Backend speed · Queries",
    category: "Development",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-10"
  },
  {
    id: "task-11",
    title: "Draft release notes for v1.0",
    description: "Product marketing · Launch",
    category: "Content",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-09"
  },
  {
    id: "task-12",
    title: "Configure automated test runner",
    description: "CI/CD · GitHub Actions",
    category: "Testing",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-08"
  }
];

export const CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Content",
  "Research",
  "Testing"
];

export const STATUS_OPTIONS = ["To do", "In progress", "Completed"];
export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
