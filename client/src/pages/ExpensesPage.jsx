import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addExpense,
  deleteExpense,
  clearAllExpenses,
  addSalaryRecord,
  deleteSalaryRecord,
  setMonthlySalaryAndBudget,
} from '../redux/slices/expenseSlice';
import { formatCurrency, exportExpensesToCSV } from '../utils/helpers';
import Modal from '../components/common/Modal';
import {
  Download,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  CreditCard,
  Shield,
  Filter,
  DollarSign,
  Eraser,
  Edit3,
  Calendar as CalendarIcon,
  Briefcase,
  Building,
  CheckCircle2,
  Wallet,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import toast from 'react-hot-toast';

const ExpensesPage = () => {
  const { items: expenses, summary, salaryRecords = [] } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // New expense form state
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Food & Dining');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Log Salary / Income form state
  const [salaryAmount, setSalaryAmount] = useState('');
  const [salarySource, setSalarySource] = useState('');
  const [salaryEarnedDate, setSalaryEarnedDate] = useState('2025-05-01');
  const [salaryMethod, setSalaryMethod] = useState('Net Banking');
  const [salaryNotes, setSalaryNotes] = useState('May 2025 Payday');

  // Set Budget Form state
  const [customBudget, setCustomBudget] = useState(summary.budget || '');
  const [customIncome, setCustomIncome] = useState(summary.totalIncome || '');

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    dispatch(
      addExpense({
        title,
        amount: Number(amount),
        type,
        category,
        paymentMethod,
      })
    );

    toast.success('Transaction logged successfully!');
    setTitle('');
    setAmount('');
    setIsModalOpen(false);
  };

  const handleLogSalary = (e) => {
    e.preventDefault();
    if (!salaryAmount || !salarySource) return;

    dispatch(
      addSalaryRecord({
        amount: Number(salaryAmount),
        source: salarySource,
        earnedDate: salaryEarnedDate,
        paymentMethod: salaryMethod,
        notes: salaryNotes,
      })
    );

    toast.success(`Salary of ₹${Number(salaryAmount).toLocaleString()} logged for date ${salaryEarnedDate}!`);
    setSalaryAmount('');
    setSalarySource('');
    setIsSalaryModalOpen(false);
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    dispatch(
      setMonthlySalaryAndBudget({
        budget: Number(customBudget),
        income: Number(customIncome),
      })
    );
    toast.success(`Monthly Budget set to ₹${Number(customBudget).toLocaleString()}!`);
    setIsBudgetModalOpen(false);
  };

  const handleClearExpenses = () => {
    if (window.confirm('Are you sure you want to erase all expense transactions, budget limits and salary history?')) {
      dispatch(clearAllExpenses());
      toast.success('All data erased cleanly. You can now set your custom budget & salary!');
    }
  };

  const budgetUsedPercentage = summary.budget > 0 ? Math.min(100, Math.round((summary.totalExpenses / summary.budget) * 100)) : 0;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
            Monthly Expenses & Salary Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">Set your own budget, track salary credit dates and daily spending.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setCustomBudget(summary.budget || '');
              setCustomIncome(summary.totalIncome || '');
              setIsBudgetModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-surface-card hover:bg-slate-800 border border-gold-500/50 rounded-xl text-xs font-semibold text-gold-400 transition-all shadow-gold-glow"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>✏️ Set / Edit Budget</span>
          </button>

          <button
            onClick={() => setIsSalaryModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-surface-card hover:bg-slate-800 border border-emerald-500/50 rounded-xl text-xs font-semibold text-emerald-400 transition-all"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>+ Log Salary / Income Date</span>
          </button>

          <button
            onClick={() => exportExpensesToCSV(expenses)}
            className="flex items-center gap-2 px-3.5 py-2 bg-surface-card hover:bg-slate-800 border border-crimson-900/40 rounded-xl text-xs font-semibold text-slate-200 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-crimson-500" />
            <span>Export CSV</span>
          </button>

          {(expenses.length > 0 || salaryRecords.length > 0 || summary.budget > 0) && (
            <button
              onClick={handleClearExpenses}
              className="flex items-center gap-2 px-3 py-2 bg-crimson-950/60 hover:bg-crimson-900/80 border border-crimson-800/60 rounded-xl text-xs font-semibold text-crimson-400 transition-all"
              title="Erase all current transactions"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Erase All</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-crimson-800 to-crimson-600 hover:from-crimson-700 hover:to-crimson-500 text-white text-xs font-bold rounded-xl shadow-crimson-glow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel relative group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL SALARY / INCOME</span>
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-white mt-1">₹{summary.totalIncome.toLocaleString()}</h3>
          <button
            onClick={() => setIsSalaryModalOpen(true)}
            className="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 mt-2 block"
          >
            + Log Salary Earned Date
          </button>
        </div>

        <div className="p-4 rounded-xl glass-panel">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL EXPENSES</span>
            <div className="p-2 rounded-lg bg-crimson-950/50 border border-crimson-800/50 text-crimson-500">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-white mt-1">₹{summary.totalExpenses.toLocaleString()}</h3>
          <span className="text-[11px] font-semibold text-crimson-400 mt-2 block">
            {expenses.length} transaction{expenses.length === 1 ? '' : 's'} logged
          </span>
        </div>

        <div className="p-4 rounded-xl glass-panel">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">SAVINGS</span>
            <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-400">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-white mt-1">₹{summary.savings.toLocaleString()}</h3>
          <span className="text-[11px] font-semibold text-emerald-400 mt-2 block">
            Remaining unspent
          </span>
        </div>

        <div className="p-4 rounded-xl glass-panel relative group flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">BUDGET</span>
              <button
                onClick={() => {
                  setCustomBudget(summary.budget || '');
                  setCustomIncome(summary.totalIncome || '');
                  setIsBudgetModalOpen(true);
                }}
                className="text-[10px] text-gold-400 hover:text-gold-300 font-bold underline"
              >
                Edit
              </button>
            </div>
            <h3 className="font-display text-2xl font-extrabold text-white mt-1">₹{summary.budget.toLocaleString()}</h3>
            <span className="text-[11px] text-slate-400 mt-1 block">{budgetUsedPercentage}% used</span>
          </div>

          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="22" stroke="#1f1f2e" strokeWidth="4" fill="transparent" />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="140"
                strokeDashoffset={Math.max(0, 140 - (140 * budgetUsedPercentage) / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-display font-bold text-xs text-gold-400">{budgetUsedPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Salary Earned / Payday History Card Section */}
      <div className="p-5 rounded-2xl glass-panel-gold space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gold-400" />
            <div>
              <h3 className="font-display font-bold text-sm text-gold-400 tracking-wide">
                SALARY EARNED & PAYDAY HISTORY LOG
              </h3>
              <p className="text-[11px] text-slate-400">Record of exact dates when salary was credited or earned.</p>
            </div>
          </div>

          <button
            onClick={() => setIsSalaryModalOpen(true)}
            className="px-3.5 py-1.5 bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/50 rounded-xl text-xs font-bold text-gold-400 transition-all self-start sm:self-auto"
          >
            + Add Salary Credit Date
          </button>
        </div>

        {salaryRecords.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            No salary records logged yet. Click <strong>+ Add Salary Credit Date</strong> to log when you received your salary!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {salaryRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl bg-surface-card border border-gold-500/30 flex items-start justify-between relative"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-3.5 h-3.5 text-gold-400" />
                    <h4 className="text-xs font-bold text-white">{rec.source}</h4>
                  </div>
                  <span className="font-display font-extrabold text-lg text-emerald-400 block">
                    ₹{Number(rec.amount).toLocaleString()}
                  </span>

                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-gold-400 bg-gold-950/60 px-2 py-0.5 rounded border border-gold-800/40">
                      <CalendarIcon className="w-3 h-3" />
                      Earned: {rec.earnedDate}
                    </span>
                    <span>• {rec.paymentMethod}</span>
                  </div>

                  {rec.notes && <p className="text-[10px] text-slate-500 mt-1 italic">{rec.notes}</p>}
                </div>

                <button
                  onClick={() => {
                    dispatch(deleteSalaryRecord(rec.id));
                    toast.success('Salary log removed');
                  }}
                  className="text-slate-500 hover:text-crimson-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-white tracking-wide mb-2">EXPENSES OVERVIEW</h3>
            <div className="h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={summary.categoryBreakdown && summary.categoryBreakdown.length > 0 ? summary.categoryBreakdown : [{ name: 'No Expenses', amount: 1, color: '#1f1f2e' }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="amount"
                  >
                    {(summary.categoryBreakdown || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center text-center pointer-events-none">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Total Expenses</span>
                <span className="font-display font-extrabold text-base text-white">₹{summary.totalExpenses.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs mt-2">
              {(summary.categoryBreakdown || []).slice(0, 4).map((c) => (
                <div key={c.name} className="flex items-center justify-between p-1.5 rounded-lg bg-surface-card/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-[11px] text-slate-300">{c.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-white">₹{c.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-white tracking-wide">SPENDING TREND</h3>
            <span className="text-[11px] text-slate-400 bg-surface-card px-2.5 py-1 rounded-lg border border-slate-800">
              This Month
            </span>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={summary.spendingTrend || []}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121218', borderColor: '#b91c1c', borderRadius: '12px' }}
                  formatter={(val) => formatCurrency(val)}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ef4444', stroke: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-white tracking-wide mb-4">BUDGET VS ACTUAL</h3>
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="54" stroke="#1f1f2e" strokeWidth="10" fill="transparent" />
                <circle
                  cx="72"
                  cy="72"
                  r="54"
                  stroke="#dc2626"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray="340"
                  strokeDashoffset={Math.max(0, 340 - (340 * budgetUsedPercentage) / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="font-display font-extrabold text-lg text-white">₹{summary.totalExpenses.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400">of ₹{summary.budget.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-slate-400">
                <span>Budget:</span>
                <span className="font-bold text-white">₹{summary.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Actual Spent:</span>
                <span className="font-bold text-crimson-400">₹{summary.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining:</span>
                <span className="font-bold text-emerald-400">₹{Math.max(0, summary.budget - summary.totalExpenses).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="font-display font-bold text-sm text-white tracking-wide">ALL TRANSACTIONS</h3>
            {expenses.length > 0 && (
              <button
                onClick={handleClearExpenses}
                className="text-[11px] text-crimson-400 hover:text-crimson-300 font-semibold underline"
              >
                Erase All
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-surface-card border border-crimson-950 text-xs text-white pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-crimson-600 w-36 sm:w-48"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-surface-card border border-crimson-950 text-xs text-slate-300 py-1.5 px-2.5 rounded-xl focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Food & Dining">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills & Utilities">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No transactions logged yet. Click <strong>+ Add Expense</strong> or <strong>+ Log Salary / Income Date</strong> to record your activity!
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-crimson-950 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-crimson-950/20 transition-all">
                    <td className="py-3 font-mono text-[11px] text-slate-400">{exp.date}</td>
                    <td className="py-3 font-semibold text-slate-200">{exp.title}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-crimson-950 text-crimson-400 border border-crimson-900/40">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-[11px]">{exp.paymentMethod}</td>
                    <td className={`py-3 text-right font-bold ${exp.type === 'Income' ? 'text-emerald-400' : 'text-crimson-400'}`}>
                      {exp.type === 'Income' ? '+' : '-'}₹{exp.amount.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          dispatch(deleteExpense(exp.id));
                          toast.success('Transaction removed');
                        }}
                        className="text-slate-500 hover:text-crimson-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Set / Edit Budget Modal */}
      <Modal isOpen={isBudgetModalOpen} onClose={() => setIsBudgetModalOpen(false)} title="Set / Edit Monthly Budget & Base Income">
        <form onSubmit={handleSaveBudget} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Monthly Budget Limit (₹)</label>
            <input
              type="number"
              required
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              placeholder="e.g. 20000"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
            <p className="text-[10px] text-slate-500 mt-1">Set maximum target spending limit for this month.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Base Monthly Income / Salary (₹)</label>
            <input
              type="number"
              value={customIncome}
              onChange={(e) => setCustomIncome(e.target.value)}
              placeholder="e.g. 40000"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
            <p className="text-[10px] text-slate-500 mt-1">Expected monthly salary or total base income.</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsBudgetModalOpen(false)} className="px-4 py-2 text-xs text-slate-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 text-xs font-bold rounded-xl shadow-gold-glow">
              Save Budget Settings
            </button>
          </div>
        </form>
      </Modal>

      {/* Log Salary / Income Date Modal */}
      <Modal isOpen={isSalaryModalOpen} onClose={() => setIsSalaryModalOpen(false)} title="Log Salary Earned / Credit Date">
        <form onSubmit={handleLogSalary} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Salary Amount (₹)</label>
            <input
              type="number"
              required
              value={salaryAmount}
              onChange={(e) => setSalaryAmount(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Employer / Income Source Name</label>
            <input
              type="text"
              required
              value={salarySource}
              onChange={(e) => setSalarySource(e.target.value)}
              placeholder="e.g. Primary Company Salary, Freelance Work"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Date Salary Earned / Credited</label>
              <input
                type="date"
                required
                value={salaryEarnedDate}
                onChange={(e) => setSalaryEarnedDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Payment Method</label>
              <select
                value={salaryMethod}
                onChange={(e) => setSalaryMethod(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="Net Banking">Net Banking</option>
                <option value="Direct Deposit">Direct Deposit</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Notes / Payday Month</label>
            <input
              type="text"
              value={salaryNotes}
              onChange={(e) => setSalaryNotes(e.target.value)}
              placeholder="e.g. May 2025 Salary"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsSalaryModalOpen(false)} className="px-4 py-2 text-xs text-slate-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 text-xs font-bold rounded-xl shadow-gold-glow">
              Save Salary Log
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Expense Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Expense">
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Description</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Zomato Order, Fuel"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="650"
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income / Bonus</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
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
              Add Expense
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExpensesPage;
