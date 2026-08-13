import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTaskStatus } from '../redux/slices/taskSlice';
import { formatCurrency } from '../utils/helpers';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  CreditCard,
  Calendar as CalendarIcon,
  ArrowRight,
  TrendingUp,
  Plus,
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  const { items: expenses } = useSelector((state) => state.expenses);
  const { currency } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const todayStr = new Date().toISOString().slice(0, 10);
  const currentMonthYear = new Date().toISOString().slice(0, 7);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Real data calculations
  const todayTasks = tasks.filter((t) => t.dueDate === todayStr);
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const todayExpensesSum = expenses
    .filter((e) => e.date === todayStr)
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const monthExpensesSum = expenses
    .filter((e) => (e.date || '').startsWith(currentMonthYear))
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  // Pending / upcoming todos to display on dashboard
  const displayTodos = tasks.filter((t) => !t.completed).slice(0, 5);

  // Recent 5 expenses
  const recentExpenses = [...expenses].slice(0, 5);

  // Category breakdown for simple expense overview
  const categoryTotals = expenses.reduce((acc, e) => {
    const cat = e.category || 'Other';
    acc[cat] = (acc[cat] || 0) + (Number(e.amount) || 0);
    return acc;
  }, {});

  const totalExpenseSumAll = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const categoryList = Object.keys(categoryTotals).map((cat) => ({
    name: cat,
    amount: categoryTotals[cat],
    percentage: totalExpenseSumAll > 0 ? Math.round((categoryTotals[cat] / totalExpenseSumAll) * 100) : 0,
  }));

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

        <div className="flex items-center gap-2">
          <Link
            to="/todos"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Todo</span>
          </Link>
          <Link
            to="/expenses"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense</span>
          </Link>
        </div>
      </div>

      {/* 5 Real Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Today's Tasks */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Today's Tasks</span>
            <div className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
              <CalendarIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-2xl text-white mt-2">{todayTasks.length}</h3>
          <p className="text-[10px] text-slate-400 mt-1">Due today</p>
        </div>

        {/* Completed Tasks */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completed</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-2xl text-emerald-400 mt-2">{completedTasksCount}</h3>
          <p className="text-[10px] text-slate-400 mt-1">Total finished</p>
        </div>

        {/* Pending Tasks */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pending</span>
            <div className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-800/60 text-amber-400">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-2xl text-amber-400 mt-2">{pendingTasksCount}</h3>
          <p className="text-[10px] text-slate-400 mt-1">Tasks remaining</p>
        </div>

        {/* Today's Expenses */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Today's Spent</span>
            <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-400">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-xl text-white mt-2 truncate">
            {formatCurrency(todayExpensesSum, currency)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">Spent today</p>
        </div>

        {/* This Month's Expenses */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">This Month</span>
            <div className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="font-bold text-xl text-indigo-400 mt-2 truncate">
            {formatCurrency(monthExpensesSum, currency)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">Total this month</p>
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
                <p className="text-xs text-slate-400 font-medium">No pending tasks for today!</p>
                <Link
                  to="/todos"
                  className="inline-block mt-2 text-xs font-semibold text-indigo-400 hover:underline"
                >
                  + Add your first todo
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
                <p className="text-[11px] text-slate-400">Latest logged transactions</p>
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
                <p className="text-[11px] text-slate-500 mt-0.5">Add your first expense to start tracking.</p>
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

      {/* Simple Monthly Expense Overview Section */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-white">Monthly Category Summary</h2>
            <p className="text-[11px] text-slate-400">Spending breakdown by category</p>
          </div>
          <span className="text-xs font-bold text-indigo-400">
            Total: {formatCurrency(totalExpenseSumAll, currency)}
          </span>
        </div>

        {categoryList.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs italic">
            No expenses logged yet. Add your first expense to see category insights.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoryList.map((cat) => (
              <div key={cat.name} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">{cat.name}</span>
                  <span className="font-bold text-white">{formatCurrency(cat.amount, currency)}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">{cat.percentage}% of total</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
