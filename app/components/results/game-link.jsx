import React, { Component } from 'react'
import { Link } from 'react-router'
import Scorebar from '../shared/scorebar.jsx'
import { IMAGEGAME_URL } from '../../constants'

import t, { lang } from '../../i18n'
import './game-link.styl'

const _getGenres = genres => {
	if (genres && genres[0]) {
		return genres[0][lang] + (genres[1] ? ' / ' + genres[1][lang] : '')
	}
	return ''
}
const _getCompanies = companies => {
	return companies[0] + (companies[1] ? ' / ' + companies[1] : '')
}
const _getAka = game => {
	if (game.otherNames) {
		let namesComposed = []
		for (const n of game.otherNames) {
			namesComposed.push(n.name)
		}
		return namesComposed.join(' / ')
	}
	return ''
}
const _getSpecialStatus = status => {
	if (status.substr(0, 5) === 'proto') {
		return t('prototype')
	} else if (status === 'released-unlicensed') {
		return t('unlicensed')
	} else if (status === 'hack') {
		return t('hack')
	}
}
export const _getLink = id => `/${t('url__game')}/${id}`
const _getFirstImageUrl = id => `${IMAGEGAME_URL}${id}/1.png`

class Results extends Component {
	render() {
		const {game} = this.props
		return <Link className="game-link" to={_getLink(game._id, game.title)}>
			<figure><img src={_getFirstImageUrl(game._id)} alt={game.title} /></figure>
			<div className="content">
				<div className="aka">{_getAka(game)}</div>
				<h5>{game.title}</h5>
				<div className="supplementary-info">
					<Scorebar score={game.editorScore} size="85" />
					{game.specialStatus && <span className="special-status">{_getSpecialStatus(game.specialStatus)}</span>}
					<strong>{_getGenres(game.genreTitles)}</strong> {t('made-by')} {_getCompanies(game.companyNames)}
				</div>
			</div>
		</Link>
	}
}

export default Results
