import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../services/user'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onRegister = async () => {
    if (firstName.length == 0) {
      toast.warn('Please enter first name')
    } else if (lastName.length == 0) {
      toast.warn('Please enter last name')
    } else if (email.length == 0) {
      toast.warn('Please enter email')
    } else if (password.length == 0) {
      toast.warn('Please enter password')
    } else {
      const result = await registerUser(firstName, lastName, email, password)
      if (result['status'] == 'success') {
        toast.success('Successfully registered your account')

        // go to login page
        navigate('/')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <>
      <h1 className='header'>Register</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
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
                Already have an account? Login <Link to='/'>here</Link>
              </div>
              <button onClick={onRegister} className='btn btn-primary'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}

export default Register
