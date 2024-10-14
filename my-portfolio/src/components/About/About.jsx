
import AboutSection from './AboutSection'

const About = () => {
  return (
    <div className="lg:py-24 md:py-24 sm:py-12 lg:px-10 md:px-10 px-8">
      <AboutSection />

      <div className="lg:max-w-5xl mx-auto pt-8">
        <div className="pt-8">
          <h1 className="text-2xl text-white font-bold pb-3">My <span className='text-green-400'>Skills</span> </h1>
          <ul className="text-gray-600 flex-col flex gap-3">
            <li className=" "><strong>Front-End </strong>: Proficient in HTML, CSS, and JavaScript frameworks like ReactJs. </li>
            <li className=" "><strong>Back-End </strong>: Experienced with server-side languages such as Node.js, PHP, and comfortable working with databases like MySQL and MongoDB. </li>
            <li className=" "><strong>Version Control: </strong>:  Skilled in using Git for version control and collaboration. </li>
          </ul>
        </div>
        <div className="pt-8">
          <h1 className="text-2xl text-green-400 font-bold pb-3">Projects</h1>
          <p className="text-gray-600 font-semibold">I’ve worked on a variety of projects, ranging from simple personal websites to complex web applications. I enjoy tackling challenges and continually strive to improve my skills through new technologies and methodologies.</p>
        </div>
        <div className="pt-8">
          <h1 className="text-2xl text-green-400 font-bold pb-3">Goals</h1>
          <p className="text-gray-600 font-semibold">My goal is to build innovative and efficient web solutions that solve real-world problems, while also contributing to a collaborative team environment.</p>
        </div>

      </div>
    </div>
  )
}

export default About
