# FocusBoard - Modern Task Management Dashboard

FocusBoard is a responsive, accessible single-page task management dashboard built with React and Vite. It is designed to provide productivity tracking, deep-work focus routines, and task organization across desktop (1440px), tablet (768px), and mobile (390px) viewports.

---

## 🚀 Live Demo & Repository

- **Live Deployment:** [https://focusboard-vert-chi.vercel.app/]
- **GitHub Repository:** ([https://github.com/abhiram849/FocusBoard])

---

## ✨ Key Features

1. **Dashboard Overview & Dynamic Metrics**
   - **Total Tasks:** Real-time count of all registered tasks.
   - **In Progress:** Tracks tasks currently undergoing active execution.
   - **Completed:** Dynamic count of finalized deliverables.
   - **Completion Rate (%):** Dynamically calculated using `(Completed / Total) * 100` with visual progress bar indicator and zero-division safeguard.

2. **Interactive Focus Notes Carousel (Mandatory 3 Slides)**
   - **Slide 1:** *Plan your day* (Daily planning strategies and morning momentum).
   - **Slide 2:** *Stay in the flow* (Deep work, Pomodoro sprints, and distraction elimination).
   - **Slide 3:** *Reflect and celebrate* (End-of-day retrospective and milestone celebrations).
   - **Controls:** Smooth previous/next navigation buttons, clickable slide indicator pills, circular boundary wrapping, and distinct background gradients.

3. **Complete CRUD Functionality**
   - **Create Task:** Accessible modal dialog with required title, category, status, priority, and due date validation.
   - **Read Tasks:** Displays tasks with category badges, priority levels, due date, overdue badges, and status selectors.
   - **Edit Task:** Reuses the unified task modal, pre-populated with existing task attributes while strictly maintaining the task's unique ID.
   - **Delete Task:** Accessible confirmation dialog warning users prior to destructive deletion.
   - **Inline Status Updates:** Instant status toggling (`To do`, `In progress`, `Completed`) from any task card or row, updating statistics immediately.

4. **Multi-Faceted Search & Filtering**
   - **Case-Insensitive Search:** Real-time title and description substring search with one-click clear button.
   - **Status Segmented Tabs:** Filter tasks by `All`, `To do`, `In progress`, and `Completed`, with dynamic count badges on each tab.
   - **Priority Filter:** Filter by `High`, `Medium`, or `Low`.
   - **Category Filter:** Filter by `Design`, `Development`, `Research`, `Testing`, `Marketing`, or `Planning`.
   - **Unified Filter Integration:** All search and filter criteria work harmoniously together.
   - **Reset Filters:** One-click reset button appears whenever active filters are applied.

5. **Local Data Persistence**
   - Custom `useLocalStorage` hook preserves tasks across browser refreshes and session closures under the `focusboard_tasks_v2` key.
   - First-time visitors are bootstrapped with 12 realistic sample tasks (5 In progress, 7 Completed, matching the Figma dashboard numbers exactly); subsequent updates or deletions never get overwritten by sample data on refresh.

6. **Accessibility & Usability (WCAG 2.1 AA Compliant)**
   - Semantic HTML5 structure (`<aside>`, `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`).
   - Modal dialogs with `role="dialog"`, `aria-modal="true"`, focus restoration, and Escape key dismissal.
   - Accessible form controls with explicit labels and `aria-invalid` error associations.
   - Color contrast compliant badges, touch target sizes ≥ 44px on mobile, and visible keyboard `:focus-visible` rings.

---

## 🧠 State Management Explanation

### Architecture Choice: React Built-in Hooks + Custom LocalStorage Hook
For an agile, high-performance single-user application without external API dependencies, adding external libraries like Redux Toolkit or Zustand introduces boilerplate and bundle overhead without practical benefit. 

Instead, FocusBoard implements:
1. **Single Source of Truth:**
   The master task collection is held at the root (`App.jsx`) via the custom `useLocalStorage` hook.
2. **Immutable Mutations:**
   All task state updates (`handleSaveTask`, `handleDeleteTask`, `handleStatusChange`) use immutable functional updates (`setTasks(prev => prev.map(...) / prev.filter(...))`), ensuring predictable re-renders.
3. **Derived Values via `useMemo`:**
   Statistics (`totalTasks`, `inProgressCount`, `completedCount`, `completionPercentage`) and filtered lists (`filteredTasks`) are computed purely as derived state. This guarantees zero state synchronization bugs between raw task data and overview metrics.
4. **Declarative Component Interfaces:**
   Sub-components (`StatCard`, `FocusNotes`, `TaskList`, `TaskForm`, `FilterTabs`) remain clean and reusable presentation components receiving callbacks and props.

---

## 📁 Project Structure

```
focusboard/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DeleteModal.jsx       # Confirmation dialog for task deletion
│   │   ├── FilterTabs.jsx        # Segmented status tabs & dropdown filters
│   │   ├── FocusNotes.jsx        # 3-slide interactive productivity carousel
│   │   ├── Header.jsx            # Top navigation header & quick actions
│   │   ├── SearchBar.jsx         # Accessible search input with clear button
│   │   ├── Sidebar.jsx           # Desktop sidebar & mobile navigation drawer
│   │   ├── StatCard.jsx          # Reusable dashboard metric card
│   │   ├── TaskCard.jsx          # Individual task card with status selector
│   │   ├── TaskForm.jsx          # Unified Create/Edit task modal
│   │   └── TaskList.jsx          # Grid/List task container with empty states
│   ├── data/
│   │   └── sampleTasks.js        # Initial task seed data & category definitions
│   ├── hooks/
│   │   └── useLocalStorage.js    # Browser localStorage synchronization hook
│   ├── App.jsx                   # Master dashboard state container
│   ├── index.css                 # Comprehensive design system & responsive CSS
│   └── main.jsx                  # React application entry point
├── screenshots/
│   ├── desktop-preview.png       # 1440px desktop view
│   └── mobile-preview.png        # 390px mobile view
├── AI_USAGE.md                   # AI tool usage disclosure & prompts
├── README.md                     # Project documentation & setup instructions
├── package.json
└── vite.config.js
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18.0 or newer)
- npm or pnpm

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/your-username/focusboard.git
   cd focusboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port output in your terminal).

4. Build for production:
   ```bash
   npm run build
   ```
   Production assets will be emitted to `dist/`.

---

## 📱 Responsive Testing Viewports

- **Desktop (1440 × 1000):** Fixed sidebar layout, 4-column overview statistics, widescreen Focus Notes banner, card grid view.
- **Tablet (768 × 1024):** Responsive 2-column metrics, collapsible navigation drawer, adapted filter toolbar.
- **Mobile (390 × 844 / 390 × 1128):** Stacked single-column card layout, slide-in navigation drawer, touch-friendly task action buttons (≥ 44px), compact modal forms.

---

## 📄 License
MIT License. Created for the FocusBoard Frontend Assessment.
