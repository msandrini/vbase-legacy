import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Icon from '../shared/icon.jsx'

import t, { lang } from '../../i18n'
import { historyPush } from '../../utils'
import './top-links.styl'

const PATH_HOME = { 'en': 'all-games', 'pt-br': 'todos-os-jogos' }
const _locIsNotHome = path => path.indexOf(PATH_HOME[lang]) === -1

const _goToLang = thisLang => {
	historyPush('/' + PATH_HOME[thisLang])
	window.location.reload()
}

const TopLinks = ({location}) => (
	<aside id="top-links">
		{/* <a href="#/contact" className="contact-us" title={t('contact-us')}>
			<Icon type="mail" size="18" />
		</a> */}
		{_locIsNotHome(location) && <span className="line" />}
		{_locIsNotHome(location) && <Link className="home ball btn" to={`/${t('url__all-games')}`} title={t('back-to-all-games')}>
			<Icon type="house" size="22" />
		</Link>}
		{lang === 'en' ? '' : <a onClick={() => _goToLang('en')} className="flag btn ball flag-uk" title="English Version">
			<Icon type="flag-uk" size="18" />
		</a>}
		{lang === 'pt-br' ? '' : <a onClick={() => _goToLang('pt-br')} className="flag btn ball flag-br" title="Versão em português (BR)">
			<Icon type="flag-br" size="36" />
		</a>}
	</aside>
)

const mapStateToProps = state => ({
	location: state.routing.locationBeforeTransitions.pathname
})

export default connect(mapStateToProps)(TopLinks)
