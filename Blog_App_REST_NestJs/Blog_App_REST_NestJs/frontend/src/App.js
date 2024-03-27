import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import AddBlog from "./pages/AddBlog";
import MyBlogs from "./pages/MyBlogs";
import UpdateBlog from "./pages/UpdateBlog";
import ShareBlog from "./pages/ShareBlog";
import SharedBlogs from "./pages/SharedBlogs";
import Display from "./pages/Display";
import About from "./pages/About";

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState("")
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [page, setPage] = useState(0)
  const navigate = useNavigate()
  

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLogin(false)
  }

  useEffect(() => {
    const myAccess = localStorage.getItem("token")
    if (myAccess) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])


  return (
    <>
    {
      isShareOpen === false && <NavBar isLogin={isLogin} handleLogout={handleLogout} />
    }
      
      <Routes>
        <Route path="/" element={<Home setPage={setPage} />} />
        {/* <Route path="/about" element={<About />}/> */}
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-my-password" element={<ChangePassword handleLogout={handleLogout} />} />
        <Route path="/my-profile" element={<Profile setName={setName}/>} />
        <Route path="/add-blogs" element={<AddBlog />} />
        <Route path="/update-blogs" element={<UpdateBlog/>} />
        <Route path="/my-blogs" element={<MyBlogs name={name} setPage={setPage}/>}/>
        <Route path="/share-blog" element={<ShareBlog setIsShareOpen={setIsShareOpen}/>}/>
        <Route path="/shared-blogs" element={<SharedBlogs setPage={setPage}/>}/>
        <Route path="/display" element={<Display page={page}/>}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
