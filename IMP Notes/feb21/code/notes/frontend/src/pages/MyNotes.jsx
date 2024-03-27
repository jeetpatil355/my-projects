import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import {
  deleteNote,
  getMyNotes,
  markNotePrivate,
  markNotePublic,
} from '../services/note'
import { toast } from 'react-toastify'

function MyNotes() {
  const [notes, setNotes] = useState([])

  const loadNotes = async () => {
    const result = await getMyNotes()
    if (result['status'] == 'success') {
      setNotes(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  const onDeleteNote = async (id) => {
    const result = await deleteNote(id)
    if (result['status'] == 'success') {
      // refresh the notes
      loadNotes()
    } else {
      toast.error(result['error'])
    }
  }

  const onMarkPublicNote = async (id) => {
    const result = await markNotePublic(id)
    if (result['status'] == 'success') {
      toast.success('Successfully marked this note as public')
      // refresh the notes
      loadNotes()
    } else {
      toast.error(result['error'])
    }
  }

  const onMarkPrivateNote = async (id) => {
    const result = await markNotePrivate(id)
    if (result['status'] == 'success') {
      toast.success('Successfully marked this note as private')
      // refresh the notes
      loadNotes()
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <>
      <NavBar />
      <h1 className='header'>Home</h1>
      {notes.length == 0 && (
        <h3 className='header'>
          There are no notes added by you. Please go to "Add Note" page to add a
          note
        </h3>
      )}
      {notes.length > 0 && (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Due Date</th>
              <th>Title</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{note['dueDate']}</td>
                  <td>{note['title']}</td>
                  <td>{note['details']}</td>
                  <td>
                    <button
                      onClick={() => {
                        onDeleteNote(note['id'])
                      }}
                      className='btn btn-danger btn-sm'
                    >
                      Delete
                    </button>

                    {note['isPublic'] == 0 && (
                      <button
                        onClick={() => {
                          onMarkPublicNote(note['id'])
                        }}
                        className='btn btn-success btn-sm ms-2'
                      >
                        Mark Public
                      </button>
                    )}

                    {note['isPublic'] == 1 && (
                      <button
                        onClick={() => {
                          onMarkPrivateNote(note['id'])
                        }}
                        className='btn btn-warning btn-sm ms-2'
                      >
                        Mark Private
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default MyNotes
