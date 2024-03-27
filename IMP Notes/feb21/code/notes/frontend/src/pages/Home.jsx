import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { deleteNote, getMyNotes, getPublicNotes } from '../services/note'
import { toast } from 'react-toastify'

function Home() {
  const [notes, setNotes] = useState([])

  const loadNotes = async () => {
    const result = await getPublicNotes()
    if (result['status'] == 'success') {
      setNotes(result['data'])
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
        <h3 className='header'>There are not public notes</h3>
      )}
      {notes.length > 0 && (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Due Date</th>
              <th>Title</th>
              <th>Details</th>
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
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Home
