

import { useSelector } from 'react-redux'
import AboutSection from './AboutSection'


const About = () => {
  const { aboutSectionData } = useSelector(state => state.aboutSectionData)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getAboutSectionData())
  // }, [dispatch])



  return (
    <div className="lg:py-24 md:py-24 sm:py-12 lg:px-10 md:px-10 px-8">
      <AboutSection />

      <div className="lg:max-w-5xl mx-auto pt-8">
        <div className="pt-8">
          <h1 className="text-2xl text-white font-bold pb-3">My <span className='text-green-400'>Skills</span> </h1>
          <ul className="text-gray-600 flex-col flex gap-3">
            <li className=" "><strong>Front-End </strong>: {aboutSectionData?.frontendSkills} </li>
            <li className=" "><strong>Back-End </strong>: {aboutSectionData?.backendSkills} </li>
            <li className=" "><strong>Version Control: </strong>:  {aboutSectionData?.versionControl} </li>
          </ul>
        </div>
        <div className="pt-8">
          <h1 className="text-2xl text-green-400 font-bold pb-3">Projects</h1>
          <p className="text-gray-600 font-semibold">{aboutSectionData?.projectDesc}</p>
        </div>
        <div className="pt-8">
          <h1 className="text-2xl text-green-400 font-bold pb-3">Goals</h1>
          <p className="text-gray-600 font-semibold">{aboutSectionData?.myGoal}</p>
        </div>

      </div>
    </div>
  )
}

export default About
