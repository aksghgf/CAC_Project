import { createSlice } from '@reduxjs/toolkit';

const NOTES_KEY = 'adminNotes';

const loadNotes = () => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch {
    return [];
  }
};

const saveNotes = (notes) => {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

const initialState = loadNotes();

const adminNotesSlice = createSlice({
  name: 'adminNotes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.unshift(newNote);
      saveNotes(state);
    },
    updateNote: (state, action) => {
      const { id, ...changes } = action.payload;
      const idx = state.findIndex((note) => note.id === id);
      if (idx !== -1) {
        state[idx] = {
          ...state[idx],
          ...changes,
          updatedAt: new Date().toISOString(),
        };
        saveNotes(state);
      }
    },
    deleteNote: (state, action) => {
      const idx = state.findIndex((note) => note.id === action.payload);
      if (idx !== -1) {
        state.splice(idx, 1);
        saveNotes(state);
      }
    },
    setNotes: (state, action) => {
      saveNotes(action.payload);
      return action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, setNotes } = adminNotesSlice.actions;
export default adminNotesSlice.reducer; 