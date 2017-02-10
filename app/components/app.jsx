import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

const appWrapper = ({ children }) => (
    <div className="app-wrapper">
        <Header />
        <div className="overlays">
            {children}
        </div>
        <Footer />
    </div>
);

export default appWrapper;
