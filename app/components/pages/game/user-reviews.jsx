import React from 'react'
import { connect } from 'react-redux'
import { USERINPUT } from '../../../constants'
import { createAction } from '../../../utils'

import GameUserReviewsOverlay from './user-reviews-overlay.jsx'
import Icon from '../../shared/icon.jsx'
import t from '../../../i18n'
import './user-reviews.styl'

const _getKeyForActionText = reviews => reviews ? 'read-write' : 'write-a-review'
const _getIcon = reviews => reviews ? 'plus' : 'pencil'

const GameUserReviews = ({ userReviews, toggleAction, gameId }) => <div className="user-reviews">
	<a onClick={() => toggleAction({ gameId })}>
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
	<GameUserReviewsOverlay />
</div>

const mapDispatchToProps = {
	toggleAction: createAction(USERINPUT.OVERLAYREQUESTED)
}

export default connect(null, mapDispatchToProps)(GameUserReviews)
