
import About from '../components/About/About'
import Heading from '../components/Heading/Heading'
import ProjectCard from '../components/ProjectCard'

const AboutPage = () => {

  const webSitesArray = [
    {
      id: 1,
      title: "Job Portal Web 2024",
      desc: "This is a Job Portal Website using Reactjs, Nodejs and MongoDb",
      link: "https://jobpostwebportal-frontedn.vercel.app",
      jobPortaiImage: "/src/assets/job_portal.png",
      heading: "Job Portal Web"

    },
    {
      id: 2,
      title: "Clothing E-commerce 2024",
      desc: "This is a clothing E-commerce website using Reactjs, Nodejs and MongoDb",
      link: "https://ecommerce-web-frontend-lilac.vercel.app",
      jobPortaiImage: "/src/assets/e_commerce.png",
      heading: "E-commerce Web"

    },
  ]
  return (
    <section>
      <div className="bg-gray-800 flex justify-center items-center h-[50vh] lg:h-[70vh] md:h-[70vh] sm:h-[70vh]">
        <h1 className="text-white text-4xl font-bold">#about me</h1>
        {/* <Heading heading="about me" span="#" /> */}
      </div>
      <div className="">
        <About />
      </div>

      <div className='px-10 py-16 text-center'>
        <div className='pb-4'>
          <Heading span="Projects" heading="My" />
        </div>
        <div className='w-full mx-auto grid lg:grid-cols-3 justify-self-center md:grid-cols-2 grid-cols-1 gap-5 pt-5'>
          {webSitesArray?.map((data) => <ProjectCard key={data.id} data={data} />
          )
          }

        </div>
      </div>
    </section>
  )
}

export default AboutPage
