import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addSaving,
  updateSaving,
  deleteSaving,
} from '../redux/slices/savingSlice';
import { formatCurrency } from '../utils/helpers';
import Modal from '../components/common/Modal';
import {
  Plus,
  Trash2,
  Edit3,
  PiggyBank,
  TrendingUp,
  Calendar as CalendarIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const SavingsPage = () => {
  const { items: savings } = useSelector((state) => state.savings);
  const { currency } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSaving, setEditingSaving] = useState(null);

  // Current & Previous Month calculation
  const today = new Date();
  const currentMonthStr = today.toISOString().slice(0, 7); // e.g. "2026-08"

  const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthStr = prevMonthDate.toISOString().slice(0, 7); // e.g. "2026-07"

  // Form State
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(currentMonthStr);
  const [note, setNote] = useState('');

  // Helper to format "2026-01" to "January 2026"
  const formatMonthName = (monthStr) => {
    if (!monthStr) return '';
    try {
      const [year, m] = monthStr.split('-');
      const date = new Date(Number(year), Number(m) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (e) {
      return monthStr;
    }
  };

  // Summary Calculations
  const totalSavings = savings.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const thisMonthSavings = savings
    .filter((s) => (s.month || '').startsWith(currentMonthStr))
    .reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const lastMonthSavings = savings
    .filter((s) => (s.month || '').startsWith(prevMonthStr))
    .reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const handleCreateSaving = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }
    if (!month) {
      toast.error('Please select a month');
      return;
    }

    dispatch(
      addSaving({
        amount: numAmount,
        month,
        note: note.trim(),
      })
    );

    toast.success('Saving added successfully!');
    setAmount('');
    setNote('');
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (saving) => {
    setEditingSaving(saving);
    setAmount(saving.amount);
    setMonth(saving.month || currentMonthStr);
    setNote(saving.note || '');
    setIsEditModalOpen(true);
  };

  const handleUpdateSaving = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!editingSaving || !amount || isNaN(numAmount) || numAmount <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }
    if (!month) {
      toast.error('Please select a month');
      return;
    }

    dispatch(
      updateSaving({
        id: editingSaving.id,
        amount: numAmount,
        month,
        note: note.trim(),
      })
    );

    toast.success('Saving updated!');
    setIsEditModalOpen(false);
    setEditingSaving(null);
  };

  const handleDeleteSaving = (id) => {
    if (window.confirm('Are you sure you want to delete this saving entry?')) {
      dispatch(deleteSaving(id));
      toast.success('Saving deleted');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl lg:text-3xl text-white tracking-tight">Savings</h1>
          <p className="text-xs text-slate-400 mt-1">Build your savings month by month.</p>
        </div>

        <button
          onClick={() => {
            setAmount('');
            setMonth(currentMonthStr);
            setNote('');
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Saving</span>
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Savings */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Savings</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-bold text-2xl lg:text-3xl text-emerald-400 mt-2">
            {formatCurrency(totalSavings, currency)}
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">Across all months</p>
        </div>

        {/* This Month */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">This Month</span>
            <div className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-bold text-2xl text-white mt-2">
            {formatCurrency(thisMonthSavings, currency)}
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">{formatMonthName(currentMonthStr)}</p>
        </div>

        {/* Last Month */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Last Month</span>
            <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-bold text-2xl text-slate-200 mt-2">
            {formatCurrency(lastMonthSavings, currency)}
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">{formatMonthName(prevMonthStr)}</p>
        </div>
      </div>

      {/* Savings History List / Table */}
      {savings.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <PiggyBank className="w-12 h-12 mx-auto text-slate-600" />
          <div>
            <h3 className="text-sm font-semibold text-slate-300">No savings yet</h3>
            <p className="text-xs text-slate-400 mt-1">Start building your savings by adding your first saving.</p>
          </div>
          <button
            onClick={() => {
              setAmount('');
              setMonth(currentMonthStr);
              setNote('');
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Saving</span>
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-bold text-sm text-white">Savings History</h2>
            <span className="text-xs text-slate-400 font-medium">
              {savings.length} {savings.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Note</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {savings.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-100">
                      {formatMonthName(s.month)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      {formatCurrency(s.amount, currency)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {s.note ? s.note : <span className="text-slate-500 italic">—</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="Edit saving"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSaving(s.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Delete saving"
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

      {/* Add Saving Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Saving">
        <form onSubmit={handleCreateSaving} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              required
              min="1"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Month *
            </label>
            <input
              type="month"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
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
              placeholder="e.g. Emergency fund, Laptop, Future plans"
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
              Add Saving
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Saving Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Saving">
        <form onSubmit={handleUpdateSaving} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              required
              min="1"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Month *
            </label>
            <input
              type="month"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
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
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
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

export default SavingsPage;
