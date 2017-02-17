import React, { Component } from 'react'
import { Link } from 'react-router'
import Scorebar from './scorebar.jsx'
import { BASE_URL } from '../../constants'

import t from '../../i18n'

const _getGenre = game => {
	return game.genres[0] + (game.genres[1]? ' / ' + game.genres[1] : '')
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
const _getLink = game => {
	const convertedName = game.title.replace(/[^a-zA-Z0-9\-]/g, '_');
	return `game/${convertedName}-${game._id}`;
}

class Results extends Component {
	render() {
		const {game} = this.props;
		return <Link className="game-link" to={_getLink(game)}>
	    		<figure><img src={BASE_URL + `image-gameplay/${game._id}.1`} alt={game.title} /></figure>
	    		<div className="content">
		    		<h5>{game.title}</h5>
		    		<div className="aka">{_getAka(game)}</div>
		    		<div className="supplementary-info">
		    			<Scorebar score={game.editorScore} />
		    			<strong>{_getGenre(game)}</strong> {t('made-by')} {_getCompany(game)}
		    		</div>
		    	</div>
	    	</Link>
	}
}
 export default Results