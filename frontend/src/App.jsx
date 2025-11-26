import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import Skills from './pages/Skills'
// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProjectsPage from './pages/ProjectsPage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from './redux/slices/userSlice'
import { Toaster } from 'react-hot-toast'
import NoPage from './pages/NoPage'
import Profile from './pages/Profile'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Loader from './components/Loader'
import Login from './pages/Login'
import AdminRoute from './protectedRoutes/AdminRoute'

function App() {

  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.user)
  console.log("user :", user);



  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  if (loading) return <Loader />
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {/* < ToastContainer position='bottom-right' theme='dark' autoClose={5000} /> */}
      < Toaster position='bottom-right' theme='dark' autoClose={5000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
