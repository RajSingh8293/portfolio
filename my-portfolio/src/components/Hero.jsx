import React from 'react'
import image from '../assets/rajprofilepic.png'
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoLinkedin,
  BiLogoInstagramAlt,
} from 'react-icons/bi'

const Hero = () => {
  return (
    <div className="px-8 py-24 lg:py-0 md:py-0 sm:py-0 hero flex md:flex items-center lg:flex lg:items-center  sm:flex sm:items-center h-[80vh] md:h-[90vh] lg:h-[100vh] sm:h-[80vh] lg:justify-between text-white lg:pt-24 sm:pt-24">
      <div className=" content lg:order-1 ">
        <div>
          <h2 className="anim  lg:text-4xl md:text-4xl sm:text-3xl text-3xl font-bold">
            Hii there, It's
            <span className="text-green-400 "> Me</span>
          </h2>
          <h1 className="anim  lg:text-5xl md:text-5xl sm:text-4xl text-3xl my-4 font-bold">
            Harvans Singh ( Raj )
          </h1>
          <p className="anim  text-md  ">
            I am Harvans Singh (Raj) From Delhi, A newly web developer & Website
            Designer.
          </p>
        </div>

        <div className="flex flex-wrap lg:pt-8 md:pt-8 sm:pt-5 pt-5  lg:flex gap-5 lg:gap-10 md:gap-8  items-center">
          <div className="social-media flex gap-2">
            <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
              <BiLogoFacebook className="text-xl text-green-400" />
            </button>
            <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
              <BiLogoTwitter className="text-xl text-green-400" />
            </button>
            <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
              <BiLogoLinkedin className="text-xl text-green-400" />
            </button>
            <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
              <BiLogoInstagramAlt className="text-xl text-green-400" />
            </button>
          </div>

          <div className="contact-me">
            <button className="anim btn contact-btn bg-green-400 px-10 py-2 rounded">
              Contact me
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block hero-img anim lg:order-2 rounded-full overflow-hidden">
        <img className="" src={image} alt="profile-image" />
      </div>
    </div>
  )
}

export default Hero
