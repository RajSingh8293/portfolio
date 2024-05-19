import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const LoginUser = (e) => {
    e.preventDefault()
    console.log(email, password)
    if (!email || !password) {
      setError('All fields required')
    }
    localStorage.setItem('user', JSON.stringify(email))
  }

  return (
    <div className="py-24 h-[80vh] lg:h-[100vh] md:h-[90vh] sm:h-[90vh] flex justify-center items-center ">
      <div className="lg:w-[500px] w-[80%] signup-form">
        <div className="signup flex justify-center flex-col gap-5">
          <div className="flex justify-center">
            <h1 className="text-white text-3xl font-bold">Login</h1>
          </div>
          <div className=" flex justify-center items-center">
            <span className=" text-[red]">{error}</span>
          </div>
          <div className="w-[100%] h-[40px] border">
            <input
              type="email"
              className="input-field w-[100%] h-[100%] px-2"
              placeholder="Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className="w-[100%] h-[40px] border">
            <input
              type="password"
              className="input-field w-[100%] h-[100%] px-2"
              placeholder="Your Paswword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <p className="text-white">
            Have an account{' '}
            <NavLink className="text-blue-600" to="/register">
              register
            </NavLink>
          </p>
          <div className="bg-black hover:bg-[red] flex justify-center items-center">
            <button
              className="py-2 text-white"
              onClick={LoginUser}
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
