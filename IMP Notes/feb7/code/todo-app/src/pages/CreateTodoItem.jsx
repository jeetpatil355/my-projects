import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTodoItem } from '../services/todoItems'

function CreateTodoItem() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const navigate = useNavigate()

  const onSave = async () => {
    const result = await createTodoItem(title, details)
    if (result['status'] == 'success') {
      alert('successfully created a todo item')
      navigate('/home')
    } else {
      alert(result['error'])
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Create ToDo Item
      </h1>

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
          type='text'
          rows='10'
          className='form-control'
        ></textarea>
      </div>
      <div className='mb-3'>
        <button onClick={onSave} className='btn btn-success'>
          Save
        </button>
        <Link to='/home' className='btn btn-danger ms-2'>
          Cancel
        </Link>
      </div>
    </div>
  )
}

export default CreateTodoItem
