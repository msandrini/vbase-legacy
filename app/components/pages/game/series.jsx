import React from 'react'
import { Link } from 'react-router'
import { _getLink as gameLinkStr } from '../../results/game-link.jsx'

import t from '../../../i18n'
import Icon from '../../shared/icon.jsx'
import './series.styl'

const _getLink = (game, currentGameId) => <li key={game._id}>
	{game._id !== currentGameId ?
		<Link className="btn ball" to={gameLinkStr(game._id)}>
			<Icon type="next" size="10" />
		</Link> :
		<span className="ball">
			<Icon type="check" size="10" />
		</span>}
	{game._id !== currentGameId ?
		<Link to={gameLinkStr(game._id)}>{game.title}</Link> :
		<span>{game.title}</span>}
</li>

const GameSeries = ({series, seriesGames, currentGameId}) => <div className="series">
	{series && <h6>
		{t('series')}
		{series.map(s => <Link key={s.id} className="info-link" to={`/${t('url__info')}/${t('url__series')}/${s.id}`}>{s.title}</Link>)}
		{series && seriesGames.total && <small>
			{seriesGames.total} {t('game', { plural: seriesGames.total })} {t('from-this-series',
				{ plural: { comparison: seriesGames.total, key: 'from-these-series' } })}
		</small>}
	</h6>}
	{series && seriesGames.games && <ul>
		{seriesGames.games.map(g => _getLink(g, currentGameId))}
	</ul>}
</div>

export default GameSeries
