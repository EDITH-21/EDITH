import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTaskStatus } from '../redux/slices/taskSlice';
import { updateSalary } from '../redux/slices/settingsSlice';
import { formatCurrency } from '../utils/helpers';
import Modal from '../components/common/Modal';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  CreditCard,
  Calendar as CalendarIcon,
  ArrowRight,
  TrendingUp,
  Plus,
  PiggyBank,
  Wallet,
  DollarSign,
  Edit3,
} from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  const { items: expenses } = useSelector((state) => state.expenses);
  const { items: savings } = useSelector((state) => state.savings);
  const { currency, salary = 30000 } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [newSalaryInput, setNewSalaryInput] = useState(salary);

  const todayStr = new Date().toISOString().slice(0, 10);
  const currentMonthYear = new Date().toISOString().slice(0, 7);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Task Calculations
  const todayTasks = tasks.filter((t) => t.dueDate === todayStr);
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  // Financial Calculations for Current Month
  const currentMonthExpenses = expenses
    .filter((e) => (e.date || '').startsWith(currentMonthYear))
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const currentMonthSavings = savings
    .filter((s) => (s.month || '').startsWith(currentMonthYear))
    .reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  // Available Money Formula: Salary - Expenses - Savings
  const availableMoney = Number(salary) - currentMonthExpenses - currentMonthSavings;

  // Display items
  const displayTodos = tasks.filter((t) => !t.completed).slice(0, 5);
  const recentExpenses = [...expenses].slice(0, 5);

  const handleSaveSalary = (e) => {
    e.preventDefault();
    const num = Number(newSalaryInput);
    if (isNaN(num) || num < 0) {
      toast.error('Please enter a valid salary amount');
      return;
    }
    dispatch(updateSalary(num));
    toast.success('Monthly Salary updated!');
    setIsSalaryModalOpen(false);
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
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
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-bold text-2xl lg:text-3xl text-white tracking-tight">
            {getGreeting()}, {user?.name || 'User'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Here's your overview for today.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/todos"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Todo</span>
          </Link>
          <Link
            to="/expenses"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense</span>
          </Link>
          <Link
            to="/savings"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-xs font-semibold rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Saving</span>
          </Link>
        </div>
      </div>

      {/* Financial Summary Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Monthly Salary */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Salary</span>
            <button
              onClick={() => {
                setNewSalaryInput(salary);
                setIsSalaryModalOpen(true);
              }}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="Edit Salary"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="font-bold text-xl text-white mt-2 truncate">
            {formatCurrency(salary, currency)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">Monthly Base</p>
        </div>

        {/* Expenses (This Month) */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Expenses</span>
            <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-400">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-xl text-rose-400 mt-2 truncate">
            {formatCurrency(currentMonthExpenses, currency)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">This Month</p>
        </div>

        {/* Savings (This Month) */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Savings</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
              <PiggyBank className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-xl text-emerald-400 mt-2 truncate">
            {formatCurrency(currentMonthSavings, currency)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">This Month</p>
        </div>

        {/* Available Money */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-800/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">Available</span>
            <div className="p-1.5 rounded-lg bg-indigo-900/60 text-indigo-300">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-xl text-white mt-2 truncate">
            {formatCurrency(availableMoney, currency)}
          </h3>
          <p className="text-[10px] text-indigo-300 mt-1">Salary − Expenses − Savings</p>
        </div>
      </div>

      {/* Task Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Today's Tasks */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Today's Tasks</span>
            <h4 className="font-bold text-lg text-white mt-0.5">{todayTasks.length}</h4>
          </div>
          <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Completed</span>
            <h4 className="font-bold text-lg text-emerald-400 mt-0.5">{completedTasksCount}</h4>
          </div>
          <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Pending</span>
            <h4 className="font-bold text-lg text-amber-400 mt-0.5">{pendingTasksCount}</h4>
          </div>
          <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Todos & Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Todos Section (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-base text-white">Today's Todos</h2>
                <p className="text-[11px] text-slate-400">Tasks ready for execution</p>
              </div>
              <Link
                to="/todos"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {displayTodos.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl my-2">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-xs text-slate-400 font-medium">No pending tasks!</p>
                <Link
                  to="/todos"
                  className="inline-block mt-2 text-xs font-semibold text-indigo-400 hover:underline"
                >
                  + Add a todo
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {displayTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTaskStatus(todo.id))}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <h4 className={`text-xs font-semibold truncate ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {todo.title}
                        </h4>
                        {todo.dueDate && (
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {todo.dueDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getPriorityBadgeClass(
                        todo.priority
                      )}`}
                    >
                      {todo.priority || 'Medium'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Expenses Section (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-base text-white">Recent Expenses</h2>
                <p className="text-[11px] text-slate-400">Latest transactions</p>
              </div>
              <Link
                to="/expenses"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentExpenses.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl my-2">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-xs text-slate-400 font-medium">No expenses yet</p>
                <Link
                  to="/expenses"
                  className="inline-block mt-3 text-xs font-semibold text-indigo-400 hover:underline"
                >
                  + Add expense
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentExpenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{exp.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {exp.category || 'Other'}
                        </span>
                        <span className="text-[10px] text-slate-500">{exp.date}</span>
                      </div>
                    </div>

                    <span className="font-bold text-xs text-rose-400">
                      -{formatCurrency(exp.amount, currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Salary Modal */}
      <Modal isOpen={isSalaryModalOpen} onClose={() => setIsSalaryModalOpen(false)} title="Set Monthly Salary">
        <form onSubmit={handleSaveSalary} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Monthly Salary (₹)
            </label>
            <input
              type="number"
              required
              min="0"
              value={newSalaryInput}
              onChange={(e) => setNewSalaryInput(e.target.value)}
              placeholder="e.g. 30000"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Used to calculate Available Money = Salary − Expenses − Savings.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsSalaryModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Save Salary
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
