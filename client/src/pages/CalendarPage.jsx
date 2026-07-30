import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

const CalendarPage = () => {
  const [view, setView] = useState('Month'); // Month or Week
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Task');
  const [eventDate, setEventDate] = useState('2025-05-28');

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const mockEvents = {
    5: [{ title: 'Team Meeting', type: 'Task', color: 'bg-crimson-600' }],
    12: [{ title: 'Electricity Bill Due', type: 'Expense', color: 'bg-amber-500' }],
    19: [{ title: 'Project Milestone', type: 'Goal', color: 'bg-emerald-500' }],
    28: [
      { title: 'EDITH Launch Review', type: 'Task', color: 'bg-crimson-600' },
      { title: 'Zomato Payment', type: 'Expense', color: 'bg-amber-500' },
    ],
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    toast.success(`New ${eventType} event added for ${eventDate}`);
    setIsModalOpen(false);
    setEventTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
            Schedule & Reminders
          </h1>
          <p className="text-xs text-slate-400 mt-1">Integrate tasks, expense deadlines, and goal milestones.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-surface-card border border-crimson-950 rounded-xl">
            {['Month', 'Week'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  view === v ? 'bg-crimson-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-crimson-800 to-crimson-600 text-white text-xs font-bold rounded-xl shadow-crimson-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="p-4 rounded-2xl glass-panel flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-crimson-500" />
          <h2 className="font-display text-lg font-bold text-white">May 2025</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-surface-card border border-slate-800 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
          <button className="px-3 py-1.5 rounded-xl bg-surface-card border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white">Today</button>
          <button className="p-2 rounded-xl bg-surface-card border border-slate-800 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 rounded-2xl glass-panel">
        <div className="grid grid-cols-7 gap-px bg-crimson-950/40 rounded-xl overflow-hidden text-center text-xs">
          {/* Header Row */}
          {days.map((day) => (
            <div key={day} className="py-3 bg-[#0d0d12] font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              {day}
            </div>
          ))}

          {/* Days Grid */}
          {monthDays.map((day) => {
            const hasEvent = mockEvents[day];
            const isToday = day === 28;
            return (
              <div
                key={day}
                className={`min-h-[90px] p-2 bg-[#121218] flex flex-col justify-between transition-all hover:bg-crimson-950/20 ${
                  isToday ? 'border-2 border-crimson-600' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? 'w-5 h-5 rounded-full bg-crimson-600 text-white flex items-center justify-center'
                        : 'text-slate-300'
                    }`}
                  >
                    {day}
                  </span>
                </div>

                {/* Event Tags */}
                <div className="space-y-1 mt-1">
                  {hasEvent &&
                    hasEvent.map((evt, idx) => (
                      <div
                        key={idx}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-semibold text-white truncate ${evt.color}`}
                      >
                        {evt.title}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Event / Reminder">
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Event Title</label>
            <input
              type="text"
              required
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="e.g., Electricity Bill Reminder"
              className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="Task">Task Deadline</option>
                <option value="Expense">Expense Reminder</option>
                <option value="Goal">Goal Milestone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-card border border-crimson-950 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs text-slate-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-crimson-600 text-white text-xs font-bold rounded-xl shadow-crimson-glow">
              Save Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarPage;
