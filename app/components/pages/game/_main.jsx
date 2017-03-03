import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from '../../shared/title.jsx'
import Spinner from '../../shared/spinner.jsx'
import { GAME } from '../../../constants'
import { createAction } from '../../../utils'
import { Link } from 'react-router'

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

const infoTypes = ['year', 'companies', 'genres', 'size', 'series', 'addons', 'locals']

class GamePage extends Component {
	constructor() {
		super()
	}
	componentWillMount() {
		const rawQuery = this.props.params.game
		const idMatch = rawQuery.match(/\-[a-f0-9]{24}/);
		if (idMatch && idMatch[0]) {
			const gameId = idMatch[0].substr(1)
			this._getGameInfo(gameId)
		} else {
			this.props.failedAction({ rawQuery })
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
	_getTitle(title) {
		return <strong>{title || t('loading-game-info')}</strong>
	}
	render() {
		const game = this.props.info
		return <div>
			{this.props.isLoading && <div><Title main={t('loading-game-info')} /><Spinner /></div>}
			{this.props.hasFailed && <div>
				<Title main={t('error')} />
				<FailureMessage message={this.props.hasFailed} />
			</div>}
			{game && game.title && <div>
				<Title main={this._getTitle(game.title)} details={this._getOtherNamesFormatted(game.otherNames)} />
				<div id="game-info">
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
});

const mapDispatchToProps = {
	requestAction: createAction(GAME.REQUESTEDINFO),
	failedAction: createAction(GAME.FAILEDONURL)
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)