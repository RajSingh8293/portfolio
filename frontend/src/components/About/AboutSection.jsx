/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import Heading from "../Heading/Heading"
import { useEffect } from "react"
import { getAboutSectionData } from "../../redux/slices/aboutSlice"
// import img from '../../assets/rajprofilepic.png'

const AboutSection = () => {
    const { aboutSectionData } = useSelector(state => state.aboutSectionData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAboutSectionData())
    }, [dispatch])
    return (
        <section className="">
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 items-center lg:py-0'>
                <div className='col-span-1 w-full flex justify-center items-center mt-5 lg:mt-0 md:mt-0 '>
                    <img
                        src={aboutSectionData?.aboutImage}
                        alt=""
                        className='max-w-64 w-full overflow-hidden rounded-full border-2 border-green-400 md:text-center  shadow-green-200'
                    />
                    {/* <img
                        src={img}
                        alt=""
                        className='max-w-64 w-full overflow-hidden rounded-full border-2 border-green-400 md:text-center  shadow-green-200'
                    /> */}
                </div>

                <div className="col-span-2 lg:px-5  about-content">
                    <Heading heading="About" span="Me" />
                    <h2 className="anim sm:text-xl lg:text-2xl text-gray-100  md:text-2xl text-xl my-4 ">
                        {aboutSectionData?.title}
                    </h2>
                    <p className=" text-gray-100 font-semibold ">
                        {aboutSectionData?.description}
                    </p>
                </div>

            </div>
        </section>
    )
}

export default AboutSection