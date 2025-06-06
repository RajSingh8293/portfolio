/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthForm = ({ authType, closeModal, setAuthType }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const RegisterUser = (e) => {
        e.preventDefault()
        closeModal();
        console.log(username, email, password)
        if (!username || !email || !password) {
            setError('All fields required')
        }

        localStorage.setItem('user', JSON.stringify(email))
        navigate('/')
    }
    return (
        <div className=" h-[100%] flex justify-center items-center ">
            <div className="lg:w-[500px] w-[80%] signup-form">
                <div className="signup flex justify-center flex-col gap-5">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {authType === 'login' ? 'Login' : 'Register'}
                    </h2>
                    <div className=" flex justify-center items-center">
                        <span className=" text-[red]">{error}</span>
                    </div>
                    {authType === 'register' && <div className="w-[100%] h-[40px] border">
                        <input
                            type="text"
                            className="input-field w-[100%] h-[100%] px-2"
                            placeholder="User name"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>}
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
                    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
                        {authType === 'login' ? (
                            <>
                                Don’t have an account?{' '}
                                <button onClick={() => setAuthType('register')} className="text-blue-600 underline">
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button onClick={() => setAuthType('login')} className="text-blue-600 underline">
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                    <div className="bg-black hover:bg-[red] flex justify-center items-center">
                        <button
                            className="py-2 text-white"
                            onClick={RegisterUser}
                            type="button"
                        >
                            {authType === 'login' ? 'Login' : 'Register'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm