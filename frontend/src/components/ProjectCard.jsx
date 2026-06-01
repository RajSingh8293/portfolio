/* eslint-disable react/prop-types */

// import { NavLink } from "react-router-dom"

// const ProjectCard = ({ data }) => {
//     const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQmvZ51fwJLJaS0P8ZRTITiTBCjlbTrlAqA&s'
//     return (
//         <div className="flex justify-center flex-col items-center">
//             <div className="container h-56 overflow-hidden max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
//                 <NavLink to={data.link} target="_blank">
//                     <img className="image rounded-t-lg" src={data?.projectImage} alt="" />
//                 </NavLink>
//                 <div className="p-5 overlay flex flex-col justify-center items-center">
//                     <NavLink to={data.link} target="_blank">
//                         <h5 className="mb-2 text-2xl font-bold text-gray-100 tracking-tight  dark:text-white">{data?.title}</h5>
//                     </NavLink>
//                     <p className="mb-3 font-normal text-gray-100 dark:text-gray-400">{data?.description}</p>
//                     <NavLink to={data.link} target="_blank" className="bg-black inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:text-black text-white  rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                         {data?.btnText}
//                         <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                         </svg>
//                     </NavLink>
//                 </div>
//             </div>
//             <NavLink to={data.link} target="_blank" className="pt-3 text-gray-50 font-semibold">
//                 {data?.caption}
//             </NavLink>
//         </div>


//     )
// }

// export default ProjectCard


// import { NavLink } from "react-router-dom";

// const ProjectCard = ({ data }) => {
//     return (
//         <div className="flex flex-col items-center text-center w-full max-w-sm">

//             <div className="
//                 bg-gray-900 border border-gray-700 
//                 rounded-xl shadow-lg overflow-hidden 
//                 hover:shadow-2xl transition-all duration-300
//                 w-full
//             ">

//                 {/* IMAGE */}
//                 <NavLink to={data.link} target="_blank">
//                     <img
//                         src={data?.projectImage}
//                         alt={data?.title}
//                         className="
//                             w-full h-48 object-cover 
//                             hover:scale-105 transition-transform duration-500
//                         "
//                     />
//                 </NavLink>

//                 {/* CONTENT */}
//                 <div className="p-5">

//                     <NavLink to={data.link} target="_blank">
//                         <h5 className="text-xl font-bold text-white hover:text-green-400 transition-colors duration-300">
//                             {data?.title}
//                         </h5>
//                     </NavLink>

//                     <p className="text-gray-400 text-sm mt-2">
//                         {data?.description}
//                     </p>

//                     {/* BUTTON */}
//                     <NavLink
//                         to={data.link}
//                         target="_blank"
//                         className="
//                             mt-4 inline-flex items-center 
//                             px-4 py-2 text-sm font-medium 
//                             text-black bg-green-400 
//                             rounded-lg shadow-md
//                             hover:bg-white hover:text-black 
//                             transition-all duration-300
//                         "
//                     >
//                         {data?.btnText}
//                         <svg
//                             className="w-4 h-4 ml-2"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 14 10"
//                         >
//                             <path
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M1 5h12m0 0L9 1m4 4L9 9"
//                             />
//                         </svg>
//                     </NavLink>

//                 </div>
//             </div>

//             {/* CAPTION */}
//             <NavLink
//                 to={data.link}
//                 target="_blank"
//                 className="mt-3 text-gray-300 font-semibold hover:text-green-400 transition-colors duration-300"
//             >
//                 {data?.caption}
//             </NavLink>

//         </div>
//     );
// };

// export default ProjectCard;

import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";

const ProjectCard = ({ data, hideEdit = false, openModal }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <div
        className="
      w-full h-full
      bg-gradient-to-b from-gray-900 to-gray-950
      border border-gray-800
      rounded-2xl
      overflow-hidden
      shadow-lg
      hover:shadow-green-500/20

      transition-all duration-300
      flex flex-col
      group
    "
      >
        {/* IMAGE */}
        <NavLink
          to={data.projectLink}
          target="_blank"
          className="
        bg-gray-100
        h-56
        flex items-center justify-center
        overflow-hidden
        p-4
      "
        >
          <img
            src={data?.projectImage}
            alt={data?.title}
            className="
          max-h-full
          object-contain
          group-hover:scale-110
          transition-transform duration-500
        "
          />
        </NavLink>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-6">
          <NavLink to={data.link} target="_blank">
            <h3
              className="
            text-xl font-bold text-white
            hover:text-green-400
            transition-colors
            line-clamp-1
          "
            >
              {data?.title}
            </h3>
          </NavLink>

          <p
            className="
          text-gray-400
          text-sm
          mt-3
          leading-relaxed
          flex-1
          line-clamp-4
        "
          >
            {data?.description}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6">
            <NavLink
              to={data.projectLink}
              target="_blank"
              className="
            flex-1
            flex items-center justify-center gap-2
            bg-green-500
            text-black
            font-semibold
            py-3 px-4
            rounded-xl
            hover:bg-green-400
            transition-all duration-300
          "
            >
              {data?.btnText}
              <FaArrowRightLong />
            </NavLink>

            {hideEdit && (
              <button
                onClick={() => openModal(data)}
                className="
              flex items-center justify-center gap-2
              px-4
              rounded-xl
              border border-gray-700
              text-gray-300
              hover:bg-gray-800
              hover:border-green-500
              transition-all duration-300
            "
              >
                <FiEdit />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CAPTION */}
      <NavLink
        to={data.link}
        target="_blank"
        className="
      mt-4
      text-sm
      font-medium
      text-gray-400
      hover:text-green-400
      transition-colors
    "
      >
        {data?.caption}
      </NavLink>
    </div>
  );
};

export default ProjectCard;

