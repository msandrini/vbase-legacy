import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Icon from '../shared/icon.jsx'

import t, { lang } from '../../i18n'
import './top-links.styl'

const PATH_HOME = 'all-games'
const _locIsNotHome = path => path.indexOf(PATH_HOME) === -1

const TopLinks = ({location}) => (
	<aside id="top-links">
		{/*<a href="#/contact" className="contact-us" title={t('contact-us')}>
			<Icon type="mail" size="18" />
		</a>*/}
		{_locIsNotHome(location) && <span className="line" />}
		{_locIsNotHome(location) && <Link className="home ball btn" to="/all-games" title={t('back-to-all-games')}>
			<Icon type="house" size="22" />
		</Link>}
		{ lang==='en'? '' : <a href="en" className="flag btn ball flag-uk" title="English Version">
			<Icon type="flag-uk" size="18" />
		</a> }
		{ lang==='pt-br'? '' : <a href="br" className="flag btn ball flag-br" title="Versão em português (BR)">
			<Icon type="flag-br" size="36" />
		</a> }
	</aside>
)

const mapStateToProps = state => ({
    location: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(TopLinks)