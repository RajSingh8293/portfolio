/* eslint-disable react/prop-types */
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";



const Layout = ({ children }) => {
    return (
        <div >
            {/* Header */}
            <Navbar />

            {/* Page Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
