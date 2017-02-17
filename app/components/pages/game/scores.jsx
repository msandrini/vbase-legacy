import React from 'react'

import t from '../../../i18n'

const _getRoundedScore = score => Math.round(score)

const GameScores = props => <dl className="scores">
    <dt>{t('editor-score')}</dt>
    <dd className={`editor score${_getRoundedScore(props.editorScore)}`}>{props.editorScore}</dd>
    
    {props.userReviews && <dt>{t('user-score')}</dt>}
    {props.userReviews && <dd className={`user score${_getRoundedScore(props.userReviews.averageScore)}`}>{props.userReviews.averageScore}</dd>}
</dl>

export default GameScores