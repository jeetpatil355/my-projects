import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/user'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigate hook for navigation
  const navigate = useNavigate()

  const onLogin = async () => {
    const result = await loginUser(email, password)
    if (result['status'] == 'success') {
      alert('welcome to my app')

      // go to home component
      navigate('/home')
    } else {
      alert(result['error'])
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Login
      </h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
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
            Don't have an account ? <Link to='/register'>Register here</Link>
          </div>
          <div className='mb-3'>
            <button onClick={onLogin} className='btn btn-success'>
              Login
            </button>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Login
