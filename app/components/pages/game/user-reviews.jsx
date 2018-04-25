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
const _getNumReviews = reviews => (reviews && reviews.timesReviewed) || 0

const GameUserReviews = ({ userReviews, toggleAction, gameId }) => <div className="user-reviews">
	<a onClick={() => toggleAction({ gameId })}>
		<span className="first-text">
			{t('reviewed-by') + ' '}
			{_getNumReviews(userReviews) ?
				<strong>{_getNumReviews(userReviews) + ' ' +
					t('user', { plural: _getNumReviews(userReviews) })}</strong> : t('no-users')
			}
		</span>
		<span className="mobile-text">
			{t('review', { plural: _getNumReviews(userReviews) })} ({_getNumReviews(userReviews)})
		</span>
		<span className="action-text">
			{t(_getKeyForActionText(_getNumReviews(userReviews)))}
		</span>
		<span className={'btn ball ' + _getIcon(_getNumReviews(userReviews))}>
			<Icon type={_getIcon(_getNumReviews(userReviews))} size="11" />
		</span>
	</a>
	<GameUserReviewsOverlay />
</div>

const mapDispatchToProps = {
	toggleAction: createAction(USERINPUT.OVERLAYREQUESTED)
}

export default connect(null, mapDispatchToProps)(GameUserReviews)
