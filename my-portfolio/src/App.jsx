import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer/Footer'
import Register from './pages/Register'
import AboutPage from './pages/AboutPage'
import Skills from './pages/Skills'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
