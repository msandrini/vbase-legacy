import React from 'react'
import t from '../../i18n'

import './failure-message.styl'

const FailureMessage = (props) => {
	console.log(props)
	return <div className="failure-message">
		<strong>{t('error')}</strong>
		{props && (typeof props.message === 'string') && <p>{props.message}</p>}
	</div>
}

export default FailureMessage
