import React from 'react'
import reactStringReplace from 'react-string-replace'

const _processTitle = title => {
	if (typeof title === 'string' && title.indexOf('*')) {
		return reactStringReplace(title, /\*([^\*]+)\*/g, 
			(match, index) => <strong key={index}>{match}</strong>)
	}
	return title
}

const Title = (props) => (
	<div className="title">
		<h2>{props.main}</h2>
		{props.sub && <h3>{_processTitle(props.sub)}</h3>}
		{props.details && <h4>
			{props.details.map((d,i) => <div key={i}>{_processTitle(d)}</div>)}
		</h4>}
	</div>
)

export default Title