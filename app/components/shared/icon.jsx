import React from 'react'

const Icon = props => (
	<span className="icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={props.size} height={props.size}>
			<use xlinkHref={'#icon_' + props.type}></use>
		</svg>
	</span>
)

export default Icon
