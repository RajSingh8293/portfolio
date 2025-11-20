// import { useEffect } from 'react'
// // import image from '../assets/rajprofilepic.png'
// import {
//   BiLogoFacebook,
//   BiLogoTwitter,
//   BiLogoLinkedin,
//   BiLogoInstagramAlt,
// } from 'react-icons/bi'
// import { getHeroSectionData } from '../redux/slices/heroSlice'
// import { useDispatch, useSelector } from 'react-redux'

// const Hero = () => {
//   const { heroSectionData } = useSelector(state => state.heroSectionData)
//   const dispatch = useDispatch()
//   console.log("heroSectionData :", heroSectionData);

//   useEffect(() => {
//     dispatch(getHeroSectionData())
//   }, [dispatch])
//   return (
//     <div className="px-8 py-24 lg:py-0 md:py-0 sm:py-0 hero flex md:flex items-center lg:flex lg:items-center md:items-center  sm:flex sm:items-center h-[80vh] md:h-[90vh] lg:h-[100vh] sm:h-[80vh] lg:justify-between text-white lg:pt-24 sm:pt-24">
//       <div className=" content lg:order-1 ">
//         <div>
//           <h2 className="anim  lg:text-4xl md:text-4xl sm:text-3xl text-3xl font-bold">
//             Hii there, {`It's`}
//             <span className="text-green-400 "> Me</span>
//           </h2>
//           <h1 className="anim  lg:text-5xl md:text-5xl sm:text-4xl text-3xl my-4 font-bold">
//             {/* Harvans Singh ( Raj ) */}
//             {heroSectionData?.username}
//           </h1>
//           <p className="anim  text-md  ">
//             {heroSectionData?.description}
//           </p>
//         </div>

//         <div className="flex flex-wrap lg:pt-8 md:pt-8 sm:pt-5 pt-5  lg:flex gap-5 lg:gap-10 md:gap-8  items-center">
//           <div className="social-media flex gap-2">
//             <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
//               <BiLogoFacebook className="text-xl text-green-400" />
//             </button>
//             <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
//               <BiLogoTwitter className="text-xl text-green-400" />
//             </button>
//             <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
//               <BiLogoLinkedin className="text-xl text-green-400" />
//             </button>
//             <button className="anim btn border-green-400 border-2  px-2 rounded-full p-2">
//               <BiLogoInstagramAlt className="text-xl text-green-400" />
//             </button>
//           </div>

//           <div className="contact-me">
//             <button className="anim btn contact-btn bg-green-400 px-10 py-2 rounded">
//               Contact me
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="hidden lg:block hero-img anim lg:order-2 rounded-full overflow-hidden">
//         {/* <img className="" src={image} alt="profile-image" /> */}
//         <img className="" src={heroSectionData?.heroImage} alt="profile-image" />
//       </div>
//     </div>
//   )
// }

// export default Hero

import { useEffect } from 'react'
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoLinkedin,
  BiLogoInstagramAlt,
} from 'react-icons/bi'
import { getHeroSectionData } from '../redux/slices/heroSlice'
import { useDispatch, useSelector } from 'react-redux'

const Hero = () => {
  const { heroSectionData } = useSelector(state => state.heroSectionData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHeroSectionData())
  }, [dispatch])

  return (
    <div className="
      hero
      flex flex-col-reverse 
      lg:flex-row lg:justify-between lg:items-center
      text-white
      px-6 sm:px-8 md:px-12 lg:px-20
      py-20 sm:py-24 lg:py-0
      h-auto lg:h-[100vh]
    ">

      {/* CONTENT LEFT */}
      <div className="content w-full lg:w-1/2 text-center lg:text-left">

        <h2 className="anim text-3xl sm:text-4xl font-bold">
          Hii there, {`It's`} <span className="text-green-400">Me</span>
        </h2>

        <h1 className="anim text-3xl sm:text-4xl md:text-5xl font-bold my-4">
          {heroSectionData?.username}
        </h1>

        <p className="anim text-md sm:text-lg leading-relaxed">
          {heroSectionData?.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center  lg:flex-row lg:justify-start  md:justify-center gap-5 pt-6">

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 justify-center lg:justify-start">
            <button className="anim border-2 border-green-400 p-2 rounded-full">
              <BiLogoFacebook className="text-xl text-green-400" />
            </button>
            <button className="anim border-2 border-green-400 p-2 rounded-full">
              <BiLogoTwitter className="text-xl text-green-400" />
            </button>
            <button className="anim border-2 border-green-400 p-2 rounded-full">
              <BiLogoLinkedin className="text-xl text-green-400" />
            </button>
            <button className="anim border-2 border-green-400 p-2 rounded-full">
              <BiLogoInstagramAlt className="text-xl text-green-400" />
            </button>
          </div>

          {/* CONTACT BUTTON */}
          <button className="anim bg-green-400 px-10 py-2 rounded text-black font-semibold mx-auto lg:mx-0">
            Contact me
          </button>

        </div>
      </div>

      {/* IMAGE RIGHT */}
      <div className="hidden lg:flex hero-img anim lg:w-1/2  justify-end">
        <img
          className="rounded-full w-[350px] h-[350px] object-cover"
          src={heroSectionData?.heroImage}
          alt="profile-image"
        />
      </div>
    </div>
  )
}

export default Hero

