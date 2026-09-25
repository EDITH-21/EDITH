import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addExpense,
  updateExpense,
  deleteExpense,
} from '../redux/slices/expenseSlice';
import { formatCurrency, exportExpensesToCSV } from '../utils/helpers';
import Modal from '../components/common/Modal';
import {
  Plus,
  Trash2,
  Edit3,
  CreditCard,
  Download,
  Calendar as CalendarIcon,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Education', 'Entertainment', 'Health', 'Other'];

const ExpensesPage = () => {
  const { items: expenses } = useSelector((state) => state.expenses);
  const { currency } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const todayStr = new Date().toISOString().slice(0, 10);
  const currentMonthStr = new Date().toISOString().slice(0, 7); // "2026-09"

  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr); // "2026-09" or "All"
  const [filterCategory, setFilterCategory] = useState('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(todayStr);
  const [note, setNote] = useState('');

  // Format "2026-09" to "September 2026"
  const formatMonthName = (monthStr) => {
    if (!monthStr || monthStr === 'All') return 'All Months';
    try {
      const [year, m] = monthStr.split('-');
      const d = new Date(Number(year), Number(m) - 1, 1);
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (e) {
      return monthStr;
    }
  };

  // Get unique months list from expenses for filter dropdown
  const availableMonths = Array.from(
    new Set([currentMonthStr, ...expenses.map((e) => (e.date || '').slice(0, 7)).filter(Boolean)])
  ).sort().reverse();

  // Filter expenses by selectedMonth & filterCategory
  const filteredExpenses = expenses.filter((e) => {
    const matchesMonth = selectedMonth === 'All' || (e.date || '').startsWith(selectedMonth);
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    return matchesMonth && matchesCategory;
  });

  // Calculate Month Total
  const selectedMonthTotal = expenses
    .filter((e) => selectedMonth === 'All' || (e.date || '').startsWith(selectedMonth))
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    dispatch(
      addExpense({
        title: title.trim(),
        amount: Number(amount),
        category,
        date: date || todayStr,
        note: note.trim(),
      })
    );

    toast.success('Expense logged successfully!');
    setTitle('');
    setAmount('');
    setNote('');
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (exp) => {
    setEditingExpense(exp);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category || 'Food');
    setDate(exp.date || todayStr);
    setNote(exp.note || '');
    setIsEditModalOpen(true);
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    if (!editingExpense || !title.trim() || !amount) return;

    dispatch(
      updateExpense({
        id: editingExpense.id,
        title: title.trim(),
        amount: Number(amount),
        category,
        date,
        note: note.trim(),
      })
    );

    toast.success('Expense updated!');
    setIsEditModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl lg:text-3xl text-white tracking-tight">Expenses</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track where your money goes for every month.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {expenses.length > 0 && (
            <button
              onClick={() => exportExpensesToCSV(filteredExpenses)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl transition-all"
              title="Export CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}

          <button
            onClick={() => {
              setTitle('');
              setAmount('');
              setCategory('Food');
              setDate(todayStr);
              setNote('');
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Expense</span>
          </button>
        </div>
      </div>

      {/* Month Selector Banner & Total Summary */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Spending for
            </span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border border-indigo-800/60">
              {formatMonthName(selectedMonth)}
            </span>
          </div>
          <h2 className="font-bold text-2xl lg:text-3xl text-white mt-1">
            {formatCurrency(selectedMonthTotal, currency)}
          </h2>
        </div>

        {/* Month Selector Input */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
          <CalendarIcon className="w-4 h-4 text-indigo-400 ml-1" />
          <input
            type="month"
            value={selectedMonth === 'All' ? currentMonthStr : selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium"
          />
          {selectedMonth !== 'All' && (
            <button
              onClick={() => setSelectedMonth('All')}
              className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              All
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar: Month Dropdown & Category Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Month Dropdown Quick Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium"
            >
              <option value="All">All Months</option>
              {availableMonths.map((m) => (
                <option key={m} value={m}>
                  {formatMonthName(m)}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {filteredExpenses.length} expense{filteredExpenses.length === 1 ? '' : 's'} shown
        </span>
      </div>

      {/* Expense List / Table */}
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
          <CreditCard className="w-10 h-10 mx-auto text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-300">No expenses for {formatMonthName(selectedMonth)}</h3>
          <p className="text-xs text-slate-400">Log your expenses with date and month tracking.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Expense Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date / Month</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100">{exp.title}</div>
                      {exp.note && <div className="text-[10px] text-slate-400 mt-0.5">{exp.note}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {exp.category || 'Other'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                      {exp.date}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-rose-400">
                      -{formatCurrency(exp.amount, currency)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(exp)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="Edit expense"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteExpense(exp.id));
                            toast.success('Expense removed');
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Delete expense"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Expense">
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Expense Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grocery shopping, Gas bill"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="450"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Date / Month *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional notes..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>
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
              Save Expense
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Expense Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Expense">
        <form onSubmit={handleUpdateExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Expense Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Date / Month
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
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

export default ExpensesPage;
