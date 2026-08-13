import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import expenseReducer from './slices/expenseSlice';
import savingReducer from './slices/savingSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    expenses: expenseReducer,
    savings: savingReducer,
    settings: settingsReducer,
  },
});
