import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../components/common/StatCard';
import { formatCurrency } from '../utils/helpers';
import {
  CheckSquare,
  Clock,
  CreditCard,
  Wallet,
  Target,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  const { items: expenses, summary } = useSelector((state) => state.expenses);
  const { items: goals } = useSelector((state) => state.goals);

  const navigate = useNavigate();

  // Focus Timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      toast.success('Focus session completed! Great job!');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimerDisplay = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasksCount = tasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'To Do').length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const totalExpensesAmount = summary.totalExpenses || 0;
  const budgetAmount = summary.budget || 0;
  const budgetLeft = Math.max(0, budgetAmount - totalExpensesAmount);
  const budgetProgress = budgetAmount > 0 ? Math.min(100, Math.round((totalExpensesAmount / budgetAmount) * 100)) : 0;

  const avgGoalProgress = goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + (g.progress || 0), 0) / goals.length) : 0;

  // Donut charts computed dynamically from user's data
  const expenseDonutData = summary.categoryBreakdown && summary.categoryBreakdown.length > 0
    ? summary.categoryBreakdown
    : [{ name: 'No Expenses', amount: 1, color: '#1f1f2e' }];

  const taskDonutData = totalTasksCount > 0
    ? [
        { name: 'Completed', value: completedTasksCount, color: '#ef4444' },
        { name: 'In Progress', value: inProgressTasksCount, color: '#f59e0b' },
        { name: 'Pending', value: pendingTasksCount, color: '#3b82f6' },
      ]
    : [{ name: 'No Tasks', value: 1, color: '#1f1f2e' }];

  return (
    <div className="space-y-6">
      {/* Top Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
            Welcome, {user?.name || 'User'} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1 italic">
            "Your clean, intelligent workspace. Plan. Focus. Achieve."
          </p>
        </div>

        {/* Focus Timer Quick Trigger Pill */}
        <div className="flex items-center gap-3 px-4 py-2 bg-surface-card border border-crimson-900/40 rounded-xl shadow-glass-card">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-crimson-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white">{formatTimerDisplay(timerSeconds)}</span>
          </div>
          <button
            onClick={toggleTimer}
            className="p-1.5 rounded-lg bg-crimson-600/20 text-crimson-400 hover:bg-crimson-600 hover:text-white transition-all"
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dynamic Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Tasks Today"
          value={totalTasksCount.toString()}
          subtitle={`${completedTasksCount} Completed`}
          icon={CheckSquare}
          progress={completionPercentage}
        />
        <StatCard
          title="Focus Time"
          value={isTimerRunning ? 'Session Active' : '0h 0m'}
          subtitle="Pomodoro Timer"
          icon={Clock}
        />
        <StatCard
          title="Monthly Expenses"
          value={`₹${totalExpensesAmount.toLocaleString()}`}
          subtitle={`${expenses.length} Logged`}
          icon={CreditCard}
        />
        <div onClick={() => navigate('/expenses')} className="cursor-pointer">
          <StatCard
            title="Budget Left"
            value={`₹${budgetLeft.toLocaleString()}`}
            subtitle={budgetAmount > 0 ? `Budget: ₹${budgetAmount.toLocaleString()}` : 'Click to set budget'}
            icon={Wallet}
            progress={budgetProgress}
            accentColor="gold"
          />
        </div>
        <StatCard
          title="Goals Progress"
          value={`${avgGoalProgress}%`}
          subtitle={goals.length > 0 ? `${goals.length} Goals Active` : 'No goals yet'}
          icon={Target}
          progress={avgGoalProgress}
          accentColor="gold"
        />
      </div>

      {/* Middle Dashboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-white tracking-wide">TODAY'S SCHEDULE</h3>
              <Link to="/todo" className="text-[11px] font-semibold text-crimson-400 hover:text-crimson-300 flex items-center gap-1">
                <Plus className="w-3 h-3" />
                Add Task
              </Link>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                No tasks scheduled for today. Click <strong>Add Task</strong> to schedule your first task!
              </div>
            ) : (
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-card border border-crimson-950/60 hover:border-crimson-900/40 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-emerald-400' : 'bg-crimson-500'}`} />
                      <span className={`text-xs font-medium ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{task.dueDate || 'Today'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/todo')}
            className="w-full mt-4 py-2 text-xs font-semibold text-crimson-400 bg-crimson-950/30 border border-crimson-900/40 rounded-xl hover:bg-crimson-900/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Manage Tasks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Expenses Donut Breakdown Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm text-white tracking-wide">EXPENSES OVERVIEW</h3>
              <Link to="/expenses" className="text-[11px] font-semibold text-crimson-400 hover:text-crimson-300">
                Manage
              </Link>
            </div>

            <div className="h-44 relative flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie
                    data={expenseDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey={summary.categoryBreakdown && summary.categoryBreakdown.length > 0 ? "amount" : "value"}
                  >
                    {expenseDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || '#ef4444'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#121218', borderColor: '#b91c1c', borderRadius: '12px' }}
                    formatter={(val) => formatCurrency(val)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center text-center pointer-events-none">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Total Spent</span>
                <span className="font-display font-extrabold text-sm text-white">₹{totalExpensesAmount.toLocaleString()}</span>
                <span className="text-[9px] text-slate-500">{budgetAmount > 0 ? `of ₹${budgetAmount.toLocaleString()}` : 'No budget set'}</span>
              </div>
            </div>

            {summary.categoryBreakdown && summary.categoryBreakdown.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {summary.categoryBreakdown.slice(0, 4).map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between p-1.5 rounded-lg bg-surface-card/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-[11px] text-slate-300">{cat.name}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-white">₹{cat.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-center text-slate-500 pt-1">No expenses recorded yet.</p>
            )}
          </div>

          <button
            onClick={() => navigate('/expenses')}
            className="w-full mt-4 py-2 text-xs font-semibold text-crimson-400 bg-crimson-950/30 border border-crimson-900/40 rounded-xl hover:bg-crimson-900/40 transition-all flex items-center justify-center gap-2"
          >
            <span>View Full Expenses</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AI Assistant HUD Emblem Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel-gold flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-crimson-600/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-gold-400 tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                AI ASSISTANT
              </h3>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                READY
              </span>
            </div>

            <div className="my-6 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-b from-crimson-950/80 to-surface-card border border-crimson-600/50 shadow-crimson-glow mb-3">
                <div className="w-16 h-16 rounded-full bg-crimson-600/20 border border-crimson-500 flex items-center justify-center animate-pulse">
                  <span className="font-display font-black text-2xl text-crimson-500">E</span>
                </div>
              </div>
              <h4 className="font-display font-bold text-base text-white">Hello {user?.name || 'User'}!</h4>
              <p className="text-xs text-slate-400 mt-1">Ready to assist and organize your tasks.</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/ai-assistant')}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-crimson-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span>+ Ask EDITH</span>
          </button>
        </div>
      </div>

      {/* Bottom Dynamic Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide">RECENT TRANSACTIONS</h3>
            <Link to="/expenses" className="text-[11px] font-semibold text-crimson-400 hover:text-crimson-300">
              View All
            </Link>
          </div>

          {expenses.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No recent transactions logged yet.</p>
          ) : (
            <div className="space-y-3">
              {expenses.slice(0, 4).map((exp) => (
                <div key={exp.id} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-card border border-crimson-950/50">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{exp.title}</h4>
                    <span className="text-[10px] text-slate-500">{exp.date}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${exp.type === 'Income' ? 'text-emerald-400' : 'text-crimson-400'}`}>
                    {exp.type === 'Income' ? '+' : '-'}₹{exp.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tasks Overview Donut */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel">
          <h3 className="font-display font-bold text-sm text-white tracking-wide mb-4">TASKS OVERVIEW</h3>
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={taskDonutData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                  {taskDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center text-center pointer-events-none">
              <span className="font-display font-extrabold text-xl text-white">{completionPercentage}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Tasks Completed</span>
            </div>
          </div>
          <div className="flex items-center justify-around text-xs mt-2">
            <span className="text-slate-300">• {totalTasksCount} Total</span>
            <span className="text-gold-400">• {inProgressTasksCount} In Progress</span>
            <span className="text-crimson-400">• {pendingTasksCount} Pending</span>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide">GOALS PROGRESS</h3>
            <span onClick={() => navigate('/analytics')} className="text-[11px] font-semibold text-crimson-400 cursor-pointer">
              View All
            </span>
          </div>

          {goals.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              No goals added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map((g) => (
                <div key={g.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{g.title}</span>
                    <span className="font-bold text-white">{g.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-crimson-600"
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Quote Bar */}
      <div className="text-center py-4 border-t border-crimson-900/20 text-xs text-slate-400 italic">
        "Control your command. Your time. Your success."
      </div>
    </div>
  );
};

export default DashboardPage;
