import React from 'react'
import reactStringReplace from 'react-string-replace'
import { joinText } from '../../../utils'

import t from '../../../i18n'
import './release-places.styl'

const _getReleasePlacesObject = ({releasePlaces, otherNames}) => {
	const localNames = (otherNames && otherNames.filter(on => on.reasonForName === 'local')) || []
	let releasePlacesObj = {}
	const placeKeysWithNames = []
	if (releasePlaces) {
		for (const ln of localNames) {
			for (const pn of ln.place) {
				placeKeysWithNames.push(t(`loc__${pn}`))
			}
			releasePlacesObj[joinText(placeKeysWithNames, ', ', ` ${t('and')} `)] = ln.name
		}
		for (const p of releasePlaces) {
			if (!placeKeysWithNames.includes(t(`loc__${p}`))) {
				releasePlacesObj[t(`loc__${p}`)] = false
			}
		}
	}
	return releasePlacesObj
}

const _getPlacesString = props => {
	const places = _getReleasePlacesObject(props)
	let placesStr = []
	let placeKeys = Object.keys(places)
	for (const p of placeKeys) {
		placesStr.push(t('in') + ` ${p}` + (places[p] ? (` ${t('as')} *${places[p]}*`) : ''))
	}
	if (placeKeys.length > 1) {
		return joinText(placesStr, ', ', ` ${t('and')} `)
	} else if (placeKeys.length === 1) {
		return t('only-in') + ' ' + placeKeys[0]
	} else {
		return t('in-???-no-info')
	}
}

const _getReplacedPlacesString = props => {
	const replaceFn = (match, index) => <strong key={index}>{match}</strong>
	return reactStringReplace(_getPlacesString(props), /\*([^\*]+)\*/g, replaceFn)  // eslint-disable-line no-useless-escape
}

const GamePlaces = props => <p className="places">
	{t('released')} {_getReplacedPlacesString(props)}
</p>

export default GamePlaces
