/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { FiUpload } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../Loader";
// import { createProject } from "../../redux/slices/projectSlice";

// const CreateProjects = () => {
//     const { loading } = useSelector(state => state.projects)
//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         caption: "",
//         btnText: "",

//     });
//     const dispatch = useDispatch()

//     const [projectImage, setProjectImage] = useState(null)
//     const handleChange = (e) =>
//         setForm({ ...form, [e.target.name]: e.target.value });

//     // const handleImageChange = async (e) => {
//     //     const file = e.target.files[0];
//     //     if (!file) return;
//     //     // Preview locally
//     //     setProjectImage(URL.createObjectURL(file));

//     //     try {
//     //         const formData = new FormData();
//     //         formData.append('projectImage', file);

//     //         // dispatch(updateAboutImage(aboutSectionData?._id, formData))
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };
//     const saveProject = (e) => {
//         e.preventDefault();
//         const file = e.target.files[0];
//         if (!file) return;
//         // Preview locally
//         setProjectImage(URL.createObjectURL(file));
//         try {
//             const formData = new FormData();
//             formData.append('projectImage', file);
//             formData.append('title', form.title);
//             formData.append('caption', form.caption);
//             formData.append('btnText', form.btnText);
//             dispatch(createProject(formData))
//         } catch (error) {
//             console.error(error);
//         }

//     };


//     // useEffect(() => {
//     //     if (aboutSectionData) {
//     //         setForm({
//     //             title: aboutSectionData.title || '',
//     //             description: aboutSectionData.description || '',
//     //             caption: aboutSectionData.caption || '',
//     //             btnText: aboutSectionData.btnText || '',
//     //         });
//     //         setProjectImage(aboutSectionData.aboutImage || null);
//     //     }
//     // }, [aboutSectionData]);

//     return (
//         <div>

//             <form className="space-y-4 max-w-xl" onSubmit={saveProject}>

//                 {loading ? <Loader /> : <div>

//                     <section className="flex flex-col items-center mb-6">

//                         {/* Image OR Upload Icon */}
//                         {projectImage ? (
//                             <img
//                                 src={projectImage}
//                                 alt="About"
//                                 className=" h-44 rounded-xl mb-4  border-2 border-gray-500"
//                             />
//                         ) : (
//                             <label
//                                 className="w-full h-32 border-2 border-dashed border-gray-500 rounded-xl
//                                    flex flex-col items-center justify-center cursor-pointer mb-4 hover:bg-gray-800/40"
//                             >
//                                 {/* Upload Icon */}

//                                 <FiUpload size={36} className="text-gray-400" />

//                                 <span className="text-gray-400 text-sm mt-2">Upload Project Image</span>

//                                 <input
//                                     type="file"
//                                     className="hidden"
//                                     accept="image/*"
//                                 // onChange={handleImageChange}
//                                 />
//                             </label>
//                         )}

//                     </section>
//                 </div>}
//                 <input
//                     type="text"
//                     name="title"
//                     value={form.title}
//                     placeholder="Title"
//                     className="w-full p-2 rounded bg-gray-800 border border-gray-700"
//                     onChange={handleChange}
//                 />


//                 <textarea
//                     name="description"
//                     rows="5"
//                     value={form.description}
//                     placeholder="Description"
//                     className="w-full p-2 rounded bg-gray-800 border border-gray-700"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="text"
//                     name="caption"
//                     value={form.caption}
//                     placeholder="Caption"
//                     className="w-full p-2 rounded bg-gray-800 border border-gray-700"
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="text"
//                     name="btnText"
//                     value={form.btnText}
//                     placeholder="Button Text"
//                     className="w-full p-2 rounded bg-gray-800 border border-gray-700"
//                     onChange={handleChange}
//                 />



//                 <button className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700">
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateProjects;

import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { createProject, updateProjectSectionData } from "../../redux/slices/projectSlice";

const CreateProject = ({ updatedProject }) => {
    const { loading } = useSelector(state => state.projects);
    const [form, setForm] = useState({
        title: "",
        description: "",
        caption: "",
        projectLink: "",
        btnText: "",
    });

    const dispatch = useDispatch();
    const [projectImage, setProjectImage] = useState(null);
    const [projectFile, setProjectFile] = useState(null);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // ✔ Proper file input handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProjectFile(file);
        setProjectImage(URL.createObjectURL(file));
    };

    // ✔ Proper form submit
    const saveProject = (e) => {
        e.preventDefault();

        if (updatedProject) {
            dispatch(updateProjectSectionData(updatedProject._id, form));
        }






        // CREATE MODE

        // if (!projectFile) {
        //     alert("Please upload a project image first.");
        //     return;
        // }
        const formData = new FormData();
        formData.append("projectImage", projectFile);
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("caption", form.caption);
        formData.append("projectLink", form.projectLink);
        formData.append("btnText", form.btnText);

        dispatch(createProject(formData));


        // UPDATE MODE
        // formData.append("title", form.title);
        // formData.append("description", form.description);
        // formData.append("caption", form.caption);
        // formData.append("projectLink", form.projectLink);
        // formData.append("btnText", form.btnText);



    };


    useEffect(() => {
        if (updatedProject) {
            setForm({
                title: updatedProject.title || '',
                description: updatedProject.description || '',
                caption: updatedProject.caption || '',
                btnText: updatedProject.btnText || '',
                projectLink: updatedProject.projectLink || '',
            });
            // setAboutImage(updatedProject.aboutImage || null);
        }
    }, [updatedProject]);
    return (
        <div className="">
            <form className="space-y-4 max-w-xl " onSubmit={saveProject}>

                {loading ? (
                    <Loader />
                ) : (
                    !updatedProject && <section className="flex flex-col items-center mb-6">

                        {/* Preview image */}
                        {projectImage ? (
                            <img
                                src={projectImage}
                                alt="Project Preview"
                                className="h-44 rounded-xl mb-4 border-2 border-gray-500 object-cover"
                            />
                        ) : (
                            <label
                                className="w-full h-32 border-2 border-dashed border-gray-500 rounded-xl
                                flex flex-col items-center justify-center cursor-pointer mb-4 hover:bg-gray-800/40"
                            >
                                <FiUpload size={36} className="text-gray-400" />
                                <span className="text-gray-400 text-sm mt-2">
                                    Upload Project Image
                                </span>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}

                    </section>
                )}

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    placeholder="Title"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    rows="5"
                    value={form.description}
                    placeholder="Description"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="caption"
                    value={form.caption}
                    placeholder="Caption"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="projectLink"
                    value={form.projectLink}
                    placeholder="Project Link"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="btnText"
                    value={form.btnText}
                    placeholder="Button Text"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700 w-full"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default CreateProject;

