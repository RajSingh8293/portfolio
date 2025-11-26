import { useState } from "react";
// import toast from "react-hot-toast";
// import { axiosInstance } from "../../lib/axiosInstansce";
import { useDispatch, useSelector } from "react-redux";
import { createContactSectionData, getContactSectionData, updateContactSectionData } from "../../redux/slices/contactSlice";
import { useEffect } from "react";

const ContactEditor = () => {

    const dispatch = useDispatch()
    const { contactData } = useSelector(state => state.contactData)
    const [form, setForm] = useState({
        location: "",
        emailAddress: "",
        gitHubAccount: "",
    });

    console.log("contactData :", contactData);



    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const saveContact = async (e) => {
        e.preventDefault();
        console.log("Saving Contact Data:", form);

        if (contactData) {

            dispatch(updateContactSectionData(contactData._id, form))
        } else {
            dispatch(createContactSectionData(form))

        }


    };


    useEffect(() => {
        setForm({
            location: contactData.location,
            emailAddress: contactData.emailAddress,
            gitHubAccount: contactData.gitHubAccount
        })

    }, [contactData])
    useEffect(() => {
        dispatch(getContactSectionData())

    }, [dispatch])

    return (
        <div>

            <form className="space-y-4 max-w-xl" onSubmit={saveContact}>
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    placeholder="Location"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="emailAddress"
                    value={form.emailAddress}
                    placeholder="Email Address"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="gitHubAccount"
                    value={form.gitHubAccount}
                    placeholder="Git Hub Account"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />



                <button className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700">
                    Save
                </button>
            </form>

            {contactData &&
                <div className="w-full overflow-x-auto mt-5 ">
                    <table className="min-w-[700px] md:min-w-full border-collapse  no-scrollbar">
                        <thead>
                            <tr className="bg-gray-600 text-left">
                                <th className="p-3 border">Location</th>
                                <th className="p-3 border">Email Address</th>
                                <th className="p-3 border">Git Hub</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="border-b hover:bg-gray-800">



                                {/* TITLE */}
                                <td className="p-3 border font-semibold">{contactData?.location}</td>
                                <td className="p-3 border font-semibold">{contactData?.emailAddress}</td>
                                <td className="p-3 border font-semibold">{contactData?.gitHubAccount}</td>

                            </tr>

                        </tbody>
                    </table>
                </div>}
        </div>
    );
};

export default ContactEditor;
