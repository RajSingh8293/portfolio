
// const webSitesArray = [
//     {
//         id: 1,
//         title: "Job Portal Web 2024",
//         desc: "This is a Job Portal Website using Reactjs, Nodejs and MongoDb",
//         link: "https://jobpostwebportal-frontedn.vercel.app",
//         jobPortaiImage: img_1,
//         heading: "Job Portal Web "

//     },
//     {
//         id: 2,
//         title: "Clothing E-commerce 2024",
//         desc: "This is a clothing E-commerce website using Reactjs, Nodejs and MongoDb",
//         link: "https://ecommerce-web-frontend-lilac.vercel.app",
//         jobPortaiImage: img_2,
//         heading: "E-commerce Web"

//     },
//     {
//         id: 3,
//         title: "Electronics E-commerce Website 2024",
//         desc: "This is a electronics E-commerce Website using Reactjs, Nodejs and MongoDb",
//         link: "https://electronic-frontend.vercel.app/",
//         jobPortaiImage: img_3,
//         heading: "Electronics E-commerce Website"

//     },
//     {
//         id: 4,
//         title: "Amazon E-commerce Website 2025",
//         desc: "This is a Amazon E-commerce Website using NextJs and MongoDb",
//         link: "https://nextjs-project-two-rose.vercel.app/",
//         jobPortaiImage: img_4,
//         heading: "Amazon E-commerce Website"

//     },
// ]

import Heading from "./Heading/Heading"
import ProjectCard from "./ProjectCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllProjects } from "../redux/slices/projectSlice"


const Projects = () => {


    const { projects } = useSelector(state => state.projects)

    const diapatch = useDispatch()
    useEffect(() => {
        diapatch(getAllProjects())
    }, [diapatch])
    return (
        <div><div className='px-10 py-16 text-center '>
            <div className='pb-4'>
                <Heading span="Projects" heading="My" />
            </div>
            <div className='w-full mx-auto grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 pt-5'>
                {projects?.map((data) => <ProjectCard key={data._id} data={data} />
                )
                }

            </div>
        </div></div>
    )
}

export default Projects