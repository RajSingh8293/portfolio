import { useState } from "react";

const ContactEditor = () => {
    const [form, setForm] = useState({
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const saveContact = (e) => {
        e.preventDefault();
        console.log("Saving Contact Data:", form);

        // PUT /api/contact/update
    };

    return (
        <div>

            <form className="space-y-4 max-w-xl" onSubmit={saveContact}>
                <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    onChange={handleChange}
                />

                <textarea
                    name="address"
                    rows="3"
                    placeholder="Address"
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

export default ContactEditor;
