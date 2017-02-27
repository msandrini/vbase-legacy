import React from 'react'

import t, { lang } from '../../../i18n'

const _getSeriesEntry = (s) => <li key={s}>
    <span>{t('series')}: <strong>{s}</strong></span>
    <a>{t('list-games-from-this-series')}</a>
</li>

const GameSeries = ({series}) => <ul className="series">
    {series && series.map(s => _getSeriesEntry(s))}
</ul>

export default GameSeries