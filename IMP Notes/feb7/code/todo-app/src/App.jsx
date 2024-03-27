import { Route, Routes } from 'react-router-dom'
import CreateTodoItem from './pages/CreateTodoItem'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home />} />
        <Route path='create-item' element={<CreateTodoItem />} />
      </Routes>
    </div>
  )
}

export default App
