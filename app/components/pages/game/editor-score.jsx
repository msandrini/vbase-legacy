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
			{parseInt(score, 10) >= 2 &&
				<div className={`numbers score${String(score).replace('.', '-')}`}>
					<Scorebar score={score} size="100" />
					<strong>{scoreParts[0]}</strong>
					<small>{scoreParts[1] ? scoreParts[1] : '0'}</small>
				</div>}
			{parseInt(score, 10) === 1 &&
				<div className="numbers score1">
					<strong>{t('n-a')}</strong>
					<small>{t('not-applicable')}</small>
				</div>}
			{parseInt(score, 10) === 0 &&
				<div className="numbers score0">
					<small>{t('not-scored')}</small>
				</div>}
		</div>
	</div>
}

export default GameEditorScore
