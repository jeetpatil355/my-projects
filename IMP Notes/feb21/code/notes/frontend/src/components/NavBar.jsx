import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()

  const onLogout = () => {
    // clear the token from session storage
    sessionStorage.removeItem('token')

    // to the login page
    navigate('/')
  }

  return (
    <nav className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/home'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/add-note'>
                Add Note
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/my-notes'>
                My Notes
              </Link>
            </li>

            <li className='nav-item'>
              <button className='nav-link' onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
