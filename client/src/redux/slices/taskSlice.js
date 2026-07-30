import { createSlice } from '@reduxjs/toolkit';
import { initialTasks } from '../../utils/mockData';

const getStoredTasks = () => {
  try {
    const saved = localStorage.getItem('edith_tasks');
    if (saved && saved !== 'undefined') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return initialTasks;
};

const saveTasksToStorage = (items) => {
  try {
    localStorage.setItem('edith_tasks', JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: getStoredTasks(),
    filterStatus: 'All',
    searchQuery: '',
    loading: false,
  },
  reducers: {
    addTask: (state, action) => {
      state.items.unshift({
        id: `t_${Date.now()}`,
        progress: 0,
        labels: ['Work'],
        ...action.payload,
      });
      saveTasksToStorage(state.items);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) {
        task.status = status;
        if (status === 'Completed') task.progress = 100;
        else if (status === 'To Do') task.progress = 0;
      }
      saveTasksToStorage(state.items);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
      saveTasksToStorage(state.items);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveTasksToStorage(state.items);
    },
    clearAllTasks: (state) => {
      state.items = [];
      saveTasksToStorage(state.items);
    },
    setTaskFilter: (state, action) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  clearAllTasks,
  setTaskFilter,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;
