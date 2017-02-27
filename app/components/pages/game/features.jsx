import React from 'react'

import t, { lang } from '../../../i18n'

const _getCompanies = companies => companies.map(c => 
    c && <span key={c}>{c}</span>)
const _getGenres = genres => genres.map(g => 
    g && <span className={`genre super-${g.super}`} key={g.title[lang]}>{t(`sgn__${g.super}`)} - {g.title[lang]}</span>)
const _getAddOns = addOns => addOns && addOns.map(a => 
    a && <span key={a.title[lang]}>{a.title[lang]} - {a.type}</span>)
const _getReleaseLocals = locals => locals.map(l => 
    l && <span key={l}>{t(`loc__${l}`)}</span>)

const GameFeatures = ({game, type}) => <div className="features">
    <p className="companies">{t('by')} {_getCompanies(game.companies)}</p>
    <p className="year-locals">
        {t('released-in')} {game.year}
        <small>{t('in')} {_getReleaseLocals(game.releasedIn)}</small>
    </p>
    <div className="media">
        {game.cartridgeSize} <small>Mbits</small>
        <p className="details">
            <span>{t('common-cartridge')}</span>
            <span>{_getAddOns(game.addOns) || t('no-peripherals-support-cartridge-addons')}</span>
        </p>
    </div>
    <div className="genres">
        {_getGenres(game.genres)}
    </div>
</div>

export default GameFeatures