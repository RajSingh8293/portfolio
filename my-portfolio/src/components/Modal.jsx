/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    const [show, setShow] = useState(false);
    // if (!isOpen) return null;

    useEffect(() => {
        let timeout;
        if (isOpen) {
            setShow(true);
        } else {
            // Add delay for exit animation
            timeout = setTimeout(() => setShow(false), 200);
        }
        return () => clearTimeout(timeout);
    }, [isOpen]);

    if (!isOpen && !show) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'bg-black bg-opacity-50' : 'bg-transparent'
                }`}
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-lg transform transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
            > */}
                <button
                    className="absolute top-2 right-5 text-3xl text-gray-500 hover:text-black dark:hover:text-white"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
