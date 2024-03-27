import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/user'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const onRegister = async () => {
    const result = await registerUser(firstName, lastName, email, password)
    if (result['status'] == 'success') {
      alert('successfully registered your account')
    } else {
      alert(result['error'])
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Register
      </h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='mb-3'>
            <label htmlFor=''>First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            Already got an account? <Link to='/login'>Login here</Link>
          </div>
          <div className='mb-3'>
            <button onClick={onRegister} className='btn btn-success'>
              Register
            </button>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Register
