
import { useEffect } from 'react';
import About from '../components/About/About'

const AboutPage = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])
  return (
    <section>
      <div className="bg-gray-800 flex justify-center items-center h-[50vh] lg:h-[70vh] md:h-[70vh] sm:h-[70vh]">
        <h1 className="text-white text-4xl font-bold">#about me</h1>
      </div>
      <div className="">
        <About />
      </div>
    </section>
  )
}

export default AboutPage
