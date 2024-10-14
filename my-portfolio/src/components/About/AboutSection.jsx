import Heading from "../Heading/Heading"
import img from '../../assets/rajprofilepic.png'

const AboutSection = () => {
    return (
        <section className="">
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 items-center lg:py-0'>
                <div className='col-span-1 w-full flex justify-center items-center mt-5 lg:mt-0 md:mt-0 '>
                    <img
                        src={img}
                        alt=""
                        className='max-w-64 w-full overflow-hidden rounded-full border-2 border-green-400 md:text-center  shadow-green-200'
                    />
                </div>

                <div className="col-span-2 lg:px-5  about-content">
                    <Heading heading="About" span="Me" />
                    <h2 className="anim sm:text-xl lg:text-2xl text-gray-100  md:text-2xl text-xl my-4 ">
                        Fronted Developer
                    </h2>
                    <p className=" text-gray-100 font-semibold ">
                        Hii, I am Harvans Singh (Raj) From Delhi in India. I have done my Bachelor of Computer Applications  (BCA) graduation at St. Andrews Institute of Technology & Management in Gurugram in Haryana. I am a passionate web developer with a strong foundation in both front-end and back-end technologies. My journey into web development began with a curiosity about how websites are built, and it quickly evolved into a career where I get to create dynamic and user-friendly web applications.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default AboutSection