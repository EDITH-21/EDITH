import { createSlice } from '@reduxjs/toolkit';
import { initialExpenses } from '../../utils/mockData';

const getStoredExpenses = () => {
  try {
    const saved = localStorage.getItem('edith_expenses');
    if (saved && saved !== 'undefined' && saved !== 'null') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return initialExpenses;
};

const saveExpensesToStorage = (items) => {
  try {
    localStorage.setItem('edith_expenses', JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: getStoredExpenses(),
    filterTime: 'All',
  },
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        id: `e_${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        category: 'Other',
        note: '',
        ...action.payload,
        amount: Number(action.payload.amount) || 0,
      };
      state.items.unshift(newExpense);
      saveExpensesToStorage(state.items);
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          amount: Number(action.payload.amount) || state.items[index].amount,
        };
      }
      saveExpensesToStorage(state.items);
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter((e) => e.id !== action.payload);
      saveExpensesToStorage(state.items);
    },
    clearAllExpenses: (state) => {
      state.items = [];
      saveExpensesToStorage(state.items);
    },
    setExpenseFilter: (state, action) => {
      state.filterTime = action.payload;
    },
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  clearAllExpenses,
  setExpenseFilter,
} = expenseSlice.actions;

export default expenseSlice.reducer;
