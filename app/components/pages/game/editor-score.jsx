import React from 'react'
import Scorebar from '../../shared/scorebar.jsx'

import t from '../../../i18n'
import './editor-score.styl'

const GameEditorScore = ({score}) => {
	const scoreParts = String(score).split('.')

	return <div className="score editor-score">
		<span className="line" />
		<div className="ball">
			<span className="label">{t('editor-score')}</span>
			<div className={`numbers score${score}`}>
				<Scorebar score={score} />
				<strong>{scoreParts[0]}</strong>
				<small>.{scoreParts[1]? scoreParts[1] : '0'}</small>
			</div>
		</div>
	</div>
}

export default GameEditorScore