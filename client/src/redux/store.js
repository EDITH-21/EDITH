import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import expenseReducer from './slices/expenseSlice';
import goalReducer from './slices/goalSlice';
import noteReducer from './slices/noteSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    expenses: expenseReducer,
    goals: goalReducer,
    notes: noteReducer,
    settings: settingsReducer,
  },
});
