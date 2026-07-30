import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../components/common/StatCard';
import { formatCurrency } from '../utils/helpers';
import { scheduleItems } from '../utils/mockData';
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
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: tasks } = useSelector((state) => state.tasks);
  const { summary } = useSelector((state) => state.expenses);
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
      toast.success('Focus session completed! Great job Shivam!');
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

  // Donut chart expense data matching screenshot 2
  const expenseDonutData = [
    { name: 'Needs', value: 12450, color: '#ef4444' },
    { name: 'Wants', value: 6850, color: '#f59e0b' },
    { name: 'Savings', value: 3750, color: '#3b82f6' },
    { name: 'Investments', value: 1800, color: '#10b981' },
  ];

  const taskDonutData = [
    { name: 'Completed', value: 8, color: '#ef4444' },
    { name: 'In Progress', value: 4, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Greeting Header matching screenshot 2 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
            Good Evening, {user?.name || 'Shivam'} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1 italic">
            "Discipline today, freedom tomorrow."
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

      {/* Top Metric Cards Row matching screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Tasks Today"
          value="12"
          subtitle="6 Completed"
          icon={CheckSquare}
          progress={50}
        />
        <StatCard
          title="Focus Time"
          value="4h 32m"
          trend="+12% from yesterday"
          icon={Clock}
        />
        <StatCard
          title="Monthly Expenses"
          value="₹24,850"
          trend="8.2% from last month"
          icon={CreditCard}
        />
        <StatCard
          title="Budget Left"
          value="₹15,150"
          subtitle="60% of ₹40,000"
          icon={Wallet}
          progress={60}
          accentColor="gold"
        />
        <StatCard
          title="Goals Progress"
          value="75%"
          subtitle="On Track"
          icon={Target}
          progress={75}
          accentColor="gold"
        />
      </div>

      {/* Middle Dashboard Row matching screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-white tracking-wide">TODAY'S SCHEDULE</h3>
              <Link to="/todo" className="text-[11px] font-semibold text-crimson-400 hover:text-crimson-300">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {scheduleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-card border border-crimson-950/60 hover:border-crimson-900/40 transition-all"
                >
                  <span className="text-[10px] font-mono font-semibold text-crimson-400 w-16">{item.time}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                  <span className={`text-xs font-medium ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
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
              <h3 className="font-display font-bold text-sm text-white tracking-wide">OVERVIEW</h3>
              <span className="text-[11px] text-slate-400 bg-surface-card px-2.5 py-1 rounded-lg border border-slate-800">
                This Month
              </span>
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
                    dataKey="value"
                  >
                    {expenseDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
                <span className="font-display font-extrabold text-sm text-white">₹24,850</span>
                <span className="text-[9px] text-slate-500">of ₹40,000</span>
              </div>
            </div>

            {/* Category legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {expenseDonutData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between p-1.5 rounded-lg bg-surface-card/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[11px] text-slate-300">{cat.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-white">{formatCurrency(cat.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/expenses')}
            className="w-full mt-4 py-2 text-xs font-semibold text-crimson-400 bg-crimson-950/30 border border-crimson-900/40 rounded-xl hover:bg-crimson-900/40 transition-all flex items-center justify-center gap-2"
          >
            <span>View Full Report</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AI Assistant Card matching screenshot 2 glowing HUD emblem */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel-gold flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-crimson-600/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-gold-400 tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                AI ASSISTANT
              </h3>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                ACTIVE
              </span>
            </div>

            {/* Glowing Helmet HUD Placeholder matching screenshot */}
            <div className="my-6 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-b from-crimson-950/80 to-surface-card border border-crimson-600/50 shadow-crimson-glow mb-3">
                <div className="w-16 h-16 rounded-full bg-crimson-600/20 border border-crimson-500 flex items-center justify-center animate-pulse">
                  <span className="font-display font-black text-2xl text-crimson-500">E</span>
                </div>
              </div>
              <h4 className="font-display font-bold text-base text-white">Hello Shivam!</h4>
              <p className="text-xs text-slate-400 mt-1">How can I help you optimize your day?</p>
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

      {/* Bottom Grid Row matching screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide">RECENT ACTIVITY</h3>
            <Link to="/expenses" className="text-[11px] font-semibold text-crimson-400 hover:text-crimson-300">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Project Payment', amount: '+₹15,000', time: '2h ago', positive: true },
              { title: 'Internet Bill', amount: '-₹799', time: '5h ago', positive: false },
              { title: 'Fuel', amount: '-₹1,500', time: 'Yesterday', positive: false },
              { title: 'Grocery Shopping', amount: '-₹1,350', time: 'Yesterday', positive: false },
            ].map((act, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-card border border-crimson-950/50">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{act.title}</h4>
                  <span className="text-[10px] text-slate-500">{act.time}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${act.positive ? 'text-emerald-400' : 'text-crimson-400'}`}>
                  {act.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{act.amount}</span>
                </div>
              </div>
            ))}
          </div>
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
              <span className="font-display font-extrabold text-xl text-white">68%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Tasks Completed</span>
            </div>
          </div>
          <div className="flex items-center justify-around text-xs mt-2">
            <span className="text-slate-300">• 12 Total</span>
            <span className="text-gold-400">• 8 In Progress</span>
            <span className="text-crimson-400">• 4 Pending</span>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide">GOALS PROGRESS</h3>
            <span className="text-[11px] font-semibold text-crimson-400">View All</span>
          </div>

          <div className="space-y-3">
            {goals.map((g) => (
              <div key={g.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{g.title}</span>
                  <span className="font-bold text-white">{g.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${g.progress}%`, backgroundColor: g.color || '#ef4444' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Quote Bar matching screenshot 2 */}
      <div className="text-center py-4 border-t border-crimson-900/20 text-xs text-slate-400 italic">
        "The difference between ordinary and extraordinary is that little extra."
      </div>
    </div>
  );
};

export default DashboardPage;
