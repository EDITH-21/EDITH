import { createSlice } from '@reduxjs/toolkit';
import { initialNotes } from '../../utils/mockData';

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    items: initialNotes,
    activeNoteId: 'n1',
    filterFolder: 'All',
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: `n_${Date.now()}`,
        folder: 'General',
        pinned: false,
        updatedAt: new Date().toISOString().slice(0, 10),
        ...action.payload,
      };
      state.items.unshift(newNote);
      state.activeNoteId = newNote.id;
    },
    updateNote: (state, action) => {
      const index = state.items.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: new Date().toISOString().slice(0, 10),
        };
      }
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
      if (state.activeNoteId === action.payload) {
        state.activeNoteId = state.items[0]?.id || null;
      }
    },
    setActiveNote: (state, action) => {
      state.activeNoteId = action.payload;
    },
    setNoteFolderFilter: (state, action) => {
      state.filterFolder = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, setActiveNote, setNoteFolderFilter } = noteSlice.actions;
export default noteSlice.reducer;
