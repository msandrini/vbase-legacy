import React from 'react'
import { Link } from 'react-router'
import Icon from '../shared/icon.jsx'

import './_main.styl'
import t from '../../i18n'

const Footer = () => (
	<footer>
		<span className="copy">&copy;2003-2017 Marcos Sandrini</span>
		<Link to={'/' + t('url__terms-privacy')} className="terms">{t('terms-of-use-and-privacy')}</Link>
		<Link to={'/' + t('url__contact')} className="btn ball contact" title={t('contact')}>
			<Icon type="mail" size="19" />
		</Link>
	</footer>
)

export default Footer
