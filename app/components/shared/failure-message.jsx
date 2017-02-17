import React from 'react'
import t from '../../i18n'

const FailureMessage = (props) => (
	<div className="failure-message">
		<span>{props.message || t('error')}</span>
	</div>
)

export default FailureMessage