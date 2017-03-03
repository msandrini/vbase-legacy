import React from 'react'
import reactStringReplace from 'react-string-replace'
import { joinText } from '../../../utils'

import t from '../../../i18n'
import './release-places.styl'

const _getPlacesObject = ({releasePlaces, otherNames}) => {
	const localNames = otherNames && otherNames.filter(on => on.reasonForName === 'local') || []
	let places = {}
	for (const ln of localNames) {
		places[t(`loc__${ln.place}`)] = ln.name
	}
	for (const p of releasePlaces) {
		if (!places[t(`loc__${p}`)]) {
			places[t(`loc__${p}`)] = false
		}
	}
	return places
}

const _getPlacesString = props => {
	const places = _getPlacesObject(props);
	let placesStr = []
	let placeKeys = Object.keys(places)
	for (const p of placeKeys) {
		placesStr.push(t('in') + ` ${p}` + (places[p] ? (` ${t('as')} *${places[p]}*`) : ''))
	}
	if (placeKeys.length > 1) {
		return joinText(placesStr, ', ', ` ${t('and')} `)
	} else {
		return t('only-in') + ' ' + placeKeys[0]
	}
}

const _getReplacedPlacesString = props => {
	const replaceFn = (match, index) => <strong key={index}>{match}</strong>
	return reactStringReplace(_getPlacesString(props), /\*([^\*]+)\*/g, replaceFn)
}

const GamePlaces = props => <p className="places">
	{t('released')} {_getReplacedPlacesString(props)}
</p>
export default GamePlaces