import { createSlice } from '@reduxjs/toolkit';
import { initialTasks } from '../../utils/mockData';

const getStoredTasks = () => {
  try {
    const saved = localStorage.getItem('edith_tasks');
    if (saved && saved !== 'undefined' && saved !== 'null') {
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
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: `t_${Date.now()}`,
        completed: false,
        status: 'To Do',
        createdAt: new Date().toISOString().slice(0, 10),
        priority: 'Medium',
        ...action.payload,
      };
      state.items.unshift(newTask);
      saveTasksToStorage(state.items);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.status = task.completed ? 'Completed' : 'To Do';
      }
      saveTasksToStorage(state.items);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        if (action.payload.completed !== undefined) {
          state.items[index].status = action.payload.completed ? 'Completed' : 'To Do';
        }
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
  },
});

export const {
  addTask,
  toggleTaskStatus,
  updateTask,
  deleteTask,
  clearAllTasks,
  setTaskFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
