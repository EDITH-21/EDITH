import { createSlice } from '@reduxjs/toolkit';
import { initialUser } from '../../utils/mockData';

const getStoredSettings = () => {
  try {
    const saved = localStorage.getItem('edith_settings');
    if (saved && saved !== 'undefined' && saved !== 'null') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return {
    user: initialUser,
    currency: 'INR',
    theme: 'dark',
  };
};

const saveSettingsToStorage = (settings) => {
  try {
    localStorage.setItem('edith_settings', JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: getStoredSettings(),
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveSettingsToStorage(state);
    },
    updatePreferences: (state, action) => {
      if (action.payload.currency) state.currency = action.payload.currency;
      if (action.payload.theme) state.theme = action.payload.theme;
      saveSettingsToStorage(state);
    },
  },
});

export const { updateProfile, updatePreferences } = settingsSlice.actions;
export default settingsSlice.reducer;
