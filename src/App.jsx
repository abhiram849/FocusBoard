import React, { useState, useMemo } from 'react';
import {
  ListTodo,
  Clock,
  Check,
  TrendingUp,
  LayoutGrid,
  Calendar,
  Settings
} from 'lucide-react';
import { initialTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FocusNotes } from './components/FocusNotes';
import { StatCard } from './components/StatCard';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { DeleteModal } from './components/DeleteModal';

export function App() {
  // Task storage using custom localStorage hook with 12 Figma seed tasks
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks_v2', initialTasks);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Navigation & Drawer state
  const [activeNav, setActiveNav] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modal dialog states
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Dynamic Statistics (Step 6: Total, In progress, Completed, and Completion %)
  const totalTasks = tasks.length;
  const inProgressCount = useMemo(
    () => tasks.filter((t) => t.status === 'In progress').length,
    [tasks]
  );
  const completedCount = useMemo(
    () => tasks.filter((t) => t.status === 'Completed').length,
    [tasks]
  );
  const completionPercentage = useMemo(() => {
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  }, [totalTasks, completedCount]);

  // Filtered tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query));

      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All';

  // CRUD Handlers
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData, id: t.id } : t))
      );
    } else {
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleConfirmDelete = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setDeletingTask(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="figma-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      {/* Main Container */}
      <div className="figma-main">
        {/* Top Header */}
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="figma-content" role="main">
          {/* Main Title Row matching Figma */}
          <section className="dashboard-hero" aria-label="Page Title">
            <div className="dashboard-hero__text">
              <h1 className="dashboard-hero__title">Your work, in focus.</h1>
              <p className="dashboard-hero__subtitle desktop-only">
                Plan your day, stay organized, and celebrate small wins.
              </p>
              <p className="dashboard-hero__subtitle mobile-only">
                Stay organized and keep moving forward.
              </p>
            </div>

            <button
              type="button"
              className="btn-new-task-cta desktop-only"
              onClick={handleOpenCreateModal}
              aria-label="Create new task"
            >
              New task
            </button>
          </section>

          {/* Section 1: Focus Notes Carousel */}
          <FocusNotes />

          {/* Section 2: Overview Statistics */}
          <section className="overview-stats-section" aria-label="Overview statistics">
            <h2 className="mobile-section-label">Overview</h2>
            <div className="overview-stats-grid">
              <StatCard
                title="Total tasks"
                value={totalTasks}
                subtitle="Across all projects"
                icon={ListTodo}
                theme="purple"
              />
              <StatCard
                title="In progress"
                value={inProgressCount}
                subtitle="Keep the momentum"
                icon={Clock}
                theme="cyan"
              />
              <StatCard
                title="Completed"
                value={completedCount}
                subtitle="Great work this week"
                icon={Check}
                theme="green"
              />
              <StatCard
                title="Completion rate"
                value={`${completionPercentage}%`}
                subtitle={`${completedCount} of ${totalTasks} completed`}
                icon={TrendingUp}
                theme="indigo"
                progress={completionPercentage}
              />
            </div>
          </section>

          {/* Section 3: My Tasks Section with Toolbar */}
          <FilterTabs
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onViewAllClick={handleResetFilters}
            onAddTaskClick={handleOpenCreateModal}
            counts={{
              total: totalTasks,
              inProgress: inProgressCount,
              completed: completedCount
            }}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
          />

          {/* Section 4: Task List Rows */}
          <TaskList
            tasks={filteredTasks}
            totalTasksCount={totalTasks}
            onEdit={handleOpenEditModal}
            onDelete={setDeletingTask}
            onStatusChange={handleStatusChange}
            onCreateClick={handleOpenCreateModal}
            onResetFilters={handleResetFilters}
          />
        </main>

        {/* Mobile Bottom Navigation Bar (matches 390px Figma frame) */}
        <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
          <button
            type="button"
            className={`mobile-bottom-btn ${activeNav === 'overview' ? 'mobile-bottom-btn--active' : ''}`}
            onClick={() => setActiveNav('overview')}
          >
            <LayoutGrid size={18} aria-hidden="true" />
            <span>Overview</span>
          </button>
          <button
            type="button"
            className={`mobile-bottom-btn ${activeNav === 'tasks' ? 'mobile-bottom-btn--active' : ''}`}
            onClick={() => setActiveNav('tasks')}
          >
            <ListTodo size={18} aria-hidden="true" />
            <span>Tasks</span>
          </button>
          <button
            type="button"
            className={`mobile-bottom-btn ${activeNav === 'calendar' ? 'mobile-bottom-btn--active' : ''}`}
            onClick={() => setActiveNav('calendar')}
          >
            <Calendar size={18} aria-hidden="true" />
            <span>Calendar</span>
          </button>
          <button
            type="button"
            className={`mobile-bottom-btn ${activeNav === 'settings' ? 'mobile-bottom-btn--active' : ''}`}
            onClick={() => setActiveNav('settings')}
          >
            <Settings size={18} aria-hidden="true" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Task Create / Edit Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingTask)}
        task={deletingTask}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}

export default App;
