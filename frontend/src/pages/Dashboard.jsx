

import React, { useRef, useState, useEffect } from "react";
import HeroEditor from "../components/dashboard/HeroEditor";
import AboutEditor from "../components/dashboard/AboutEditor";
import ContactEditor from "../components/dashboard/ContactEditor";
import { NavLink } from "react-router-dom";
import CreateProject from "../components/dashboard/CreateProject";
import Projects from "../components/dashboard/Projects";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("hero");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const [openProfile, setOpenProfile] = useState(false);
    const mobileAvatarRef = useRef(null);
    const mobileProfileRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    console.log("sidebarOpen :", sidebarOpen);


    // const showSidebar = () => setSidebarOpen(!sidebarOpen);
    // Close sidebar when clicking outside
    useEffect(() => {
        const closeSidebarOnOutsideClick = (e) => {
            if (sidebarOpen && !e.target.closest(".sidebar")) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("click", closeSidebarOnOutsideClick);
        return () => document.removeEventListener("click", closeSidebarOnOutsideClick);
    }, [sidebarOpen]);

    return (
        <div className="min-h-screen  w-full text-white flex relative">

            {/* ================= MOBILE HEADER ================= */}
            <div className="lg:hidden w-full bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700 fixed top-0 left-0 z-40">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSidebarOpen(true);
                    }}
                >
                    <FiMenu className="text-3xl text-white" />
                </button>
                {activeTab === "projects" ? (
                    <h2 className="text-xl font-semibold">All Projects</h2>
                ) : (
                    <h2 className="text-xl font-semibold capitalize">Edit {activeTab} Section</h2>
                )}

                {/* PROFILE */}
                <div className="relative">
                    {user ? (
                        <>
                            <div
                                ref={mobileAvatarRef}
                                onClick={() => setOpenProfile(!openProfile)}
                                className="w-10 h-10 rounded-full cursor-pointer"
                            >
                                <img
                                    src={
                                        user?.profileImage ||
                                        user?.avatar ||
                                        `https://placehold.co/150x150/000000/FFFFFF?text=${user?.username?.charAt(0).toUpperCase()}`
                                    }
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-2 border-gray-800"
                                />
                            </div>

                            {openProfile && (
                                <div
                                    ref={mobileProfileRef}
                                    className="absolute right-0 top-12 w-40 bg-gray-300 rounded-md p-3 z-50 shadow-lg"
                                >
                                    <p className="text-sm px-2 py-1 text-gray-700">
                                        Hello, <span className="font-semibold">{user?.username}</span>
                                    </p>

                                    <NavLink
                                        to="/profile"
                                        onClick={() => setOpenProfile(false)}
                                        className="block px-3 py-2 text-white bg-gray-900 rounded-md text-sm hover:bg-gray-700"
                                    >
                                        Profile
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setOpenProfile(false)}
                                        className="block px-3 py-2 text-white bg-gray-900 rounded-md text-sm hover:bg-gray-700 mt-1"
                                    >
                                        Dashboard
                                    </NavLink>

                                    <button
                                        onClick={() => dispatch(logoutUser())}
                                        className="w-full text-left px-3 py-2 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-700 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                </div>
            </div>

            {/* ================= OVERLAY (Mobile) ================= */}
            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>
            )}

            {/* ================= SIDEBAR ================= */}
            <div
                className={`
        sidebar
        fixed lg:sticky lg:h-screen top-0 left-0 h-full w-64 bg-gray-800 p-6 border-r border-gray-700
        z-40 transition-transform duration-300
        lg:translate-x-0   
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button (Mobile Only) */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden absolute top-4 right-4 text-2xl"
                >
                    <IoClose />
                </button>

                <NavLink to="/" className="text-xl font-bold block mb-6">
                    Dashboard
                </NavLink>

                <ul className="space-y-3 mt-8">
                    {[
                        { id: "hero", label: "Hero Section" },
                        { id: "about", label: "About Section" },
                        { id: "contact", label: "Contact Section" },
                        { id: "create-project", label: "Create Project" },
                        { id: "projects", label: "All Projects" },
                    ].map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 rounded ${activeTab === item.id
                                    ? "bg-purple-600"
                                    : "hover:bg-gray-700"
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>


            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-1 pt-20 lg:pt-0">
                <div className="lg:flex px-10 py-4 hidden justify-between items-center  border-b border-gray-700">

                    {activeTab === "projects" ? (
                        <h2 className="text-2xl font-semibold">All Projects</h2>
                    ) : (
                        <h2 className="text-2xl font-semibold capitalize">Edit {activeTab} Section</h2>
                    )}

                    {/* PROFILE */}
                    <div className="relative">
                        {user ? (
                            <>
                                <div
                                    ref={mobileAvatarRef}
                                    onClick={() => setOpenProfile(!openProfile)}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                >
                                    <img
                                        src={
                                            user?.profileImage ||
                                            user?.avatar ||
                                            `https://placehold.co/150x150/000000/FFFFFF?text=${user?.username?.charAt(0).toUpperCase()}`
                                        }
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover border-2 border-gray-800"
                                    />
                                </div>

                                {openProfile && (
                                    <div
                                        ref={mobileProfileRef}
                                        className="absolute right-0 top-12 w-40 bg-gray-300 rounded-md p-3 z-50 shadow-lg"
                                    >
                                        <p className="text-sm px-2 py-1 text-gray-700">
                                            Hello, <span className="font-semibold">{user?.username}</span>
                                        </p>

                                        <NavLink
                                            to="/profile"
                                            onClick={() => setOpenProfile(false)}
                                            className="block px-3 py-2 text-white bg-gray-900 rounded-md text-sm hover:bg-gray-700"
                                        >
                                            Profile
                                        </NavLink>

                                        <NavLink
                                            to="/dashboard"
                                            onClick={() => setOpenProfile(false)}
                                            className="block px-3 py-2 text-white bg-gray-900 rounded-md text-sm hover:bg-gray-700 mt-1"
                                        >
                                            Dashboard
                                        </NavLink>

                                        <button
                                            onClick={() => dispatch(logoutUser())}
                                            className="w-full text-left px-3 py-2 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-700 text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </div>
                </div>

                <div className="p-10">
                    {activeTab === "hero" && <HeroEditor />}
                    {activeTab === "about" && <AboutEditor />}
                    {activeTab === "contact" && <ContactEditor />}
                    {activeTab === "create-project" && <CreateProject />}
                    {activeTab === "projects" && <Projects />}
                </div>
            </div>
        </div >
    );
};

export default Dashboard;

