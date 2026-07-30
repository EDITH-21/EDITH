import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'dark-crimson',
    language: 'en',
    timezone: 'UTC+05:30',
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      budgetAlerts: true,
    },
    privacy: {
      shareAnalytics: false,
    },
  },
  reducers: {
    updateSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
