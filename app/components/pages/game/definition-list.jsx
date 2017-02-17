import React from 'react'

import t, { lang } from '../../../i18n'

const _getCompanies = companies => companies.map(c => 
    c && <span key={c}>{c}</span>)
const _getGenres = genres => genres.map(g => 
    g && <span key={g.title[lang]}>{t(`sgn__${g.super}`)} - {g.title[lang]}</span>)
const _getSeries = series => series.map(s => 
    s && <span key={s}>{s}</span>)
const _getAddOns = addOns => addOns.map(a => 
    a && <span key={a.title[lang]}>{a.title[lang]} - {a.type}</span>)
const _getReleaseLocals = locals => locals.map(l => 
    l && <span key={l}>{t(`loc__${l}`)}</span>)

const GameDefinitionList = ({game}) => <dl>
    <dt>{t('release-year')}</dt>
    <dd className="year">{game.year}</dd>

    <dt>{t('developed-by')}</dt>
    <dd className="companies">{_getCompanies(game.companies)}</dd>

    <dt>{t('genres')}</dt>
    <dd className="genres">{_getGenres(game.genres)}</dd>

    <dt>{t('cartridge-size')}</dt>
    <dd className="size">{game.cartridgeSize}</dd>

    {game.series && <dt>{t('series')}</dt>}
    {game.series && <dd className="series">{_getSeries(game.series)}</dd>}

    {game.addOns && <dt>{t('add-ons')}</dt>}
    {game.addOns && <dd className="addons">{_getAddOns(game.addOns)}</dd>}

    <dt>{t('released-in')}</dt>
    <dd className="locals">{_getReleaseLocals(game.releasedIn)}</dd>
</dl>

export default GameDefinitionList