import React from 'react'
import About from '../components/About/About'

const AboutPage = () => {
  return (
    <section>
      <div className="bg-gray-800 flex justify-center items-center h-[50vh] lg:h-[70vh] md:h-[70vh] sm:h-[70vh]">
        <h1 className="text-white text-4xl font-bold">#about me</h1>
        {/* <Heading heading="about me" span="#" /> */}
      </div>
      <div className="py-24">
        <About />
      </div>
    </section>
  )
}

export default AboutPage
