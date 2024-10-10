
import { FaGithub } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { CiMail } from 'react-icons/ci'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    setLoading(true)
    const userInfo = {
      access_key: "935e65c2-9a4a-4e45-886b-5d8c9b4e5e38",
      name: data.name,
      email: data.email,
      message: data.message,
    }

    try {
      const { data } = await axios.post('https://api.web3forms.com/submit', userInfo)
      if (data) {
        toast.success("Message sent successfull")
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[80vh] py-24 lg:px-10 md:px-10 px-8">
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
              <NavLink to="https://mail.google.com/mail/u/0/#inbox" target='_blank'>
                singhraj@gmail.com
              </NavLink>
            </span>
          </div>
          <div className="flex items-center gap-8 ">
            <span>
              <FaGithub className="w-[30px] h-[30px]" />
            </span>
            <span>
              <NavLink to="https://github.com/RajSingh8293" target='_blank'>
                https://github.com/RajSingh8293
              </NavLink>
            </span>
          </div>
        </div>
        <div className="w-[100%] md:w-[100%]  lg:w-[100%] sm:w-[100%]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
            <div className="input-field w-[100%] h-[20px]">
              <input
                className="h-[100%] w-[100%] p-4 rounded bg-slate-700 border-2 border-color-#fff outline-none"
                type="text"
                placeholder="Your Name"
                name="name"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && <span className="text-xs text-red-600">Name field is required</span>}
            <div className="input-field w-[100%] h-[20px]">
              <input
                className="h-[100%] w-[100%] p-4 rounded  bg-slate-700 border-2 border-color-#fff outline-none"
                type="email"
                placeholder="Your Email"
                name="email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && <span className="text-xs text-red-600">Email field is required</span>}
            <div className="input-field w-[100%]">
              <textarea
                id=""
                cols="30"
                rows="6"
                placeholder="Your Message"
                className="rounded p-4 w-[100%] bg-slate-700 border-2 border-color-#fff outline-none"
                name="message"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <span className="text-xs text-red-600">Message field is required</span>}
            </div>
            <div className="text-left">
              <button
                type="submit"
                className="bg-green-400 py-2 px-3 w-[200px] btn rounded hover:bg-green-500 text-white"
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
