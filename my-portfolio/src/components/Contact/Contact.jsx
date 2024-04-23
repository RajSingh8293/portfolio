import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { CiMail } from 'react-icons/ci'

const Contact = () => {
  return (
    <section className="min-h-[80vh] py-24 px-10">
      <h1 className="text-3xl text-white font-bold">
        Get In <span className="text-green-500">Touch</span>
      </h1>
      <div className="lg:flex ">
        <div className="flex w-[100%] py-8  text-white flex-col gap-6 rounded">
          <div className="flex items-center gap-8 ">
            <span>
              <FaLocationDot className="w-[30px] h-[30px]" />
            </span>
            <span>
              <p>Delhi, India</p>
            </span>
          </div>
          <div className="flex items-center gap-8 ">
            <span>
              <CiMail className="w-[30px] h-[30px]" />
            </span>
            <span>
              <NavLink to="https://mail.google.com/mail/u/0/#inbox">
                singhraj@gmail.com
              </NavLink>
            </span>
          </div>
          <div className="flex items-center gap-8 ">
            <span>
              <FaGithub className="w-[30px] h-[30px]" />
            </span>
            <span>
              <NavLink to="https://github.com/RajSingh8293">
                https://github.com/RajSingh8293
              </NavLink>
            </span>
          </div>
        </div>
        <div className="w-[100%] md:w-[100%]  lg:w-[100%] sm:w-[100%]">
          <form className="flex flex-col gap-6 ">
            <div className="input-field w-[100%] h-[20px]">
              <input
                className="h-[100%] w-[100%] p-4 rounded bg-slate-700 border-2 border-color-#fff outline-none"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="input-field w-[100%] h-[20px]">
              <input
                className="h-[100%] w-[100%] p-4 rounded  bg-slate-700 border-2 border-color-#fff outline-none"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className="input-field w-[100%]">
              <textarea
                name=""
                id=""
                cols="30"
                rows="6"
                placeholder="Your Message"
                className="rounded p-4 w-[100%] bg-slate-700 border-2 border-color-#fff outline-none"
              ></textarea>
            </div>
            <div className="text-left">
              <button
                type="submit"
                className="bg-green-400 py-2 px-3 w-[200px] rounded font-black text-black"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
