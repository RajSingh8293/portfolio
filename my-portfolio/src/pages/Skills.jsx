import React from 'react'

const Skills = () => {
  return (
    <div className="min-h-[100vh] ">
      <div className="">
        <div className="bg-gray-800  flex justify-center items-center h-[50vh] lg:h-[70vh] md:h-[70vh] sm:h-[70vh]">
          <h1 className="text-white text-4xl font-bold">#skills</h1>
          {/* <Heading heading="about me" span="#" /> */}
        </div>
        <div className="px-10 py-24 mx-auto max-w-[800px] ">
          <h1 className="text-[#ebe7e7] text-3xl pb-5">
            I have following Skills
          </h1>
          <div className="border p-5 rounded">
            <div className="mb-1 text-base font-medium dark:text-white">
              HTML{' '}
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 mb-4 dark:bg-gray-700">
              <div className="w-[80%] text-center  bg-gray-600 h-[100%] rounded-full dark:bg-gray-300">
                80%
              </div>
            </div>
            <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500">
              CSS
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 mb-4 dark:bg-gray-700">
              <div className="w-[70%] text-center bg-blue-600 h-[100%] rounded-full">
                70%
              </div>
            </div>
            <div className="mb-1 text-base font-medium text-red-700 dark:text-red-500">
              JAVSCRIPT
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 mb-4 dark:bg-gray-700">
              <div className="w-[50%] text-center bg-red-600 h-[100%] rounded-full dark:bg-red-500">
                50%
              </div>
            </div>
            <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
              REACTJS
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 mb-4 dark:bg-gray-700">
              <div className="w-[60%] text-center bg-green-600 h-[100%] rounded-full dark:bg-green-500">
                60%
              </div>
            </div>
            <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">
              NODEJS / EXPRESSJS
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 mb-4 dark:bg-gray-700">
              <div className="w-[40%] text-center bg-yellow-400 h-[100%] rounded-full">
                40%
              </div>
            </div>
            <div className="mb-1 text-base font-medium text-indigo-700 dark:text-indigo-500">
              MONGODB
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 mb-4 dark:bg-gray-700">
              <div className="w-[40%] text-center bg-indigo-600 h-[100%] rounded-full dark:bg-indigo-500">
                40%
              </div>
            </div>
            <div className="mb-1 text-base font-medium text-purple-700 dark:text-purple-500">
              TAILWIND CSS
            </div>
            <div className="w-full bg-gray-200 rounded-full  h-4.5 dark:bg-gray-700">
              <div className="w-[70%] text-center bg-purple-600 h-[100%] rounded-full dark:bg-purple-500">
                70%
              </div>
            </div>

            <div className="mb-1 pt-3 text-base font-medium text-orange-600 dark:text-purple-500">
              BOOTSTRAP
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4.5 dark:bg-gray-700">
              <div className="w-[75%] text-center bg-orange-600 h-[100%] rounded-full dark:bg-purple-500">
                75%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
