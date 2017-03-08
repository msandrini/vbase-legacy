import React from 'react'
import reactStringReplace from 'react-string-replace'

import './title.styl'

const _processTitle = title => {
	if (typeof title === 'string' && title.indexOf('*')) {
		return reactStringReplace(title, /\*([^\*]+)\*/g,   // eslint-disable-line no-useless-escape
			(match, index) => <strong key={index}>{match}</strong>)
	}
	return title
}

const Title = (props) => (
	<hgroup className="title">
		<h2>{props.main}</h2>
		{props.sub && <h3>{_processTitle(props.sub)}</h3>}
		{props.details && <h4>
			{props.details.map((d, i) => <div key={i}>{_processTitle(d)}</div>)}
		</h4>}
		<div className="ball"></div>
	</hgroup>
)

export default Title
