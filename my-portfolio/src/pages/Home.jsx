import Hero from '../components/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Contact from '../components/Contact/Contact'
import Projects from '../components/Projects'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])
  return (
    <section className="">
      <Hero />
      <About />
      <div className=''>
        <Projects />
        <div className='w-full items-center flex justify-center flex-col'>
          <button className='btn bg-black py-2 rounded hover:bg-gray-950  px-5 text-white'>
            <Link to='/projects'>See more...</Link>
          </button>
        </div>
      </div>
      <Services />
      <Contact />
    </section>
  )
}

export default Home
