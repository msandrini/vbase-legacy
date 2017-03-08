import React from 'react'
import Scorebar from '../../shared/scorebar.jsx'

import t from '../../../i18n'
import './user-score.styl'

const _getRounded = score => Math.round(score)
const _getTranslatedTimesString = times => t('x-review', { plural: times, replacements: times })

const GameUserScore = ({reviews}) => <div className="score user-score">
    {reviews && <div className="ball">
        <span className="label">{t('user-score')}</span>
        <div className={`score${_getRounded(reviews.averageScore)}`}>
            <Scorebar score={reviews.averageScore} size="72" />
            <strong>{reviews.averageScore}</strong>
            <small>{_getTranslatedTimesString(reviews.timesReviewed)}</small>
        </div>
    </div>}
</div>

export default GameUserScore
