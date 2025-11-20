import React from 'react'
import Layout from '../Layout'
import { useEffect, useState } from "react";
import { fetchProfile, updateProfileImage, updateUserProfile } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Profile = () => {
    // const [user, setUser] = useState(null);
    const { user, loading } = useSelector(state => state.user)
    const [form, setForm] = useState({
        username: "",
        email: "",
        bio: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const dispatch = useDispatch()





    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserProfile(form))
        } catch (err) {
            console.log(err);
        }
    };



    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // Preview locally
        setProfileImage(URL.createObjectURL(file));

        try {
            const formData = new FormData();
            formData.append('profileImage', file);

            dispatch(updateProfileImage(formData))
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Upload failed');
        }
    };

    useEffect(() => {
        if (user) {
            setForm({
                username: user?.username || "",
                email: user?.email || "",
                bio: user?.bio || "",
            })
            setProfileImage(user?.profileImage || null);
        }

    }, [user])

    // useEffect(() => {
    //     dispatch(fetchProfile());
    // }, [dispatch]);
    if (loading && !user) return <p>Loading...</p>;

    return (
        <Layout>

            <div className="w-full min-h-screen flex items-center justify-center ">
                <div className="lg:mx-10 mx-5 p-5 my-8 bg-gray-700 rounded-xl w-full max-w-lg">
                    <h1 className="text-2xl text-gray-100 font-bold mb-4">Profile</h1>

                    {/* User Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={profileImage || `https://placehold.co/100x100/A855F7/FFFFFF?text=${user?.username?.charAt(0).toUpperCase()}`}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-500"
                        />
                        <label className="text-blue-400 font-semibold text-sm cursor-pointer">
                            Change profile photo
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>


                    {/* Update Form */}
                    <form onSubmit={updateProfile} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-gray-100">User Name</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                placeholder="Your username"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-100">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-gray-700 text-white cursor-not-allowed"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-100">Bio</label>
                            <textarea
                                name="bio"
                                rows="3"
                                value={form.bio}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                placeholder="Write something about yourself..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-900  transition-all duration-300"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
