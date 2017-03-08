import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageTitle from '../../shared/page-title.jsx'
import Title from '../../shared/title.jsx'
import Spinner from '../../shared/spinner.jsx'
import { GAME } from '../../../constants'
import { createAction } from '../../../utils'

import GamePicture from './picture.jsx'
import GameEditorScore from './editor-score.jsx'
import GameUserScore from './user-score.jsx'
import GamePlaces from './release-places.jsx'
import GameEditorReview from './editor-review.jsx'
import GameUserReviews from './user-reviews.jsx'
import GameSeries from './series.jsx'
import GameMediaInfo from './media-info.jsx'
import GameBasicInfo from './basic-info.jsx'
import GameGenres from './genres.jsx'

import t from '../../../i18n'
import './_main.styl'

// const infoTypes = ['year', 'companies', 'genres', 'size', 'series', 'addons', 'locals']

class GamePage extends Component {

	componentWillMount() {
		this._initPage(this.props.params.game, this.props.failedAction)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.game !== this.props.params.game) {
			this._initPage(nextProps.params.game, this.props.failedAction)
		}
	}

	_initPage(gameId, failedAction) {
		const gameIdIsOk = /[a-z0-9-]+/.test(gameId)
		if (gameIdIsOk) {
			this._getGameInfo(gameId)
		} else {
			failedAction({ gameId })
		}
	}
	_getGameInfo(gameId) {
		this.props.requestAction({ id: gameId })
	}
	_getOtherNamesFormatted(otherNames) {
		if (otherNames && otherNames.length) {
			return otherNames.map(entry => {
				return <div className="other-name">
					<small>{t('onr__' + entry.reasonForName)}</small>
					<strong>{entry.name}</strong>
				</div>
			})
		}

	}

	render() {
		const game = this.props.info
		return <div>
			{this.props.isLoading && <div>
				<Title main={t('loading-game-info')} />
				<Spinner />
			</div>}
			{this.props.hasFailed && <div>
				<Title main={t('error')} />
				<FailureMessage message={this.props.hasFailed} />
			</div>}
			{game && game.title && <div>
				<PageTitle title={game.title + ` (${t('game')})`} />
				<Title main={<strong>{game.title}</strong>} details={this._getOtherNamesFormatted(game.otherNames)} />
				<div id="game-info">
					{game.specialStatus && <span className="special-status">{t('sps__' + game.specialStatus)}</span>}
					<GamePicture gameId={this.props.gameId} />
					<div className="main-box">
						<GamePlaces releasePlaces={game.releasePlaces} otherNames={game.otherNames} />
						<GameEditorScore score={game.editorScore} />
						<GameUserScore reviews={game.userReviews} />
						<GameEditorReview editorReview={game.editorReview} />
						<GameUserReviews userReviews={game.userReviews} />
					</div>
					<div className="outer-box">
						<GameBasicInfo year={game.year} companies={game.companies} />
						<GameGenres genres={game.genres} />
					</div>
					<GameSeries series={game.series} seriesGames={this.props.seriesGames} currentGameId={this.props.gameId} />
					<GameMediaInfo mediaSize={game.cartridgeSize} addOns={game.addOns} />
				</div>
			</div>}
		</div>
	}
}

const mapStateToProps = state => ({
	isLoading: state.game.isLoading,
	hasFailed: state.game.hasFailed,
	info: state.game.info,
	gameId: state.game.gameId,
	seriesGames: state.game.seriesGames
})

const mapDispatchToProps = {
	requestAction: createAction(GAME.REQUESTEDINFO),
	failedAction: createAction(GAME.FAILEDONURL)
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
