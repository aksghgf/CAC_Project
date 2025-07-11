import { configureStore } from '@reduxjs/toolkit';
import adminNotesReducer from './adminNotes/adminNotesSlice';
 
export const store = configureStore({
  reducer: {
    adminNotes: adminNotesReducer,
  },
}); 