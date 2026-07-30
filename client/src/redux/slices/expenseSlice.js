import { createSlice } from '@reduxjs/toolkit';
import { initialExpenses, expenseSummaryData } from '../../utils/mockData';

const initialSalaryRecords = [
  {
    id: 's_1',
    amount: 40000,
    source: 'Primary Company Salary',
    earnedDate: '2025-05-01',
    paymentMethod: 'Net Banking',
    notes: 'May 2025 Payday',
  },
];

const getStoredSalaryRecords = () => {
  try {
    const saved = localStorage.getItem('edith_salary_records');
    if (saved && saved !== 'undefined') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return initialSalaryRecords;
};

const getStoredExpenses = () => {
  try {
    const saved = localStorage.getItem('edith_expenses');
    if (saved && saved !== 'undefined') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return initialExpenses;
};

const getStoredSummary = () => {
  try {
    const saved = localStorage.getItem('edith_expense_summary');
    if (saved && saved !== 'undefined') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return expenseSummaryData;
};

const saveAllToStorage = (expenses, summary, salaryRecords) => {
  try {
    localStorage.setItem('edith_expenses', JSON.stringify(expenses));
    localStorage.setItem('edith_expense_summary', JSON.stringify(summary));
    localStorage.setItem('edith_salary_records', JSON.stringify(salaryRecords));
  } catch (e) {
    console.error(e);
  }
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: getStoredExpenses(),
    summary: getStoredSummary(),
    salaryRecords: getStoredSalaryRecords(),
    filterCategory: 'All',
    searchQuery: '',
  },
  reducers: {
    addSalaryRecord: (state, action) => {
      const record = {
        id: `s_${Date.now()}`,
        earnedDate: new Date().toISOString().slice(0, 10),
        paymentMethod: 'Net Banking',
        notes: 'Salary Credit',
        ...action.payload,
      };
      state.salaryRecords.unshift(record);

      // Recalculate total monthly income from salary records
      const totalSalaryIncome = state.salaryRecords.reduce((acc, r) => acc + Number(r.amount), 0);
      state.summary.totalIncome = totalSalaryIncome > 0 ? totalSalaryIncome : Number(record.amount);
      state.summary.savings = state.summary.totalIncome - state.summary.totalExpenses;

      // Also add as income transaction item
      state.items.unshift({
        id: `e_sal_${Date.now()}`,
        title: `Salary (${record.source})`,
        amount: Number(record.amount),
        type: 'Income',
        category: 'Salary',
        paymentMethod: record.paymentMethod,
        date: record.earnedDate,
      });

      saveAllToStorage(state.items, state.summary, state.salaryRecords);
    },
    deleteSalaryRecord: (state, action) => {
      state.salaryRecords = state.salaryRecords.filter((s) => s.id !== action.payload);
      const totalSalaryIncome = state.salaryRecords.reduce((acc, r) => acc + Number(r.amount), 0);
      state.summary.totalIncome = totalSalaryIncome;
      state.summary.savings = state.summary.totalIncome - state.summary.totalExpenses;
      saveAllToStorage(state.items, state.summary, state.salaryRecords);
    },
    setMonthlySalaryAndBudget: (state, action) => {
      const { income, budget } = action.payload;
      if (income !== undefined) state.summary.totalIncome = Number(income);
      if (budget !== undefined) state.summary.budget = Number(budget);
      state.summary.savings = state.summary.totalIncome - state.summary.totalExpenses;
      saveAllToStorage(state.items, state.summary, state.salaryRecords);
    },
    addExpense: (state, action) => {
      const newExpense = {
        id: `e_${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        ...action.payload,
      };
      state.items.unshift(newExpense);

      if (newExpense.type === 'Expense') {
        state.summary.totalExpenses += Number(newExpense.amount);
      } else if (newExpense.type === 'Income') {
        state.summary.totalIncome += Number(newExpense.amount);
      }

      state.summary.savings = state.summary.totalIncome - state.summary.totalExpenses;
      saveAllToStorage(state.items, state.summary, state.salaryRecords);
    },
    deleteExpense: (state, action) => {
      const expense = state.items.find((e) => e.id === action.payload);
      if (expense) {
        if (expense.type === 'Expense') {
          state.summary.totalExpenses -= Number(expense.amount);
        } else if (expense.type === 'Income') {
          state.summary.totalIncome -= Number(expense.amount);
        }
        state.summary.savings = state.summary.totalIncome - state.summary.totalExpenses;
      }
      state.items = state.items.filter((e) => e.id !== action.payload);
      saveAllToStorage(state.items, state.summary, state.salaryRecords);
    },
    clearAllExpenses: (state) => {
      state.items = [];
      state.salaryRecords = [];
      state.summary.totalExpenses = 0;
      state.summary.totalIncome = 0;
      state.summary.savings = 0;
      saveAllToStorage(state.items, state.summary, state.salaryRecords);
    },
    setExpenseFilter: (state, action) => {
      state.filterCategory = action.payload;
    },
    setExpenseSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addSalaryRecord,
  deleteSalaryRecord,
  setMonthlySalaryAndBudget,
  addExpense,
  deleteExpense,
  clearAllExpenses,
  setExpenseFilter,
  setExpenseSearch,
} = expenseSlice.actions;

export default expenseSlice.reducer;
