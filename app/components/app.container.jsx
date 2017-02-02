import React from 'react';
import Header from './Header.component.jsx';

const AppContainer = ({ children }) => (
    <div className="App">
        <Header />
        <div className="container-fluid app-content-wrap">
            {children}
        </div>
    </div>
);

export default AppContainer;

