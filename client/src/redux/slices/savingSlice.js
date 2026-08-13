import { createSlice } from '@reduxjs/toolkit';

const initialSavings = [
  {
    id: 's_1',
    amount: 5000,
    month: '2026-01',
    note: 'Emergency Fund',
    date: '2026-01-15',
  },
  {
    id: 's_2',
    amount: 3000,
    month: '2026-02',
    note: 'Laptop Fund',
    date: '2026-02-10',
  },
];

const getStoredSavings = () => {
  try {
    const saved = localStorage.getItem('edith_savings');
    if (saved && saved !== 'undefined' && saved !== 'null') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return initialSavings;
};

const saveSavingsToStorage = (items) => {
  try {
    localStorage.setItem('edith_savings', JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
};

const savingSlice = createSlice({
  name: 'savings',
  initialState: {
    items: getStoredSavings(),
  },
  reducers: {
    addSaving: (state, action) => {
      const newSaving = {
        id: `s_${Date.now()}`,
        amount: Number(action.payload.amount) || 0,
        month: action.payload.month, // e.g. "2026-01"
        note: action.payload.note || '',
        date: action.payload.date || new Date().toISOString().slice(0, 10),
      };
      state.items.unshift(newSaving);
      saveSavingsToStorage(state.items);
    },
    updateSaving: (state, action) => {
      const index = state.items.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          amount: Number(action.payload.amount) || state.items[index].amount,
        };
      }
      saveSavingsToStorage(state.items);
    },
    deleteSaving: (state, action) => {
      state.items = state.items.filter((s) => s.id !== action.payload);
      saveSavingsToStorage(state.items);
    },
    clearAllSavings: (state) => {
      state.items = [];
      saveSavingsToStorage(state.items);
    },
  },
});

export const { addSaving, updateSaving, deleteSaving, clearAllSavings } = savingSlice.actions;
export default savingSlice.reducer;
