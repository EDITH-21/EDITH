import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, updateNote, deleteNote, setActiveNote } from '../redux/slices/noteSlice';
import { Plus, Pin, Folder, Search, Trash2, Edit3, Eye, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const NotesPage = () => {
  const { items: notes, activeNoteId } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState('All');
  const [isPreview, setIsPreview] = useState(false);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const filteredNotes = notes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder === 'All' || n.folder === activeFolder;
    return matchesSearch && matchesFolder;
  });

  const handleCreateNote = () => {
    const newNote = {
      title: 'Untitled Note',
      content: '# New Note\nType your content here...',
      folder: activeFolder === 'All' ? 'General' : activeFolder,
    };
    dispatch(addNote(newNote));
    toast.success('Note created');
  };

  return (
    <div className="h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Folders & Notes List Sidebar (4 cols) */}
      <div className="lg:col-span-4 p-4 rounded-2xl glass-panel flex flex-col justify-between overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white">Notes</h2>
            <button
              onClick={handleCreateNote}
              className="p-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white shadow-crimson-glow"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-card border border-crimson-950 text-xs text-white pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-crimson-600"
            />
          </div>

          {/* Folder Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {['All', 'Work', 'Personal', 'General'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFolder(f)}
                className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeFolder === f ? 'bg-crimson-950 text-crimson-400 border border-crimson-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredNotes.map((n) => (
              <div
                key={n.id}
                onClick={() => dispatch(setActiveNote(n.id))}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  n.id === activeNote?.id
                    ? 'bg-crimson-950/60 border-crimson-600 text-white shadow-crimson-glow'
                    : 'bg-surface-card border-crimson-950 hover:border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold truncate">{n.title}</h4>
                  {n.pinned && <Pin className="w-3 h-3 text-gold-400 fill-gold-400" />}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-1">{n.content.replace(/[#*]/g, '')}</p>
                <span className="text-[9px] text-slate-500 mt-2 block">{n.updatedAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Note Editor Area (8 cols) */}
      <div className="lg:col-span-8 p-6 rounded-2xl glass-panel flex flex-col justify-between">
        {activeNote ? (
          <div className="flex-1 flex flex-col space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-crimson-950 pb-3">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => dispatch(updateNote({ id: activeNote.id, title: e.target.value }))}
                className="font-display font-extrabold text-xl text-white bg-transparent focus:outline-none flex-1"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(updateNote({ id: activeNote.id, pinned: !activeNote.pinned }))}
                  className={`p-2 rounded-xl border transition-all ${
                    activeNote.pinned ? 'bg-gold-500/20 border-gold-500 text-gold-400' : 'bg-surface-card border-slate-800 text-slate-400'
                  }`}
                >
                  <Pin className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-card border border-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  {isPreview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isPreview ? 'Edit' : 'Preview'}</span>
                </button>

                <button
                  onClick={() => {
                    dispatch(deleteNote(activeNote.id));
                    toast.success('Note deleted');
                  }}
                  className="p-2 rounded-xl bg-surface-card border border-slate-800 text-crimson-400 hover:bg-crimson-950"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Note Body */}
            {isPreview ? (
              <div className="flex-1 p-4 bg-surface-card/40 rounded-xl border border-slate-800/60 font-mono text-xs text-slate-200 whitespace-pre-wrap">
                {activeNote.content}
              </div>
            ) : (
              <textarea
                value={activeNote.content}
                onChange={(e) => dispatch(updateNote({ id: activeNote.id, content: e.target.value }))}
                placeholder="Write your Markdown note here..."
                className="flex-1 w-full bg-transparent text-xs text-slate-200 font-mono focus:outline-none resize-none leading-relaxed"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-slate-500">
            <FileText className="w-12 h-12 mb-2 stroke-1" />
            <p className="text-xs">No note selected. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
