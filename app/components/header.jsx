import React, { Component } from 'react';
import LoginBox from './header/login-box.jsx';
import SearchFields from './search/fields.jsx';

import '../styles/header.styl';
import t, { lang } from '../i18n';

const Header = () => (
    <header>
    	<h1 id="logo"><span>VBase</span></h1>
    	<LoginBox />
    	<aside id="top-links">
	    	<a href="#/contact" className="contact-us"><span>{t('contact-us')}</span></a>
	    	{ lang==='en'? '' : <a href="en" className="flag flag-uk" alt="English Version"><span>English Version</span></a> }
	    	{ lang==='pt-br'? '' : <a href="br" className="flag flag-br" alt="Versão em português (BR)"><span>Versão em português (BR)</span></a> }
    	</aside>
        <SearchFields />
    </header>
);

export default Header;