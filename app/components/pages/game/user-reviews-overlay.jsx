import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USERINPUT } from '../../../constants'
import { createAction } from '../../../utils'
import GameUserReviewUnit from './user-review-unit.jsx'
import GameUserReviewForm from './user-review-form.jsx'

import Icon from '../../shared/icon.jsx'
import t from '../../../i18n'
import './user-reviews-overlay.styl'

class GameUserReviewsOverlay extends Component {

	constructor() {
		super()
		this._toggleVisibility = this._toggleVisibility.bind(this)
		this._changeField = this._changeField.bind(this)
		this._sendOwnReview = this._sendOwnReview.bind(this)
		this._handleOverlayClick = this._handleOverlayClick.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.overlayVisible !== this.props.overlayVisible) {
			this._setBodyScroll(nextProps.overlayVisible)
		}
	}

	_setBodyScroll(isVisible) {
		const classList = document.body.classList
		isVisible ? classList.add('overlayed') : classList.remove('overlayed')
	}

	_toggleVisibility() {
		this.props.closeAction()
	}

	_changeField(field) {
		let fn = this.props.changeScoreAction
		if (field === 'text') {
			fn = this.props.changeTextAction
		}
		return value => fn({ value })
	}

	_sendOwnReview(e) {
		e.preventDefault()
		if (!this.props.isLoggedIn) {
			alert(t('login-required'))
		} else if (!this.props.ownScore) {
			alert(t('enter-score'))
		} else {
			this.props.submitAction({
				fields: {
					score: this.props.ownScore,
					text: this.props.ownText,
					game: this.props.gameId
				}
			})
		}
	}

	_handleOverlayClick(e) {
		e.stopPropagation()
		if (e.target.id === 'user-reviews-overlay') {
			this.props.closeAction()
		}
	}

	render() {
		return (
			<div id="user-reviews-overlay" onClick={this._handleOverlayClick} className={this.props.overlayVisible ? '' : 'inactive'}>
				<div className="window">
					<a className="btn ball close" onClick={this._toggleVisibility}>
						<Icon type="x" size="24" />
					</a>
					<h5>{t('user-reviews-for-this-game')}
						{this.props.reviews.length > 0 &&
							<small>{this.props.reviews.length + ' ' + t('review', { plural: this.props.reviews.length })}</small>}
					</h5>
					{this.props.reviews.length > 0 && <ul>
						{this.props.reviews.map((review, key) => <li key={key}>
							<GameUserReviewUnit review={review} />
						</li>)}
					</ul>}
					{this.props.reviews.length === 0 &&
						<div className="no-reviews">{t('no-reviews')}</div>}
					<GameUserReviewForm send={this._sendOwnReview} ownScore={this.props.ownScore} ownText={this.props.ownText}
						changeScore={this._changeField('score')} changeText={this._changeField('text')} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	overlayVisible: state.userInput.overlayVisible,
	isLoading: state.userInput.isLoading,
	isSending: state.userInput.isSending,
	reviews: state.userInput.reviews,
	listFailed: state.userInput.listFailed,
	sendFailed: state.userInput.sendFailed,
	ownScore: state.userInput.ownScore,
	ownText: state.userInput.ownText,
	isLoggedIn: state.login.loggedIn,
	gameId: state.game.gameId
})

const mapDispatchToProps = {
	closeAction: createAction(USERINPUT.OVERLAYDISMISSED),
	submitAction: createAction(USERINPUT.SUBMITTED),
	changeScoreAction: createAction(USERINPUT.SCORECHANGED),
	changeTextAction: createAction(USERINPUT.TEXTCHANGED)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameUserReviewsOverlay)
