import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const item = localStorage.getItem('edith_user');
    if (item && item !== 'undefined' && item !== 'null') {
      return JSON.parse(item);
    }
  } catch (e) {
    console.error('Failed to parse edith_user from localStorage', e);
  }
  return null;
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
  return null;
};

const initialUserObj = getInitialUser();
const initialTokenObj = getInitialToken();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUserObj,
    token: initialTokenObj,
    isAuthenticated: Boolean(initialUserObj && initialTokenObj),
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

        // Also save user to registered accounts list if not already saved
        const users = JSON.parse(localStorage.getItem('edith_users') || '[]');
        if (!users.some((u) => u.email === action.payload.user.email)) {
          users.push(action.payload.user);
          localStorage.setItem('edith_users', JSON.stringify(users));
        }
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
