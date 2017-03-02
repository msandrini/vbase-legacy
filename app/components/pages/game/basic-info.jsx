import React from 'react'
import { Link } from 'react-router'

import './basic-info.styl'

const _getCompanies = companies => companies.map(c => 
	<Link to={`/info/company/${c}`} key={c} className="info-link company">{c}</Link>)

const GameBasicInfo = props => <div className="basic-info">
	{_getCompanies(props.companies)} <span className="year">{props.year}</span>
</div>

export default GameBasicInfo