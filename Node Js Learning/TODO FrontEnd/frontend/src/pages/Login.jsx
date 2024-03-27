import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/user'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onLogin = async () => {
    if (email.length == 0) {
      toast.warn('Please enter email')
    } else if (password.length == 0) {
      toast.warn('Please enter password')
    } else {
      const result = await loginUser(email, password)
      if (result['status'] == 'success') {
        toast.success('Welcome to the application')

        // persist the token
        // sessionStorage: temporary
        // localStorage: permanent
        sessionStorage['token'] = result['data']['token']

        // go to home page
        navigate('/home')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <>
      <h1 className='header'>Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
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
              <div className='mb-2'>
                Don't have account? Register <Link to='/register'>here</Link>
              </div>
              <button onClick={onLogin} className='btn btn-primary'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}

export default Login
