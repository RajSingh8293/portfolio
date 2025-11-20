import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { createAboutSectionData, getAboutSectionData, updateAboutImage, updateAboutSectionData } from "../../redux/slices/aboutSlice";
import Loader from "../Loader";

const AboutEditor = () => {
    const { aboutSectionData, loading } = useSelector(state => state.aboutSectionData)
    const [form, setForm] = useState({
        title: "",
        description: "",
        frontendSkills: "",
        backendSkills: "",
        versionControl: "",
        projectDesc: "",
        myGoal: "",
    });
    const dispatch = useDispatch()

    const [aboutImage, setAboutImage] = useState(null)
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // const handleImageChange = (e) =>
    //     setForm({ ...form, image: e.target.files[0] });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // Preview locally
        setAboutImage(URL.createObjectURL(file));

        try {
            const formData = new FormData();
            formData.append('aboutImage', file);

            dispatch(updateAboutImage(aboutSectionData?._id, formData))
        } catch (error) {
            console.error(error);
        }
    };
    const saveAbout = (e) => {
        e.preventDefault();
        console.log("Saving About Data:", form);

        if (aboutSectionData) {
            dispatch(updateAboutSectionData(aboutSectionData?._id, form))
        } else {
            dispatch(createAboutSectionData(form))

        }

    };

    useEffect(() => {
        dispatch(getAboutSectionData())
    }, [dispatch])

    useEffect(() => {
        if (aboutSectionData) {
            setForm({
                title: aboutSectionData.title || '',
                description: aboutSectionData.description || '',
                frontendSkills: aboutSectionData.frontendSkills || '',
                backendSkills: aboutSectionData.backendSkills || '',
                versionControl: aboutSectionData.versionControl || '',
                projectDesc: aboutSectionData.projectDesc || '',
                myGoal: aboutSectionData.myGoal || ''
            });
            setAboutImage(aboutSectionData.aboutImage || null);
        }
    }, [aboutSectionData]);

    return (
        <div>

            <form className="space-y-4 max-w-xl" onSubmit={saveAbout}>

                {loading ? <Loader /> : <div>
                    <label className="block mb-2 text-gray-400">About Image</label>

                    <section className="flex flex-col items-center mb-6">

                        {/* Image OR Upload Icon */}
                        {aboutImage ? (
                            <img
                                src={aboutImage}
                                alt="About"
                                className=" h-44 rounded-xl mb-4  border-2 border-gray-500"
                            />
                        ) : (
                            <label
                                className="w-full h-32 border-2 border-dashed border-gray-500 rounded-xl
                                   flex flex-col items-center justify-center cursor-pointer mb-4 hover:bg-gray-800/40"
                            >
                                {/* Upload Icon */}

                                <FiUpload size={36} className="text-gray-400" />

                                <span className="text-gray-400 text-sm mt-2">Upload About Image</span>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}

                        <label className="text-blue-400 font-semibold text-sm cursor-pointer">
                            Change About Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </section>
                </div>}
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    placeholder="Title"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />


                <textarea
                    name="description"
                    rows="5"
                    value={form.description}
                    placeholder="Description"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="frontendSkills"
                    value={form.frontendSkills}
                    placeholder="Frontend Skills"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="backendSkills"
                    value={form.backendSkills}
                    placeholder="Backend Skills"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="versionControl"
                    value={form.versionControl}
                    placeholder="Version Control"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="projectDesc"
                    value={form.projectDesc}
                    placeholder="Projects Description"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="myGoal"
                    value={form.myGoal}
                    placeholder="My Goals"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />


                <button className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700">
                    Save
                </button>
            </form>
        </div>
    );
};

export default AboutEditor;
