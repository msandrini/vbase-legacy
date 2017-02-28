import React from 'react'
import reactStringReplace from 'react-string-replace'
import { joinText } from '../../../utils'

import t from '../../../i18n'
import './locals.styl'

const _getLocalsObject = ({releasedIn, otherNames}) => {
	const localNames = otherNames && otherNames.filter(on => on.reasonForName === 'local') || []
	let locals = {}
	for (const ln of localNames) {
		locals[t(`loc__${ln.place}`)] = ln.name
	}
	for (const l of releasedIn) {
		if (!locals[t(`loc__${l}`)]) {
			locals[t(`loc__${l}`)] = false
		}
	}
	return locals
}

const _getLocalsString = props => {
	const locals = _getLocalsObject(props);
	let localsStr = []
	let localKeys = Object.keys(locals)
	for (const l of localKeys) {
		localsStr.push(t('in') + ` ${l}` + (locals[l] ? (` ${t('as')} *${locals[l]}*`) : ''))
	}
	if (localKeys.length > 1) {
		return joinText(localsStr, ', ', ` ${t('and')} `)
	} else {
		return t('only-in') + ' ' + localKeys[0]
	}
}

const _getReplacedLocalsString = props => {
	const replaceFn = (match, index) => <strong key={index}>{match}</strong>
	return reactStringReplace(_getLocalsString(props), /\*([^\*]+)\*/g, replaceFn)
}

const GameLocals = props => <p className="locals">
	{t('released')} {_getReplacedLocalsString(props)}
</p>
export default GameLocals