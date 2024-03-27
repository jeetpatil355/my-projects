import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import MyNotes from './pages/MyNotes'
import AddNote from './pages/AddNote'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-notes' element={<MyNotes />} />
        <Route path='/add-note' element={<AddNote />} />
        <Route path='/home' element={<Home />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
