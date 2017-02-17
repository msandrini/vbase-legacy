import React from 'react'

import t from '../../../i18n'

const GameUserReviews = ({reviews}) => <a className="user-reviews-trigger">
    <div>{t('reviewed-by')} {reviews.timesReviewed} {reviews.timesReviewed > 1 ? t('users') : t('user')}</div>
</a>

export default GameUserReviews