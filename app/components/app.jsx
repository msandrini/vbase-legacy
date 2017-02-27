import React from 'react';
import Header from './header/_main.jsx';
import Footer from './footer/_main.jsx';

import './app-generic.styl'

const appWrapper = ({ children }) => (
    <div className="app-wrapper">
        <Header />
        <div className="pages">
            {children}
        </div>
        <Footer />
    </div>
);

export default appWrapper;
