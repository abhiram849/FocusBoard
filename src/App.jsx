import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus
} from 'lucide-react';
import { initialTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { FocusNotes } from './components/FocusNotes';
import { SearchBar } from './components/SearchBar';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { DeleteModal } from './components/DeleteModal';

export function App() {
  // Tasks stored and synced with localStorage
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', initialTasks);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // UI display state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modal dialog states
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // 1. Dynamic Task Statistics Calculations
  const totalTasks = tasks.length;
  const inProgressCount = useMemo(
    () => tasks.filter((t) => t.status === 'In progress').length,
    [tasks]
  );
  const completedCount = useMemo(
    () => tasks.filter((t) => t.status === 'Completed').length,
    [tasks]
  );
  const todoCount = useMemo(
    () => tasks.filter((t) => t.status === 'To do').length,
    [tasks]
  );
  const completionPercentage = useMemo(
    () => (totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0),
    [totalTasks, completedCount]
  );

  // 2. Filtered Tasks (Search + Status + Priority + Category)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Case-insensitive title search
      const matchesSearch =
        !searchQuery.trim() ||
        task.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.trim().toLowerCase()));

      // Status Filter
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

      // Priority Filter
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      // Category Filter
      const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    categoryFilter !== 'All';

  // 3. Handlers for CRUD Operations
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task, preserve original ID
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData, id: task.id } : task
        )
      );
    } else {
      // Create new task with unique ID
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }
  };

  const handleOpenDeleteModal = (task) => {
    setDeletingTask(task);
  };

  const handleCloseDeleteModal = () => {
    setDeletingTask(null);
  };

  const handleConfirmDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    setDeletingTask(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          onAddTaskClick={handleOpenCreateModal}
          completedCount={completedCount}
          totalCount={totalTasks}
        />

        <main id="main-content" className="dashboard-content" role="main">
          {/* Section 1: Overview Statistics Cards */}
          <section className="stats-section" aria-label="Task Statistics Overview">
            <div className="stats-grid">
              <StatCard
                title="Total Tasks"
                value={totalTasks}
                subtitle={`${todoCount} pending to be tackled`}
                icon={CheckSquare}
                badge={`${totalTasks} items`}
                colorTheme="indigo"
              />
              <StatCard
                title="In Progress"
                value={inProgressCount}
                subtitle="Active deep work tasks"
                icon={Clock}
                badge={`${totalTasks > 0 ? Math.round((inProgressCount / totalTasks) * 100) : 0}% active`}
                colorTheme="amber"
              />
              <StatCard
                title="Completed"
                value={completedCount}
                subtitle="Tasks successfully resolved"
                icon={CheckCircle2}
                badge={`${completedCount} closed`}
                colorTheme="emerald"
              />
              <StatCard
                title="Completion Rate"
                value={`${completionPercentage}%`}
                subtitle={`${completedCount} of ${totalTasks} completed`}
                icon={TrendingUp}
                badge={completionPercentage >= 50 ? 'On Track' : 'Needs Focus'}
                colorTheme="purple"
                progress={completionPercentage}
              />
            </div>
          </section>

          {/* Section 2: Focus Notes Carousel */}
          <FocusNotes />

          {/* Section 3: Task Filters and Search Toolbar */}
          <section className="task-filter-section" aria-label="Search and Filter Tasks">
            <div className="task-filter-bar">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
              <button
                type="button"
                className="btn btn--primary btn--mobile-add"
                onClick={handleOpenCreateModal}
                aria-label="Add new task"
              >
                <Plus size={16} aria-hidden="true" />
                <span>New Task</span>
              </button>
            </div>

            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
              counts={{
                total: totalTasks,
                todo: todoCount,
                inProgress: inProgressCount,
                completed: completedCount
              }}
            />
          </section>

          {/* Section 4: Dynamic Task List with Grid/List Toggle */}
          <TaskList
            tasks={filteredTasks}
            totalTasksCount={totalTasks}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onStatusChange={handleStatusChange}
            onCreateClick={handleOpenCreateModal}
            onResetFilters={handleResetFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </main>
      </div>

      {/* Modal Dialog: Create / Edit Task */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={handleCloseTaskForm}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Modal Dialog: Delete Confirmation */}
      <DeleteModal
        isOpen={Boolean(deletingTask)}
        task={deletingTask}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />
    </div>
  );
}

export default App;
