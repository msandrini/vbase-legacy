import React from 'react'
import t from '../../i18n'

const _getClassName = score => 'scorebar score' + String(score).replace('.','-')

const Scorebar = ({score}) => <div className={_getClassName(score)}>
		<strong>{score}</strong> {t('out-of-10')}
	</div>

export default Scorebar