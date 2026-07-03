import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/notes`)
      if (!response.ok) throw new Error('Failed to fetch notes')
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      console.error('Error fetching notes:', error)
      alert('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    try {
      if (editingId) {
        // Update existing note
        const response = await fetch(`${API_URL}/notes/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        })
        if (!response.ok) throw new Error('Failed to update note')
        const updatedNote = await response.json()
        setNotes(notes.map(note => note._id === editingId ? updatedNote : note))
        setEditingId(null)
      } else {
        // Create new note
        const response = await fetch(`${API_URL}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        })
        if (!response.ok) throw new Error('Failed to create note')
        const newNote = await response.json()
        setNotes([newNote, ...notes])
      }
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Failed to save note')
    }
  }

  const handleEditNote = (note) => {
    setEditingId(note._id)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete note')
      setNotes(notes.filter(note => note._id !== id))
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>📝 Notes App</h1>
        <p>A simple note-taking application</p>
      </header>

      <div className="content">
        <form className="form" onSubmit={handleAddNote}>
          <div className="form-header">
            <h2>{editingId ? 'Edit Note' : 'Create New Note'}</h2>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Enter note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Note' : 'Add Note'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="notes-section">
          <h2>Your Notes ({notes.length})</h2>
          {loading && <p className="loading">Loading...</p>}
          {!loading && notes.length === 0 && (
            <p className="empty-state">No notes yet. Create one to get started!</p>
          )}
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note._id} className="note-card">
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <div className="note-actions">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditNote(note)}
                      title="Edit note"
                    >
                      ✎
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteNote(note._id)}
                      title="Delete note"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <p className="note-content">{note.content}</p>
                <p className="note-date">
                  {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
