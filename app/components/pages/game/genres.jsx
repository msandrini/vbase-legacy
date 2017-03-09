import React from 'react'
import { Link } from 'react-router'

import t, { lang } from '../../../i18n'
import './genres.styl'

const GameGenres = props => <div className="genres">
	<small>{t('genre', { plural: props.genres.length })}</small>
	{props.genres.length === 1 && props.genres[0] === null && <small>{t('none-registered')}</small>}
	{props.genres.map(g => g && g.id &&
		<Link className="info-link" to={`/${t('url__info')}/${t('url__genre')}/${g.id}`} key={g.id}>{g.title[lang]}</Link>)}
</div>

export default GameGenres
