import { useEffect } from "react"
import Projects from "../components/Projects";
import Layout from "../Layout";
// import Projects from "../components/Projects"

const ProjectsPage = () => {

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <Layout>
            <section>
                <div className="bg-gray-800 mx-auto flex justify-center items-center h-[20vh] lg:h-[70vh] md:h-[70vh] sm:h-[70vh]">
                    <h1 className="text-white text-4xl font-bold">#my projects</h1>
                </div>
                <div className="flex  justify-center items-center">
                    <Projects />
                </div>
            </section>
        </Layout >
    )
}

export default ProjectsPage