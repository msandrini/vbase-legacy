import React from 'react'
import reactStringReplace from 'react-string-replace'

import t, { lang } from '../../../i18n'
import Icon from '../../shared/icon.jsx'
import './user-review-unit.styl'

const _getRounded = score => Math.floor(score)
const _getName = name => (typeof name === 'object') ? name.join(' ') : name

const GameUserReviewUnit = ({review}) => <div>
    <span className="avatar ball">
        <Icon type="person" size="16" />
    </span>
    <span className={`score ball score${_getRounded(review.score)}`}>
        {t('score')}: <strong>{review.score}</strong>
    </span>
    <div className="user">
        {t('by')}: <strong>{review.userInfo && _getName(review.userInfo.name)}</strong>
    </div>
    <time dateTime={review.added}>
        {new Date(review.added).toLocaleDateString(t('date-locale'))}
    </time>
    {review.text && <p className={(review.lang !== lang) ? 'other-language' : ''}>
        {(review.lang !== lang) ? <small>{t('written-in') + ': ' + t(`language-${review.lang}`)}</small> : ''}
        {reactStringReplace(review.text, '\n', (v, k) => <br key={k} />)}
    </p>}
</div>

export default GameUserReviewUnit
