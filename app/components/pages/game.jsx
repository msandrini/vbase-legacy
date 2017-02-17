import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from '../shared/title.jsx'
import Spinner from '../shared/spinner.jsx'
import { GAME } from '../../constants'
import { createAction } from '../../utils'

import GamePicture from './game/picture.jsx'
import GameScores from './game/scores.jsx'
import GameDefinitionList from './game/definition-list.jsx'
import GameUserReviews from './game/user-reviews.jsx'

import t, { lang } from '../../i18n'
import '../../styles/game.styl'

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
        this.props.requestAction({ id:gameId })
    }
    _getOtherNamesFormatted(otherNames) {
        if (otherNames && otherNames.length) {
            return otherNames.map(entry => {
                return <div>{entry.name} <small>{entry.reasonForName}</small></div>
            })
        }
        
    }
    _getTitle(title) {
        return <strong>{title || t('loading-game-info')}</strong>
    }
    render() {
        const game = this.props.info
        return <div id="game">
            {game && game.title && <GamePicture gameId={this.props.gameId} />}
            {this.props.isLoading && <div><Title main={t('loading-game-info')} /><Spinner /></div>}
            {this.props.hasFailed && <div><Title main={t('error')} /><FailureMessage message={this.props.hasFailed} /></div>}
            {game && game.title && <div>
                <Title main={this._getTitle(game.title)} details={this._getOtherNamesFormatted(game.otherNames)} />
                <GameScores editorScore={game.editorScore} userReviews={game.userReviews} />
                <GameDefinitionList game={game} />
                <article className="editor-review">{game.editorReview[lang]}</article>
                {game.userReviews && <GameUserReviews reviews={game.userReviews} />}
            </div>}
        </div>
    }
}

const mapStateToProps = state => ({
	isLoading: state.game.isLoading,
	hasFailed: state.game.hasFailed,
    info: state.game.info,
    gameId: state.game.gameId
});

const mapDispatchToProps = {
	requestAction: createAction(GAME.REQUESTEDINFO),
    failedAction: createAction(GAME.FAILEDONURL)
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)