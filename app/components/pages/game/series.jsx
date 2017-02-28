import React from 'react'
import { Link } from 'react-router'
import { _getLink as gameLinkStr } from '../../results/game-link.jsx'

import t from '../../../i18n'
import Icon from '../../shared/icon.jsx'
import './series.styl'

const GameSeries = ({series, seriesGames}) => <ul className="series">
	{series.map(s => <li key={s.id}>
		<h6>
			{t('series')} 
			<strong>{s.title}</strong>
			{s && seriesGames[s.id] && <small>{t('games-from-this-series')}</small>}
		</h6>
		{s && seriesGames[s.id] && <ul>
			{seriesGames[s.id].map(g => 
				<li>
					<Link className="btn ball" to={gameLinkStr(g.id, g.title)}><Icon type="next" size="10" /></Link>
					<Link to={gameLinkStr(g.id, g.title)}>{g.title}</Link>
				</li>)}
		</ul>}
	</li>)}
</ul>

export default GameSeries