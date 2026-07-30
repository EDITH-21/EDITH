import { createSlice } from '@reduxjs/toolkit';
import { initialUser } from '../../utils/mockData';

const getInitialUser = () => {
  try {
    const item = localStorage.getItem('edith_user');
    if (item && item !== 'undefined' && item !== 'null') {
      return JSON.parse(item);
    }
  } catch (e) {
    console.error('Failed to parse edith_user from localStorage', e);
  }
  return initialUser;
};

const getInitialToken = () => {
  try {
    const token = localStorage.getItem('edith_token');
    if (token && token !== 'undefined' && token !== 'null') {
      return token;
    }
  } catch (e) {
    // fallback
  }
  return 'demo_jwt_token_edith';
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
    token: getInitialToken(),
    isAuthenticated: true, // Default to true for instant demo access
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      try {
        localStorage.setItem('edith_user', JSON.stringify(action.payload.user));
        localStorage.setItem('edith_token', action.payload.token);
      } catch (e) {
        console.error(e);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem('edith_user');
        localStorage.removeItem('edith_token');
      } catch (e) {
        console.error(e);
      }
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      try {
        localStorage.setItem('edith_user', JSON.stringify(state.user));
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const { loginSuccess, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
