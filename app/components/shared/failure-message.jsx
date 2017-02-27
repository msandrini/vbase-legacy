import React from 'react'
import t from '../../i18n'

import './failure-message.styl'

const FailureMessage = (props) => (
	<div className="failure-message">
		<strong>{t('error')}</strong>
		<p>{props.message}</p>
	</div>
)

export default FailureMessage