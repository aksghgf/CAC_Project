const NOTES_KEY = 'admin_notes';

export const getAdminNotes = () => {
  const notes = localStorage.getItem(NOTES_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const saveAdminNote = (note) => {
  const notes = getAdminNotes();
  const newNote = {
    ...note,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  notes.push(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return newNote;
};

export const updateAdminNote = (id, updates) => {
  const notes = getAdminNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) return null;
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return notes[noteIndex];
};

export const deleteAdminNote = (id) => {
  const notes = getAdminNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  
  if (filteredNotes.length === notes.length) return false;
  
  localStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
  return true;
};