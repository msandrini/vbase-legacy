import React from 'react'
import { Link } from 'react-router'

import t, { lang } from '../../../i18n'
import './genres.styl'

const GameGenres = props => <div className="genres">
    <small>{t('genre', { plural: props.genres.length })}</small>
    {props.genres.map(g => <Link className="info-link" to={`/info/genre/${g.id}`} key={g.id}>{g.title[lang]}</Link>)}
</div>

export default GameGenres