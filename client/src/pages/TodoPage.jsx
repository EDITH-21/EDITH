import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTaskStatus, deleteTask, clearAllTasks } from '../redux/slices/taskSlice';
import Modal from '../components/common/Modal';
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Calendar as CalendarIcon,
  Filter,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import toast from 'react-hot-toast';

const columns = [
  { id: 'To Do', title: 'TO DO', color: 'border-crimson-800' },
  { id: 'In Progress', title: 'IN PROGRESS', color: 'border-amber-500' },
  { id: 'Review', title: 'REVIEW', color: 'border-blue-500' },
  { id: 'Completed', title: 'DONE', color: 'border-emerald-500' },
];

const TodoPage = () => {
  const { items: tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Work');
  const [newDueDate, setNewDueDate] = useState('2025-05-30');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    dispatch(
      addTask({
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        category: newCategory,
        dueDate: newDueDate,
        status: 'To Do',
      })
    );

    toast.success('New task added successfully!');
    setNewTitle('');
    setNewDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header matching screenshot 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
            To-Do
          </h1>
          <p className="text-xs text-slate-400 mt-1">Organize your tasks. Achieve more every day.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none bg-surface-card border border-crimson-950 text-xs text-slate-300 py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-crimson-600"
            >
              <option value="All">All Tasks</option>
              <option value="Work">Work</option>
              <option value="Design">Design</option>
              <option value="Personal">Personal</option>
              <option value="Finance">Finance</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-card border border-crimson-950 text-xs text-white pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-crimson-600 w-44 lg:w-56"
            />
          </div>

          {/* Clear Tasks Button */}
          {tasks.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Erase all tasks from your To-Do board?')) {
                  dispatch(clearAllTasks());
                  toast.success('All tasks erased. Board ready for your new tasks!');
                }
              }}
              className="px-3 py-2 bg-crimson-950/60 hover:bg-crimson-900/80 border border-crimson-800/60 rounded-xl text-xs font-semibold text-crimson-400 transition-all"
            >
              Erase Tasks
            </button>
          )}

          {/* Add Task Button matching screenshot 1 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-crimson-800 to-crimson-600 hover:from-crimson-700 hover:to-crimson-500 text-white text-xs font-bold rounded-xl shadow-crimson-glow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Metric Stats Cards matching screenshot 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total Tasks</p>
            <h3 className="font-display text-2xl font-extrabold text-white mt-1">28</h3>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Completed</p>
            <h3 className="font-display text-2xl font-extrabold text-emerald-400 mt-1">16</h3>
          </div>
          <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
            <Check className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">In Progress</p>
            <h3 className="font-display text-2xl font-extrabold text-amber-400 mt-1">7</h3>
          </div>
          <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-400">
            <RotateCcw className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pending</p>
            <h3 className="font-display text-2xl font-extrabold text-blue-400 mt-1">5</h3>
          </div>
          <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl glass-panel flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Overdue</p>
            <h3 className="font-display text-2xl font-extrabold text-crimson-500 mt-1">2</h3>
          </div>
          <div className="p-2 rounded-lg bg-crimson-950/50 border border-crimson-800/50 text-crimson-500">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Kanban Board & Right Sidebar Grid matching screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kanban Board Columns (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="p-3 rounded-2xl bg-[#111116] border border-crimson-950/80 flex flex-col justify-between min-h-[500px]"
              >
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-crimson-950">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-bold tracking-wider text-slate-200 uppercase">
                        {col.title}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-crimson-950 border border-crimson-800 text-[10px] font-bold text-crimson-400 flex items-center justify-center">
                        {columnTasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Task Cards List */}
                  <div className="space-y-2.5">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-xl bg-surface-card border border-crimson-950 hover:border-crimson-800/60 shadow-md group transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-200 leading-snug">{task.title}</h4>
                          <button
                            onClick={() => {
                              dispatch(deleteTask(task.id));
                              toast.success('Task deleted');
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-crimson-400 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Progress Bar for In Progress */}
                        {col.id === 'In Progress' && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                              <span>Progress</span>
                              <span className="font-bold text-amber-400">{task.progress}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Footer Category Tag & Due Date */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/40 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-crimson-950/80 text-crimson-400 border border-crimson-900/40 font-medium">
                            {task.category}
                          </span>
                          <span className="text-slate-400">{task.dueDate}</span>
                        </div>

                        {/* Status Switcher Buttons on hover */}
                        <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[9px] text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity">
                          <span>Move to:</span>
                          <div className="flex items-center gap-1">
                            {columns.map(
                              (c) =>
                                c.id !== task.status && (
                                  <button
                                    key={c.id}
                                    onClick={() => dispatch(updateTaskStatus({ id: task.id, status: c.id }))}
                                    className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-crimson-950 text-slate-300 hover:text-white"
                                  >
                                    {c.title.split(' ')[0]}
                                  </button>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Add Task Link */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-4 py-2 text-[11px] font-semibold text-slate-400 hover:text-crimson-400 bg-surface-card/40 hover:bg-crimson-950/30 rounded-xl border border-dashed border-slate-800 hover:border-crimson-800 transition-all flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Sidebar Widgets matching screenshot 1 (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calendar Widget matching screenshot 1 */}
          <div className="p-4 rounded-2xl glass-panel">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs font-bold tracking-wider text-slate-300 uppercase">CALENDAR</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-white">May 2025</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:text-white"><ChevronLeft className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:text-white"><ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>

            {/* Calendar Days Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 mb-2">
              <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
            </div>

            {/* Date Grid matching screenshot 1 circle on 28 */}
            <div className="grid grid-cols-7 text-center text-xs gap-y-1.5 font-medium text-slate-300">
              <span className="text-slate-600">27</span><span className="text-slate-600">28</span><span className="text-slate-600">29</span><span className="text-slate-600">30</span><span>1</span><span>2</span><span>3</span>
              <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
              <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>
              <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span>
              <span>25</span><span>26</span><span>27</span>
              {/* Highlighted active day 28 in crimson circle */}
              <span className="w-6 h-6 mx-auto rounded-full bg-crimson-600 text-white font-bold flex items-center justify-center shadow-crimson-glow">28</span>
              <span>29</span><span>30</span><span>31</span>
            </div>
          </div>

          {/* Priority Tasks List matching screenshot 1 */}
          <div className="p-4 rounded-2xl glass-panel">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs font-bold tracking-wider text-slate-300 uppercase">PRIORITY TASKS</h3>
              <span className="text-[10px] text-crimson-400 font-semibold cursor-pointer">View All</span>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Submit project report', priority: 'High', dueDate: 'May 29' },
                { title: 'Prepare presentation', priority: 'High', dueDate: 'May 31' },
                { title: 'Pay electricity bill', priority: 'Medium', dueDate: 'May 30' },
                { title: 'Buy birthday gift', priority: 'Low', dueDate: 'Jun 02' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-surface-card border border-crimson-950/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-crimson-500" />
                    <span className="text-slate-200 font-medium">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span
                      className={`px-1.5 py-0.5 rounded font-semibold ${
                        p.priority === 'High'
                          ? 'bg-crimson-950 text-crimson-400 border border-crimson-900/50'
                          : p.priority === 'Medium'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-blue-950 text-blue-400'
                      }`}
                    >
                      {p.priority}
                    </span>
                    <span className="text-slate-400">{p.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Circle Gauge Widget matching screenshot 1 */}
          <div className="p-4 rounded-2xl glass-panel flex items-center gap-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="#1f1f2e" strokeWidth="6" fill="transparent" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#dc2626"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="200"
                  strokeDashoffset="56"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display font-extrabold text-sm text-white">72%</span>
                <span className="text-[8px] text-slate-400 uppercase">Productive</span>
              </div>
            </div>

            <div className="flex-1 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Focus Time:</span>
                <span className="font-bold text-white">18h 32m</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tasks Completed:</span>
                <span className="font-bold text-white">16</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Avg. Daily Tasks:</span>
                <span className="font-bold text-white">5.3</span>
              </div>
              <p className="text-[10px] text-crimson-400 font-semibold pt-1">
                ⚡ Keep going, Shivam! You're doing great!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Task Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Task details..."
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600 h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
              >
                <option value="Work">Work</option>
                <option value="Design">Design</option>
                <option value="Personal">Personal</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Due Date</label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold rounded-xl shadow-crimson-glow"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Footer Quote */}
      <div className="text-center py-4 border-t border-crimson-900/20 text-xs text-slate-400 italic">
        "Discipline today, freedom tomorrow."
      </div>
    </div>
  );
};

export default TodoPage;
