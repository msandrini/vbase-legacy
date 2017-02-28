import React, { Component } from 'react'
import { Link } from 'react-router'
import Scorebar from '../shared/scorebar.jsx'
import { BASE_URL } from '../../constants'

import t, { lang } from '../../i18n'
import './game-link.styl'

const _getGenre = game => {
	const genres = game.genreTitles
	if (genres && genres[0]) {
		return genres[0][lang] + (genres[1]? ' / ' + genres[1][lang] : '')
	}
	return ''
}
const _getCompany = game => {
	return game.companies[0] + (game.companies[1]? ' / ' + game.companies[1] : '')
}
const _getAka = game => {
	if (game.otherNames) {
		let namesComposed = [];
		for (const n of game.otherNames) {
			namesComposed.push(n.name);
		}
		return namesComposed.join(' / ');
	}
	return ''
}
export const _getLink = (id, title) => {
	const convertedName = title.replace(/[^a-zA-Z0-9\-]/g, '_');
	return `game/${convertedName}-${id}`;
}

class Results extends Component {
	render() {
		const {game} = this.props;
		return <Link className="game-link" to={_getLink(game._id, game.title)}>
			<figure><img src={BASE_URL + `image-gameplay/${game._id}.1`} alt={game.title} /></figure>
			<div className="content">
				<div className="aka">{_getAka(game)}</div>
				<h5>{game.title}</h5>
				<div className="supplementary-info">
					<Scorebar score={game.editorScore} size="85" />
					<strong>{_getGenre(game)}</strong> {t('made-by')} {_getCompany(game)}
				</div>
			</div>
		</Link>
	}
}
 export default Results