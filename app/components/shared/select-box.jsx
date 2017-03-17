import React from 'react'
import Icon from './icon.jsx'

const SelectBox = props => (
	<div className="select-box">
		{props.subLabel ? <span>{props.subLabel}</span> : ''}
		<select onChange={props.onChange} value={props.value} name={props.name}>
			{props.children}
		</select>
		<Icon size="10" type="downarrow" />
	</div>
)

export default SelectBox
