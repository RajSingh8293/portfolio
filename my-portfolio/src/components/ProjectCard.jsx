/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom"

const ProjectCard = ({ data }) => {
    const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQmvZ51fwJLJaS0P8ZRTITiTBCjlbTrlAqA&s'
    return (
        <div className="flex justify-center flex-col items-center">
            <div className="container h-56 overflow-hidden max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <NavLink to={data.link} target="_blank">
                    <img className="image rounded-t-lg" src={data.jobPortaiImage ? data.jobPortaiImage : image} alt="" />
                </NavLink>
                <div className="p-5 overlay flex flex-col justify-center items-center">
                    <NavLink to={data.link} target="_blank">
                        <h5 className="mb-2 text-2xl font-bold text-gray-100 tracking-tight  dark:text-white">{data.title}</h5>
                    </NavLink>
                    <p className="mb-3 font-normal text-gray-100 dark:text-gray-400">{data.desc}</p>
                    <NavLink to={data.link} target="_blank" className="bg-black inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:text-black text-white  rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Live preview
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </NavLink>
                </div>
            </div>
            <NavLink to={data.link} target="_blank" className="pt-3 text-gray-50 font-semibold">
                {data.heading}
            </NavLink>
        </div>


    )
}

export default ProjectCard