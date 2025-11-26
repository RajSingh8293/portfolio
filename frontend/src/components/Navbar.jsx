import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { CgMenuRightAlt } from 'react-icons/cg'
// import Modal from './Modal'
import Button from './Button'
// import { useModal } from '../hooks/useModal'
// import AuthForm from './AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/slices/userSlice'

const Navbar = () => {

  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);

  const [showmenu, setShowmenu] = useState(false);
  // const { isOpen, openModal, closeModal } = useModal();
  // const [authType, setAuthType] = useState('login');
  const menuRef = useRef();
  // const avatarRef = useRef();
  // const profileRef = useRef();
  const desktopAvatarRef = useRef();
  const desktopProfileRef = useRef();

  const mobileAvatarRef = useRef();
  const mobileProfileRef = useRef();


  const { user } = useSelector(state => state.user);

  const showBtn = () => setShowmenu(!showmenu);






  return (
    // <div className="relative bg-navbar z-50">
    <div className="bg-navbar z-50 sticky top-0 w-full">
      <div className="header w-full mt-3 sticky top-0 ">
        <div className="row inset-y-0 m-auto lg:px-10 md:px-10 px-8 md:mx-0 py-3 lg:mx-10 navbar flex items-center justify-between text-white bg-slate-600 lg:rounded-xl">

          {/* Logo */}
          <NavLink to="/" className="text-3xl font-bold">PortFolio</NavLink>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <CgMenuRightAlt onClick={showBtn} className="text-2xl cursor-pointer" />
          </div>

          {/* Desktop Nav Links */}
          <div className="nav hidden mr-auto lg:block ml-10">
            <ul className="nav-links flex gap-10">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/projects">Projects</NavLink></li>
              <li><NavLink to="/skills">Skills</NavLink></li>
            </ul>
          </div>

          {/* Desktop Login/Profile */}
          <div className="login hidden lg:flex items-center gap-6 relative" ref={menuRef}>

            {user ? (
              <>
                {/* Profile Image */}
                <div
                  ref={desktopAvatarRef}
                  onClick={() => setOpenProfile(!openProfile)}
                  className="w-10 h-10 relative rounded-full cursor-pointer"
                >
                  <img
                    src={
                      user?.profileImage ||
                      user?.avatar ||
                      `https://placehold.co/150x150/000000/FFFFFF?text=${user?.username?.charAt(0).toUpperCase()}`
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-900"
                  />
                </div>

                {/* Profile Popup */}
                {openProfile && (
                  <div ref={desktopProfileRef} className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-md p-3 animate-dropdown z-50 flex flex-col gap-2">
                    <p className="text-sm px-2 py-1 text-gray-600">
                      Hello, <span className="font-semibold">{user?.username}</span>
                    </p>

                    <NavLink
                      to="/profile"
                      className="block px-3 py-2 hover:bg-gray-700 bg-gray-900 rounded-md text-sm"
                      onClick={() => setOpenProfile(false)}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard"
                      className="block px-3 py-2 hover:bg-gray-700 bg-gray-900 rounded-md text-sm"
                      onClick={() => setOpenProfile(false)}
                    >
                      Dashboard
                    </NavLink>

                    <button
                      onClick={() => dispatch(logoutUser())}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-700 bg-gray-900 rounded-md text-sm text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink to="/login"
                className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md">
                Login
              </NavLink>
            )}

            <Button className="hover:bg-gray-700 bg-gray-800">
              <NavLink to="/contact">Contact</NavLink>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Background Overlay */}
      {showmenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setShowmenu(false)}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      <ul
        className={`fixed top-0 right-0 h-screen w-64 bg-white z-50 flex flex-col gap-10 p-6 shadow-xl transition-transform duration-300 
          ${showmenu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <RxCross2 onClick={showBtn} className="text-2xl cursor-pointer" />

        <NavLink to="/" onClick={showBtn}>Home</NavLink>
        <NavLink to="/about" onClick={showBtn}>About</NavLink>
        <NavLink to="/projects" onClick={showBtn}>Projects</NavLink>
        <NavLink to="/skills" onClick={showBtn}>Skills</NavLink>
        <NavLink to="/contact" onClick={showBtn}>Contact</NavLink>

        <div className="border-y py-5 relative" ref={menuRef}>
          {
            user ? <>
              {/* Profile Image */}
              <div
                ref={mobileAvatarRef}
                onClick={() => setOpenProfile(!openProfile)}
                className="w-10 h-10 relative rounded-full cursor-pointer "
              >
                <img
                  src={
                    user?.profileImage ||
                    user?.avatar ||
                    `https://placehold.co/150x150/000000/FFFFFF?text=${user?.username?.charAt(0).toUpperCase()}`
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-gray-900"
                />
              </div>

              {/* Profile Popup */}
              {openProfile && (
                <div ref={mobileProfileRef} className="absolute right-0 top-12 w-40 bg-gray-300 shadow-lg rounded-md p-3 animate-dropdown z-50 flex flex-col gap-2">
                  <p className="text-sm px-2 py-1 text-gray-600">
                    Hello, <span className="font-semibold">{user?.username}</span>
                  </p>

                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 text-white hover:bg-gray-700 bg-gray-900 rounded-md text-sm"
                    onClick={() => setOpenProfile(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className="block px-3 py-2 text-white hover:bg-gray-700 bg-gray-900 rounded-md text-sm"
                    onClick={() => setOpenProfile(false)}
                  >
                    Dashboard
                  </NavLink>

                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="block w-full text-left px-3 py-2 mt-2 hover:bg-gray-700 bg-gray-900 rounded-md text-sm text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>

              :
              <NavLink to="/login" >
                Login
              </NavLink>}
        </div>
      </ul>

      {/* Auth Modal */}
      {/* <Modal isOpen={isOpen} onClose={closeModal}>
        <AuthForm authType={authType} closeModal={closeModal} setAuthType={setAuthType} token={token} />
      </Modal> */}
    </div>
  );
};

export default Navbar;
