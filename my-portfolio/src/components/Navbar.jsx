import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { CgMenuRightAlt } from 'react-icons/cg'

const Navbar = () => {
  const [showmenu, setShowmenu] = useState(false)

  const showBtn = () => {
    setShowmenu(!showmenu)
  }
  return (
    <div className="relative bg-navbar z-50">
      <div className="header w-[100%] mt-3 fixed">
        <div className="row inset-y-0 m-auto lg:px-10 md:px-10 px-8 md:mx-0 md:rounded-none  py-3 lg:mx-10 navbar w-100 flex items-center justify-between text-white gap-10 bg-slate-600 transparent lg:rounded-xl ">
          <div className="logo">
            <NavLink to="/" className="text-3xl font-bold">
              PortFolio
            </NavLink>
          </div>

          <div className="lg:hidden">
            <span>
              <CgMenuRightAlt onClick={showBtn} className="text-2xl" />
            </span>
          </div>

          <div className="nav hidden mr-auto sm:hidden lg:block">
            <ul className="nav-links navLinks flex gap-10">
              <li className="links ">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="links">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="links">
                <NavLink to="/projects">Projects</NavLink>
              </li>
              <li className="links">
                <NavLink to="/skills">Skills</NavLink>
              </li>
            </ul>
          </div>

          <div className="login  hidden lg:flex gap-6  flex-wrap md:hidden sm:hidden">
            <NavLink
              to="/login"
              className="btn bg-gray-400 py-1 rounded hover:bg-slate-500"
            >
              <button className="btn   px-4 py-1 rounded">Login</button>
            </NavLink>
            <NavLink
              to="/contact"
              className="btn bg-green-400 py-1 rounded hover:bg-green-500"
            >
              <button className="btn   px-4 py-1 rounded">Contact</button>
            </NavLink>
          </div>
        </div>
      </div>

      {showmenu && (
        <div className="">
          {/* <div className="toggleNav "> */}
          <ul
            className={`toggleNav z-20 ${showmenu && 'menuWidth'
              } nav-links navLinks flex flex-col gap-10 absoluet fixed  lg:p-8 md:p-8 p-5 bg-white h-[100vh] top-0 right-0 nav `}
          // className="nav-links navLinks ``
          >
            <li className="links">
              <RxCross2 onClick={showBtn} className="text-2xl" />
            </li>
            <li className="links active" onClick={showBtn}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="links" onClick={showBtn}>
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="links" onClick={showBtn}>
              <NavLink to="/skills">Skills</NavLink>
            </li>

            <li className="links" onClick={showBtn}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <div className="border-y-2 py-5">
              <li className="links" onClick={showBtn}>
                <NavLink to="/login">Login</NavLink>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
