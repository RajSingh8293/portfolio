

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllProjects, updateProjectImage } from "../../redux/slices/projectSlice"
import Modal from "../Modal"
import CreateProject from "./CreateProject"
import { FiEdit } from "react-icons/fi"
import { NavLink } from "react-router-dom"
import toast from "react-hot-toast"

const Projects = () => {
    const { projects } = useSelector(state => state.projects)

    // MAIN EDIT MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [updatedProject, setUpdatedProject] = useState({})

    // IMAGE EDIT MODAL
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImageProject, setSelectedImageProject] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const openModal = (data) => {
        setIsOpen(true)
        setUpdatedProject(data)
    }

    const closeModal = () => setIsOpen(false)

    // ---------------------------
    // IMAGE EDIT MODAL HANDLER
    // ---------------------------
    const openImageModal = (project) => {
        setSelectedImageProject(project);
        setIsImageModalOpen(true);
    };
    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImageProject(null);
    };


    useEffect(() => {
        // When modal opens, show the current image first
        if (selectedImageProject) {
            setPreviewImage(selectedImageProject.projectImage);
        }
    }, [selectedImageProject]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);

        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewImage(previewURL);
        }
    };

    const updateImageHandler = async () => {
        if (!newImage) {
            toast.error("Please select an image!");
            return;
        }
        const formData = new FormData()
        formData.append("projectImage", newImage)
        dispatch(updateProjectImage(
            selectedImageProject._id,
            formData
        ));
        closeImageModal();
    };




    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProjects())
    }, [dispatch])

    return (
        <div className="w-full flex justify-center">
            <div className='px-10 py-16 text-center max-w-7xl w-full'>

                {/* TABLE VIEW */}
                <div className="w-full overflow-x-auto mt-5 ">
                    <table className="min-w-[700px] md:min-w-full border-collapse  no-scrollbar">
                        <thead>
                            <tr className="bg-gray-600 text-left">
                                <th className="p-3 border">Image</th>
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Description</th>
                                <th className="p-3 border text-center">Preview</th>
                                <th className="p-3 border text-center">Edit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {projects?.map((data) => (
                                <tr key={data._id} className="border-b hover:bg-gray-800">

                                    {/* ---- IMAGE HOVER EDIT ---- */}
                                    <td className="p-3 border">
                                        <div className="relative w-16 h-16 group">
                                            <img
                                                src={data?.projectImage}
                                                alt={data?.title}
                                                className="w-full h-full object-cover rounded-md"
                                            />

                                            {/* Hover Overlay */}
                                            <div
                                                className="
                                                    absolute inset-0 
                                                    bg-black/50 
                                                    rounded-md
                                                    opacity-0 
                                                    group-hover:opacity-100 
                                                    flex items-center justify-center 
                                                    transition
                                                "
                                            >
                                                <button
                                                    onClick={() => openImageModal(data)}
                                                    className="px-2 py-1 bg-white text-black text-xs rounded shadow hover:bg-gray-200"
                                                >
                                                    <FiEdit size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>

                                    {/* TITLE */}
                                    <td className="p-3 border font-semibold">{data.title}</td>

                                    {/* DESCRIPTION */}
                                    <td className="p-3 border max-w-[300px]">
                                        <p className="line-clamp-2 text-sm text-gray-300">
                                            {data.description}
                                        </p>
                                    </td>

                                    {/* PREVIEW BUTTON */}
                                    <td className="p-3 border text-center">
                                        <NavLink
                                            to={data.projectLink}
                                            target="_blank"
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Preview
                                        </NavLink>
                                    </td>

                                    {/* EDIT BUTTON (MAIN FORM MODAL) */}
                                    <td className="p-3 border text-center">
                                        <button onClick={() => openModal(data)}>
                                            <FiEdit size={24} className="text-green-500 hover:text-green-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MAIN EDIT MODAL */}
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <CreateProject updatedProject={updatedProject} />
                </Modal>

                {/* IMAGE EDIT MODAL */}
                <Modal isOpen={isImageModalOpen} onClose={closeImageModal}>
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-3">Edit Project Image</h2>
                        <img
                            src={previewImage}
                            alt=""
                            className="w-40 h-40 object-cover rounded mx-auto mb-4 border"
                        />

                        {/* File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-white"
                        />

                        <button
                            onClick={updateImageHandler}
                            className="mt-4 w-full py-2 bg-green-600 rounded hover:bg-green-700"
                        >
                            Save Image
                        </button>
                    </div>
                </Modal>


            </div>
        </div>
    )
}

export default Projects

