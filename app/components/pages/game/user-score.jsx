import React from 'react'

import t from '../../../i18n'
import './user-score.styl'

const _getRounded = score => Math.round(score)
const _getTranslatedTimesString = times => times > 1 ? t('from-x-reviews') : t('from-one-review', [times])

const GameUserScore = ({reviews}) => <div className="score user-score">
    {reviews && <div className="ball">
        <span className="label">{t('user-score')}</span>
        <div className={`score${_getRounded(reviews.averageScore)}`}>
            {reviews.averageScore}
            <small>{_getTranslatedTimesString(reviews.timesReviewed)}</small>
        </div>
    </div>}
</div>

export default GameUserScore