import Heading from "./Heading/Heading"
import ProjectCard from "./ProjectCard"
import img_1 from '../assets/job_portal.png'
import img_2 from '../assets/e_commerce.png'


const Projects = () => {
    const webSitesArray = [
        {
            id: 1,
            title: "Job Portal Web 2024",
            desc: "This is a Job Portal Website using Reactjs, Nodejs and MongoDb",
            link: "https://jobpostwebportal-frontedn.vercel.app",
            jobPortaiImage: img_1,
            heading: "Job Portal Web "

        },
        {
            id: 2,
            title: "Clothing E-commerce 2024",
            desc: "This is a clothing E-commerce website using Reactjs, Nodejs and MongoDb",
            link: "https://ecommerce-web-frontend-lilac.vercel.app",
            jobPortaiImage: img_2,
            heading: "E-commerce Web"

        },
    ]
    return (
        <div><div className='px-10 py-16 text-center'>
            <div className='pb-4'>
                <Heading span="Projects" heading="My" />
            </div>
            <div className='w-full mx-auto grid lg:grid-cols-3 justify-self-center md:grid-cols-2 grid-cols-1 gap-5 pt-5'>
                {webSitesArray?.slice(0, 3)?.map((data) => <ProjectCard key={data.id} data={data} />
                )
                }

            </div>
        </div></div>
    )
}

export default Projects