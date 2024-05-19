import React from 'react'
import frontendImg from '../../assets/frontend-icon.png'
import backendImg from '../../assets/backend-icon.png'
import uiuxImg from '../../assets/ui-ux-icon.png'
import Heading from '../Heading/Heading'
import ServicesCard from './ServicesCard'

const Services = () => {
  return (
    <>
      <div className="services text-center lg:px-10 md:px-10 px-8 py-10 mt-4 lg:w-[80%] md:w-[100%] w-[100%] mx-auto bg-#333333">
        <div className="heading ">
          <Heading heading="Our" span="Services" />
        </div>

        {/* <div className="cards mt-10 w-full flex justify-center gap-6"> */}
        <div className="relative cards mt-10 grid w-full gap-4 justify-center lg:grid-cols-3 md:grid-cols-3 md:gap-4 sm:grid-cols-2 grid-cols-1">
          <div className="anim card_1">
            <ServicesCard
              Image={frontendImg}
              heading="Frontend Developer"
              text="I am using for frontend HTML, CSS, Javascript, and Reactjs"
            />
          </div>
          <div className="anim card_2">
            <ServicesCard
              Image={backendImg}
              heading="Backend Developer"
              text="For backend I am using Nodejs, Expressjs, Database MongoDB"
            />
          </div>
          <div className="anim card_3">
            <ServicesCard
              Image={uiuxImg}
              heading="UI/UX Developer"
              text="For UI/UX I am using Figma, Canva"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
