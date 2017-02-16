import React from 'react'
import Icon from '../shared/icon.jsx'
import t, { lang } from '../../i18n'

const TopLinks = props => (
	<aside id="top-links">
		<a href="#/contact" className="contact-us" title={t('contact-us')}>
			<Icon type="mail" size="18" />
		</a>
		{ lang==='en'? '' : <a href="en" className="flag flag-uk" title="English Version">
			<Icon type="flag-uk" size="18" />
		</a> }
		{ lang==='pt-br'? '' : <a href="br" className="flag flag-br" title="Versão em português (BR)">
			<Icon type="flag-br" size="36" />
		</a> }
	</aside>
)

export default TopLinks