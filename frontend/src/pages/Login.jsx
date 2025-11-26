import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginUser, registerUser, setUser, verifyUserEmail } from '../redux/slices/userSlice';

import { CiMail, CiLock, CiUser } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { axiosInstance } from '../lib/axiosInstansce';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authType, setAuthType] = useState('register');

    const { user } = useSelector(state => state.user)

    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        newPassword: "",
        otp: "",
    });


    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate]);
    useEffect(() => {
        if (token) {
            setAuthType("passwordChange");
        }
    }, [token]);

    const switchView = (newView) => {
        setAuthType(newView);
        setErrors({});
        setUserData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            newPassword: "",
            otp: "",
        });
    };


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };


    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (authType === "login") {
            if (!userData.email) newErrors.email = "Email is required.";
            else if (!emailRegex.test(userData.email)) newErrors.email = "Invalid email.";
            if (!userData.password) newErrors.password = "Password is required.";
        } else if (authType === "register") {
            if (!userData.username) newErrors.username = "Username is required.";
            if (!userData.email) newErrors.email = "Email is required.";
            else if (!emailRegex.test(userData.email)) newErrors.email = "Invalid email.";
            if (!userData.password) newErrors.password = "Password is required.";
            else if (userData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
        }
        else if (authType === "verify-email") {
            if (!userData.otp) newErrors.otp = "OTP is required.";
        }
        else if (authType === "forgotPassword") {
            if (!userData.email) newErrors.email = "Email is required.";
            else if (!emailRegex.test(userData.email)) newErrors.email = "Invalid email.";
        } else if (authType === "passwordChange") {
            if (!userData.newPassword) newErrors.newPassword = "New password is required.";
            else if (userData.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters.";
            if (!userData.confirmPassword) newErrors.confirmPassword = "Confirm password is required.";
            else if (userData.newPassword !== userData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) return;

        setIsLoading(true);

        if (authType === "register") {
            // dispatch(registerUser(userData, switchView))
            try {
                const { data } = await axiosInstance.post(`/api/users/register`, userData);
                console.log("data :", data);

                if (data?.success) {
                    dispatch(setUser(data?.user));
                    switchView("verify-email");
                    toast.success(data.message || "Register Successfully!");
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Register failed");
            } finally {
                setIsLoading(false);
            }
        }
        else if (authType === "verify-email") {
            // dispatch(verifyUserEmail(userData, navigate));
            try {
                const { data } = await axiosInstance.post(`/api/users/email-verify`, userData);
                if (data?.success) {
                    dispatch(setUser(data?.user));
                    toast.success(data.message || "Email verify Successfully!");
                    navigate("/");
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Register failed");
            } finally {
                setIsLoading(false);
            }
        }
        else if (authType === "login") {
            // dispatch(verifyUserEmail(userData, navigate));
            try {
                const { data } = await axiosInstance.post(`/api/users/login`, userData);
                console.log("data :", data);
                if (data?.success) {
                    if (!data?.user?.isVerified) {
                        setAuthType("verify-email");
                        // switchView("verify-email");
                        toast.success(data?.message || "OTP sent to your email!");
                    }
                    console.log("data :", data);
                    dispatch(setUser(data?.user));
                    navigate("/");
                    toast.success(data?.message || "Login Successfully!");
                }
            } catch (error) {
                console.log("error :", error);
                switchView("verify-email");
                toast.success(error?.response?.data?.message || "Login failed");
            } finally {
                setIsLoading(false);
            }
        }

        setUserData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            newPassword: "",
            otp: "",
        });
        setIsLoading(false);
    };


    const renderLoginForm = () => (
        <>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Welcome Back
            </h2>
            <p className="text-gray-300 text-center mb-8">
                Sign in to your account to continue.
            </p>

            {/* Email */}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiMail size={20} />
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 
              ${errors.email ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.email}</p>
            </div>

            {/* Password */}
            <div className="mb-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiLock size={20} />
                    </span>
                    <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-800 text-white border rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 
              ${errors.password ? "border-red-500" : "border-gray-700"}`}
                    />

                    {/* Eye toggle */}
                    <span
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-3 text-gray-300 cursor-pointer"
                    >
                        {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                    </span>
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">
                    {errors.password}
                </p>
            </div>

            <div className="flex justify-end mb-6">
                <button
                    type="button"
                    onClick={() => switchView('forgotPassword')}
                    className="text-blue-500 hover:text-blue-400"
                >
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition"
            >
                {isLoading ? "Processing..." : "Login"}
            </button>

            <p className="mt-6 text-center text-gray-400 text-sm">
                Don’t have an account?{" "}
                <button
                    type="button"
                    onClick={() => switchView("register")}
                    className="text-blue-600 hover:text-blue-700"
                >
                    Register now
                </button>
            </p>
        </>
    );
    // ==============================
    //       REGISTER UI
    // ==============================
    const renderRegisterForm = () => (
        <>

            <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Create Account
            </h2>
            <p className="text-gray-300 text-center mb-8">
                Join our platform today.
            </p>

            {/* Username */}
            <div className="mb-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <CiUser size={20} />
                    </span>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={userData.username}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
                  focus:ring-2 focus:ring-indigo-500 
                  ${errors.username ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">
                    {errors.username}
                </p>
            </div>

            {/* Email */}
            <div className="mb-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <CiMail size={20} />
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
                  focus:ring-2 focus:ring-indigo-500 
                  ${errors.email ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">
                    {errors.email}
                </p>
            </div>

            {/* Password */}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <CiLock size={20} />
                    </span>
                    <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder="Password (min 6 characters)"
                        value={userData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-800 text-white border rounded-xl 
                  focus:ring-2 focus:ring-indigo-500 
                  ${errors.password ? "border-red-500" : "border-gray-700"}`}
                    />
                    <span
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-3 text-gray-300 cursor-pointer"
                    >
                        {showPass ? <IoEyeOff /> : <IoEye />}
                    </span>
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">
                    {errors.password}
                </p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-3 rounded-xl hover:scale-105 transition"
            >
                {isLoading ? "Processing..." : "Register"}
            </button>

            <p className="mt-6 text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Log in
                </button>
            </p>
        </>
    );
    //  Forgot Password Form
    const renderVerifyEmailForm = () => (
        <>
            <button
                type="button"
                onClick={() => switchView("login")}
                className="absolute top-2 left-0 text-gray-300 hover:text-white"
            >
                <FiArrowLeft size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Please Verify Email</h2>
            <p className="text-gray-300 text-center mb-8">
                Enter your OTP bellow.
            </p>

            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiLock size={20} />
                    </span>
                    <input
                        type="text"
                        name="otp"
                        placeholder="Your OTP"
                        value={userData.otp}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 
                ${errors.email ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.otp || ""}</p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Processing.." : "Verify Email"}
            </button>
        </>
    );

    //  Forgot Password Form
    const renderForgotPasswordForm = () => (
        <>
            <button
                type="button"
                onClick={() => switchView("login")}
                className="absolute top-2 left-0 text-gray-300 hover:text-white"
            >
                <FiArrowLeft size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Forgot Password</h2>
            <p className="text-gray-300 text-center mb-8">
                Enter your email to receive a password reset link.
            </p>

            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiMail size={20} />
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 
            ${errors.email ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.email || ""}</p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
        </>
    );

    //  Password Change Form
    const renderPasswordChangeForm = () => (
        <>
            <button
                type="button"
                onClick={() => switchView("login")}
                className="absolute top-2 left-0 text-gray-300 hover:text-white"
            >
                <FiArrowLeft size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Change Password</h2>
            <p className="text-gray-300 text-center mb-8">
                Enter your new password below.
            </p>

            {/* New Password */}
            <div className="mb-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiLock size={20} />
                    </span>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password (min 6 characters)"
                        value={userData.newPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 
            ${errors.newPassword ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.newPassword || ""}</p>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiLock size={20} />
                    </span>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 
            ${errors.confirmPassword ? "border-red-500" : "border-gray-700"}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.confirmPassword || ""}</p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Processing..." : "Change Password"}
            </button>
        </>
    );

    const renderTokenError = () => (
        <div className="space-y-4 text-center">
            <div className="text-red-500 text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600">Invalid or Expired Link</h2>
            <p className="text-gray-600">
                This password reset link is invalid or has expired.
            </p>
            <button
                type="button"
                onClick={() => {
                    switchView("forgotPassword");
                }}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
                Request New Reset Link
            </button>
            <button
                type="button"
                onClick={() => switchView("login")}
                className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-50"
            >
                Back to Login
            </button>
        </div>
    );

    const renderForm = () => {
        switch (authType) {
            case "login":
                return renderLoginForm();
            case "register":
                return renderRegisterForm();
            case "verify-email":
                return renderVerifyEmailForm();
            case "forgotPassword":
                return renderForgotPasswordForm();
            case "passwordChange":
                return token ? renderPasswordChangeForm() : renderTokenError();
            default:
                return renderLoginForm();
        }
    };
    return (
        <div className="bg-gray-800  text-white min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans">
            <div className=" w-full max-w-md backdrop-blur-xl  p-8 rounded-3xl shadow-2xl  ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full relative animate-fadeInUp "
                >
                    {/* {authType === "login" ? renderLogin() : renderRegister()} */}
                    {renderForm()}
                </form>
            </div>
        </div>
    )
}

export default Login