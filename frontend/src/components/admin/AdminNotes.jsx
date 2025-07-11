import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdminNotes } from '../../store/adminNotes/adminNotesSelectors';
import { addNote, updateNote, deleteNote } from '../../store/adminNotes/adminNotesSlice';

export const AdminNotes = () => {
  const notes = useSelector(selectAdminNotes);
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateNote({ id: editingId, ...formData }));
      setEditingId(null);
    } else {
      dispatch(addNote(formData));
      setIsCreating(false);
    }
    setFormData({ title: '', content: '' });
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setFormData({ title: note.title, content: note.content });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Admin Notes</h2>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating || editingId}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter note title"
              required
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter note content"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update' : 'Save'} Note
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">No notes yet. Create your first note!</p>
            </div>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id} hover>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(note)}
                    disabled={isCreating || editingId}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(note.id)}
                    disabled={isCreating || editingId}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(note.createdAt).toLocaleString()}
                {note.updatedAt !== note.createdAt && (
                  <span className="ml-4">
                    Updated: {new Date(note.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}; 