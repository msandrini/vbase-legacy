import React from 'react'

import Icon from '../../shared/icon.jsx'
import t from '../../../i18n'
import './user-reviews.styl'

const _getKeyForActionText = reviews => reviews ? 'read-write' : 'write-a-review'
const _getIcon = reviews => reviews ? 'plus' : 'pencil'

const GameUserReviews = ({userReviews}) => <div className="user-reviews">
	<a>
		{t('reviewed-by') + ' '}
		{userReviews && userReviews.timesReviewed ?
			<strong>{userReviews.timesReviewed + ' ' +
				t('user', { plural: userReviews.timesReviewed })}</strong> : t('no-users')
		}
		<span className="action-text">
			{t(_getKeyForActionText(userReviews && userReviews.timesReviewed))}
		</span>
		<span className={'btn ball ' + _getIcon(userReviews && userReviews.timesReviewed)}>
			<Icon type={_getIcon(userReviews && userReviews.timesReviewed)} size="11" />
		</span>
	</a>
</div>

export default GameUserReviews
