import { useState } from 'react'
import NavBar from '../components/NavBar'
import { toast } from 'react-toastify'
import { addNote } from '../services/note'
import { useNavigate } from 'react-router-dom'

function AddNote() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const navigate = useNavigate()

  const onSave = async () => {
    if (title.length == 0) {
      toast.warn('Please enter title')
    } else if (details.length == 0) {
      toast.warn('Please enter details')
    } else if (dueDate.length == 0) {
      toast.warn('Please enter due date')
    } else {
      const result = await addNote(title, details, dueDate)
      if (result['status'] === 'success') {
        toast.success('Successfully added a note')
        navigate('/home')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <>
      <NavBar />
      <h1 className='header'>Add Note</h1>

      <div className='row'>
        <div className='col-3'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Details</label>
              <textarea
                onChange={(e) => setDetails(e.target.value)}
                className='form-control'
                rows='5'
              ></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Due Date</label>
              <input
                onChange={(e) => setDueDate(e.target.value)}
                type='date'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <button onClick={onSave} className='btn btn-success'>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </>
  )
}

export default AddNote
