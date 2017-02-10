import React from 'react'

const Title = (props) => (
	<div className="title">
		<h2>{props.main}</h2>
		<h3>{props.sub}</h3>
	</div>
)

export default Title