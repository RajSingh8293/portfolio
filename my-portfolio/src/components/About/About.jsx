import React from 'react'
import Heading from '../Heading/Heading'
import img from '../../assets/rajprofilepic.png'

const About = () => {
  return (
    <div className=" ">
      <div className="home_about lg:px-10 md:px-10 px-8 lg:mt-0 lg:bg-slate-600 about_section md:mt-10 col about flex items-center justify-between w-[100%] lg:gap-10 md:gap-5  text-white">
        <div className="about_image_section row lg:w-[40%] md:w-[40%]   flex justify-center items-center  my-10 lg:mr-4 md:mb-4 ">
          <div className="hidden anim  about-img w-[100%] lg:flex md:flex justify-center items-center  ">
            <img
              src={img}
              alt=""
              className=" overflow-hidden rounded-full border-2 border-green-400 md:text-center  shadow-green-200 lg:w-[60%] sm:w-[70%] md:w-[70%]"
            />
          </div>
        </div>

        <div className="row about_content_section lg:w-[60%] md:w-[60%]  ">
          <div className="about-content">
            <Heading heading="About" span="Me" />
            <h2 className="anim sm:text-xl lg:text-3xl  md:text-3xl my-4 ">
              Fronted Developer
            </h2>
            <p className="anim sm:text-sm flex flex-wrap">
              Hii, I am Harvans Singh (Raj) From Delhi, A newly web developer &
              Website Designer. I am a passionate Web developer. I love
              designing, coding, and learning new things. I can consistently
              achieve better results.The abilty to perform to repeated tasks
              with high deegree of accuracy. I am flexible, reliable and possess
              excellent time keeping skills. I am an enthusiastic,
              self-motivated, reliable, responsible and hard working person. I
              am a mature team worker and adaptable to all challenging
              situations. I am able to work well both in a team environment a
              well as using own initiative.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
