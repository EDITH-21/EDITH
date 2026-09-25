import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  toggleTaskStatus,
  updateTask,
  deleteTask,
} from '../redux/slices/taskSlice';
import Modal from '../components/common/Modal';
import {
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  Calendar as CalendarIcon,
  Share2,
  Bell,
  User,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';

const TodoPage = () => {
  const { items: tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('All'); // All | Active | Completed
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');

  // Notification Permission State
  const [notificationsAllowed, setNotificationsAllowed] = useState(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission === 'granted'
      : false
  );

  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      toast.error('Browser notifications are not supported on your browser.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsAllowed(true);
        toast.success('Chrome desktop notifications enabled!');
        new Notification('EDITH Reminders Enabled', {
          body: 'You will now receive native desktop reminders for your todos!',
          icon: '/favicon.ico',
        });
      } else {
        toast.error('Notification permission denied');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const triggerDesktopNotification = (taskTitle, due) => {
    if (notificationsAllowed && typeof window !== 'undefined' && 'Notification' in window) {
      new Notification(`📌 Todo Reminder: ${taskTitle}`, {
        body: due ? `Due Date: ${due}` : 'Reminder alert for your task.',
      });
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || '',
      priority,
      assignedTo: assignedTo.trim(),
    };

    dispatch(addTask(newTask));
    toast.success('Todo created!');

    if (dueDate && notificationsAllowed) {
      triggerDesktopNotification(title.trim(), dueDate);
    }

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setAssignedTo('');
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(task.dueDate || '');
    setPriority(task.priority || 'Medium');
    setAssignedTo(task.assignedTo || '');
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (!editingTask || !title.trim()) return;

    dispatch(
      updateTask({
        id: editingTask.id,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        assignedTo: assignedTo.trim(),
      })
    );

    toast.success('Todo updated!');
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleShareTask = (task) => {
    const shareText = `📋 *Task:* ${task.title}\n⚡ *Priority:* ${task.priority || 'Medium'}\n📅 *Due Date:* ${
      task.dueDate || 'No date'
    }${task.assignedTo ? `\n👤 *Assigned To:* ${task.assignedTo}` : ''}${
      task.description ? `\n📝 *Notes:* ${task.description}` : ''
    }`;

    navigator.clipboard.writeText(shareText);
    toast.success('Task details copied to clipboard! Share with your team.');
  };

  const getPriorityBadgeClass = (p) => {
    switch (p) {
      case 'High':
        return 'bg-rose-950/60 text-rose-400 border-rose-800/60';
      case 'Medium':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/60';
      case 'Low':
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl lg:text-3xl text-white tracking-tight">Todos</h1>
          <p className="text-xs text-slate-400 mt-1">Keep track of what needs to get done.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!notificationsAllowed && (
            <button
              onClick={requestNotificationPermission}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 text-xs font-semibold rounded-xl transition-all"
              title="Enable Chrome Reminders"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Enable Chrome Reminders</span>
            </button>
          )}

          <button
            onClick={() => {
              setTitle('');
              setDescription('');
              setDueDate('');
              setPriority('Medium');
              setAssignedTo('');
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Todo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['All', 'Active', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {filteredTasks.length} task{filteredTasks.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Todo List Items */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-300">No tasks found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {filter === 'Completed'
              ? 'No completed tasks yet.'
              : filter === 'Active'
              ? 'All tasks completed! Great job!'
              : 'Add your first task to get started.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((todo) => (
            <div
              key={todo.id}
              className={`p-4 rounded-2xl bg-slate-900 border transition-all flex items-start justify-between gap-4 ${
                todo.completed
                  ? 'border-slate-800/60 opacity-60 bg-slate-950/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTaskStatus(todo.id))}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`text-sm font-semibold ${
                        todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getPriorityBadgeClass(
                        todo.priority
                      )}`}
                    >
                      {todo.priority || 'Medium'}
                    </span>
                  </div>

                  {todo.description && (
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{todo.description}</p>
                  )}

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 flex-wrap">
                    {todo.dueDate && (
                      <span className="flex items-center gap-1 font-mono">
                        <CalendarIcon className="w-3 h-3 text-slate-400" />
                        Due: {todo.dueDate}
                      </span>
                    )}

                    {todo.assignedTo && (
                      <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-indigo-300">
                        <User className="w-3 h-3" />
                        Assigned: {todo.assignedTo}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions: Share, Edit & Delete */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleShareTask(todo)}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Share Todo to Team"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(todo)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Edit todo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteTask(todo.id));
                    toast.success('Todo deleted');
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Delete todo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Todo Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Todo">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finish project roadmap..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task notes or details..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600 h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Assign to Team Member (Optional)
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="e.g. Alex, Priya"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Save Todo
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Todo Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Todo">
        <form onSubmit={handleUpdateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600 h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Assign to Team Member
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoPage;
