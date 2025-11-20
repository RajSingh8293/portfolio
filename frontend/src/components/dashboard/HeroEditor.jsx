import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { createHeroSectionData, getHeroSectionData, updateHeroImage, updateHeroSectionData } from "../../redux/slices/heroSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

const HeroEditor = () => {
    const { heroSectionData, loading } = useSelector(state => state.heroSectionData)
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        description: "",
        username: "",
        aboutMe: "",
        btnText: "",
    });


    const [heroImage, setHeroImage] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // Preview locally
        setHeroImage(URL.createObjectURL(file));

        try {
            const formData = new FormData();
            formData.append('heroImage', file);

            dispatch(updateHeroImage(heroSectionData?._id, formData))
        } catch (error) {
            console.error(error);
        }
    };



    const saveHero = (e) => {
        e.preventDefault();
        if (heroSectionData) {
            dispatch(updateHeroSectionData(heroSectionData?._id, form))

        } else {
            dispatch(createHeroSectionData(form))
        }
    };


    useEffect(() => {
        dispatch(getHeroSectionData())
    }, [dispatch])

    useEffect(() => {
        if (heroSectionData) {
            setForm({
                description: heroSectionData.description || '',
                username: heroSectionData.username || '',
                aboutMe: heroSectionData.aboutMe || '',
                btnText: heroSectionData.btnText || '',

            });
            setHeroImage(heroSectionData.heroImage || null);
        }
    }, [heroSectionData]);


    return (
        <div>

            <form className="space-y-4 max-w-xl" onSubmit={saveHero}>

                {loading ? <Loader /> : <div>
                    <label className="block mb-2 text-gray-400">Hero Image</label>

                    <section className="flex flex-col items-center mb-6">

                        {/* Image OR Upload Icon */}
                        {heroImage ? (
                            <img
                                src={heroImage}
                                alt="Hero"
                                className=" h-44 rounded-xl mb-4  border-2 border-gray-500"
                            />
                        ) : (
                            <label
                                className="w-full h-32 border-2 border-dashed border-gray-500 rounded-xl
                   flex flex-col items-center justify-center cursor-pointer mb-4 hover:bg-gray-800/40"
                            >
                                {/* Upload Icon */}

                                <FiUpload size={36} className="text-gray-400" />

                                <span className="text-gray-400 text-sm mt-2">Upload Hero Image</span>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}

                        <label className="text-blue-400 font-semibold text-sm cursor-pointer">
                            Change Hero Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </section>
                </div>}

                <input
                    type="text"
                    name="description"
                    value={form.description}
                    placeholder="Hero Description"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="username"
                    value={form.username}
                    placeholder="User Name"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="aboutMe"
                    value={form.aboutMe}
                    placeholder="Hero About Me"
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


                <button className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700">
                    Save
                </button>
            </form>
        </div>
    );
};

export default HeroEditor;
