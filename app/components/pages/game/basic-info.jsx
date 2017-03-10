import React from 'react'
import { Link } from 'react-router'
import t from '../../../i18n'

import './basic-info.styl'

const _getCompanies = companies => {
	return companies.map(c =>
		<Link to={`/${t('url__info')}/${t('url__company')}/${c.id}`} key={c.id} className="info-link company">{c.title}</Link>)
}

const GameBasicInfo = props => <div className="basic-info">
	{_getCompanies(props.companies)} <span className="year">{props.year}</span>
</div>

export default GameBasicInfo
