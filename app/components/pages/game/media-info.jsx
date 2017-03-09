import React from 'react'
import { Link } from 'react-router'

import t, { lang } from '../../../i18n'
import './media-info.styl'

const _getAddOnsMarkup = addOns => {
	if (addOns && addOns.length) {
		let addOnsObj = { chip: [], peripheral: [] }
		for (const a of addOns) {
			addOnsObj[a.type].push(<Link className="info-link"
				to={`/${t('url__info')}/${t('url__addon')}/${a.id}`} key={a.id}>{a.title[lang]}</Link>)
		}
		let returnArray = []
		if (addOnsObj.peripheral) {
			returnArray.push(<span key="1">
				{t('cartridge-supports')} {addOnsObj.peripheral}
			</span>)
		}
		if (addOnsObj.chip) {
			returnArray.push(<span key="2">
				{returnArray.length ? ' ' + t('and-contains') : t('cartridge-contains')} {addOnsObj.chip}
			</span>)
		}
		return returnArray
	} else {
		return t('no-expansions-or-peripherals')
	}
}

const GameMediaInfo = props => <aside className="media-info">
	<div className="ball"><strong>{props.mediaSize}</strong><small>Mbits</small></div>
	<p>{_getAddOnsMarkup(props.addOns)}</p>
</aside>

export default GameMediaInfo
