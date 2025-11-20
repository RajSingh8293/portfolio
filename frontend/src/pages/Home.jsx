import Hero from '../components/Hero'
import Services from '../components/Services/Services'
import Contact from '../components/Contact/Contact'
import Projects from '../components/Projects'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import AboutSection from '../components/About/AboutSection'
import Layout from '../Layout'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector(state => state.user)
  console.log("user :", user);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])
  return (
    <Layout>


      <section className="">
        <Hero />
        <div className='lg:py-24 py-16 lg:px-10 px-8'>
          <AboutSection />
        </div>
        <div className='flex flex-col justify-center items-center'>
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
    </Layout>
  )
}

export default Home
