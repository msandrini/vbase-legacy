import React from 'react'
import { Link } from 'react-router'

import t, { lang } from '../../../i18n'
import './basic-info.styl'

const _getCompanies = companies => companies.map(c => <Link to={`/info/${c}`} key={c} className="company">{c}</Link>)

const GameBasicInfo = props => <div className="basic-info">
	{_getCompanies(props.companies)} <span className="year">{props.year}</span>
</div>

export default GameBasicInfo