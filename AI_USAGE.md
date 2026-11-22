# AI Usage Disclosure

## 1. Tools Used
- **Antigravity (Powered by Gemini 3.8 Flash)**: Used for architecture planning, component modularization, responsive CSS verification, and test case design.

---

## 2. Representative Prompts

### Prompt 1: Component & Architecture Decomposition
> *"Analyze the FocusBoard assignment requirements and create a clean, reusable React component hierarchy that separates stateful business logic from presentation components while ensuring WCAG 2.1 AA accessibility."*

### Prompt 2: Safe localStorage Synchronization
> *"Design a custom `useLocalStorage` React hook that safely parses stored JSON data, catches storage exceptions, prevents overriding user edits on page refresh, and seeds initial sample tasks only if no prior data exists."*

### Prompt 3: Accessible 3-Slide Focus Notes Carousel
> *"Provide an accessible implementation of the three Focus Notes slides specified in Figma (15:2, 15:30, 15:58) with circular navigation, clickable slide indicators, keyboard accessibility, and CSS responsive styling for 1440px, 768px, and 390px viewports."*

### Prompt 4: Responsive CSS & Form Validation
> *"Generate responsive CSS media queries and form validation logic for the TaskForm modal to prevent layout clipping and horizontal overflow at 390px mobile width while validating non-empty, trimmed title inputs."*

---

## 3. AI-Assisted Areas
- **CSS Design Tokens:** Generating consistent CSS custom properties for spacing, typography, colors, and shadows matching modern SaaS UI standards.
- **Component Separation:** Dividing the dashboard into isolated, single-responsibility components (`StatCard`, `FocusNotes`, `TaskList`, `TaskCard`, `TaskForm`, `DeleteModal`, `FilterTabs`).
- **Validation Rules:** Ensuring task titles are checked for empty or whitespace-only strings before submission.
- **Accessibility Testing:** Verifying ARIA roles (`role="dialog"`, `role="tablist"`, `aria-selected`, `aria-invalid`) and keyboard controls.

---

## 4. Verified and Corrected Suggestions

### Recommendation Checked & Corrected:
1. **Third-Party Carousel Library vs Native React Implementation:**
   - *AI Suggestion:* The initial suggestion recommended installing an external library like `swiper` or `slick-carousel` for the Focus Notes section.
   - *Review & Correction:* This was rejected because the assignment emphasizes frontend fundamentals, code quality, and minimal unnecessary dependencies. A lean, custom React component with React state and CSS flexbox transitions was built instead, matching the Figma frames without any third-party bundle weight.

2. **Global State Manager vs React Hooks:**
   - *AI Suggestion:* The initial suggestion proposed setting up Redux Toolkit or Zustand for task filtering and statistics.
   - *Review & Correction:* Evaluated and rejected in favor of React hooks (`useState`, `useMemo`, and custom `useLocalStorage`). Task state lives in `App.jsx`, and statistics/filtering are computed as derived values. This eliminates duplicate state and synchronizes with localStorage.

3. **Status Badges vs Interactive Dropdown:**
   - *AI Suggestion:* Plain non-interactive status badges on task cards.
   - *Review & Correction:* Corrected to include an interactive inline status dropdown on every task card so users can quickly change a task's status (`To do`, `In progress`, `Completed`) with immediate updates to metrics and localStorage.
