import React from 'react'
import About from '../components/About/About'

const AboutPage = () => {
  return (
    <section>
      <div className="bg-gray-800 flex justify-center items-center min-h-[70vh]">
        <h1 className="text-white text-4xl font-bold">#about me</h1>
        {/* <Heading heading="about me" span="#" /> */}
      </div>
      <div>
        <About />
      </div>
    </section>
  )
}

export default AboutPage
