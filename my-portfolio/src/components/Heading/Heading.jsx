/* eslint-disable react/prop-types */

const Heading = ({ heading, span }) => {
  return (
    <h1 className="lg:text-4xl md:text-3xl  sm:text-2xl text-2xl font-bold text-white">
      {heading} <span className="text-green-400">{span}</span>
    </h1>
  )
}

export default Heading
