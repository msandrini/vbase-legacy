import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageTitle from '../../shared/page-title.jsx'
import Title from '../../shared/title.jsx'
import FailureMessage from '../../shared/failure-message.jsx'
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

import t, { lang } from '../../../i18n'
import './_main.styl'

// const infoTypes = ['year', 'companies', 'genres', 'size', 'series', 'addons', 'locals']
const _getAggregateRatings = game => (game.userReviews && game.userReviews.averageScore) ?
	(game.editorScore + game.userReviews.averageScore) / 2 : game.editorScore
const _getTimesReviewed = game => (game.userReviews && game.userReviews.timesReviewed) ?
	(1 + game.userReviews.timesReviewed) : 1

class GamePage extends Component {
	constructor() {
		super()
		this._changeImage = this._changeImage.bind(this)
	}
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

	_changeImage(increment) {
		this.props.changeImageAction({ increment })
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
					<GamePicture gameId={this.props.gameId} current={this.props.currentImage}
						changeImage={this._changeImage} total={this.props.images} />
					<div className="main-box">
						<GamePlaces releasePlaces={game.releasePlaces} otherNames={game.otherNames} />
						<GameEditorScore score={game.editorScore} />
						<GameUserScore reviews={game.userReviews} />
						<GameEditorReview editorReview={game.editorReview} />
						<GameUserReviews userReviews={game.userReviews} gameId={this.props.gameId} />
					</div>
					<div className="outer-box">
						<GameBasicInfo year={game.year} companies={game.companies} />
						<GameGenres genres={game.genres} />
					</div>
					<GameSeries series={game.series} seriesGames={this.props.seriesGames} currentGameId={this.props.gameId} />
					<GameMediaInfo mediaSize={game.cartridgeSize} addOns={game.addOns} />
				</div>
				<script type="application/ld+json">
					{`{
						"@context": "http://schema.org",
						"@type": "Review",
						"author": {
							"@type": "Person",
							"name": "Marcos Sandrini Lemos"
						},
						"itemReviewed": {
							"@type": "VideoGame",
							"name": "${game.title}",
							"gamePlatform": "Super Nintendo Entrertainment System",
							"applicationCategory": "Game",
							"aggregateRating": {
								"bestRating": "10",
								"worstRating": "1",
								"ratingValue": "${_getAggregateRatings(game)}",
								"ratingCount: "${_getTimesReviewed(game)}"
							}
						},
						"reviewBody":"${game.editorReview[lang]}",
						"reviewRating": {
							"bestRating": "10",
							"worstRating": "1",
							"ratingValue": "${game.editorScore}"
						}
					}`}
				</script>
			</div>}
		</div>
	}
}

const mapStateToProps = state => ({
	isLoading: state.game.isLoading,
	hasFailed: state.game.hasFailed,
	info: state.game.info,
	gameId: state.game.gameId,
	seriesGames: state.game.seriesGames,
	images: state.game.images,
	currentImage: state.game.currentImage
})

const mapDispatchToProps = {
	requestAction: createAction(GAME.REQUESTEDINFO),
	failedAction: createAction(GAME.FAILEDONURL),
	changeImageAction: createAction(GAME.CHANGEIMAGEREQUESTED)
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
