/* eslint-disable react/prop-types */


import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);


    if (!isAuthenticated || !user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;



