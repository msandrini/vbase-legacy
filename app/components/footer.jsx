import React, { Component } from 'react';
import { Link } from 'react-router'

import '../styles/footer.styl';
import t from '../i18n';

const Footer = () => (
    <footer>
    	<Link to="/contact" className="contact">{t('contact')}</Link>
    	<Link to="/terms-privacy">{t('terms-of-use-and-privacy')}</Link>
    	<span className="copy">&copy;2003-2017 Marcos Sandrini</span>
    </footer>
);

export default Footer;