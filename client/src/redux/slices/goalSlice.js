import { createSlice } from '@reduxjs/toolkit';
import { initialGoals } from '../../utils/mockData';

const goalSlice = createSlice({
  name: 'goals',
  initialState: {
    items: initialGoals,
  },
  reducers: {
    addGoal: (state, action) => {
      state.items.push({
        id: `g_${Date.now()}`,
        progress: 0,
        color: '#ef4444',
        ...action.payload,
      });
    },
    updateGoalProgress: (state, action) => {
      const { id, currentAmount } = action.payload;
      const goal = state.items.find((g) => g.id === id);
      if (goal) {
        goal.currentAmount = currentAmount;
        goal.progress = Math.min(100, Math.round((currentAmount / goal.targetAmount) * 100));
      }
    },
    deleteGoal: (state, action) => {
      state.items = state.items.filter((g) => g.id !== action.payload);
    },
  },
});

export const { addGoal, updateGoalProgress, deleteGoal } = goalSlice.actions;
export default goalSlice.reducer;
