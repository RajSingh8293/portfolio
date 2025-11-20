
import { BiHome, BiLeftArrow } from "react-icons/bi";
import { IoAlertOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
// import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const goBack = () => {
        navigate(-1);
    };

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/20 rounded-full">
                        <IoAlertOutline size={48} className="text-red-500" />
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>

                {/* Message */}
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

                <p className="text-gray-400 mb-8">
                    The page you&#39;re looking for doesn&#39;t exist or has been moved.
                    <br />
                    <code className="text-sm bg-gray-800 px-2 py-1 rounded mt-2 inline-block">
                        {location.pathname}
                    </code>
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={goBack}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                        <BiLeftArrow size={20} />
                        Go Back
                    </button>

                    <button
                        onClick={goHome}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                        <BiHome size={20} />
                        Go Home
                    </button>
                </div>

                {/* Additional Help */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                        Need help?{" "}
                        <a
                            href="/contact"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            Contact support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};



export default NoPage