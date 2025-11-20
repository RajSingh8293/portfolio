

/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timeout;
        if (isOpen) {
            setShow(true);
        } else {
            timeout = setTimeout(() => setShow(false), 250);
        }
        return () => clearTimeout(timeout);
    }, [isOpen]);

    if (!isOpen && !show) return null;

    return (
        <div
            className={`
                fixed inset-0 z-50 flex items-center justify-center 
                transition-opacity duration-300
                ${isOpen ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"}
            `}
            onClick={onClose}
        >
            <button
                className="absolute top-2 z-50 right-5 text-3xl text-gray-200 hover:text-gray-100 "
                onClick={onClose}
            >
                x
            </button>

            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                   bg-gray-700  rounded-2xl p-6 w-full max-w-md shadow-lg 
                    transition-all duration-300 ease-out
                    transform
                    ${isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-3"
                    }
                `}
            >


                {children}
            </div>
        </div>
    );
};

export default Modal;

