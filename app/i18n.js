import i18nStringsEn from './i18n/en.json'
import i18nStringsBr from './i18n/pt-br.json'

const i18nDict = {
	en: i18nStringsEn,
	'pt-br': i18nStringsBr
}

export const lang = window.lang || 'en'

/**
 * i18n core
 * @param key string | [string, object] key or [key, {params}]]
 * @param parameters Object
 * @param parameters.replacements string[]
 * @param parameters.plural Object
 * @param parameters.plural.key string
 * @param parameters.plural.comparison Boolean | function
 */
const i18n = (key, parameters = {}, genericPluralParticle = 's') => {

	/* Checks file content */
	const chosenLangStrings = i18nDict[lang]
	if (!chosenLangStrings) {
		return `*** Error: non-existing lang resource for "${lang}" ***`
	}
	/* Checks key existence */
	if (!chosenLangStrings[key]) {
		return `*** Error: non-existing key "${key}" for lang "${lang}" ***`
	}
	/* Generate translation key for single value */
	let value = chosenLangStrings[key]
	/* Verifies if plural was requested */
	if (parameters.plural) {
		let shallBePlural
		if (typeof parameters.plural.comparison === 'function') {
			shallBePlural = parameters.plural.comparison()
		} else {
			shallBePlural = (typeof parameters.plural.comparison === 'boolean' ?
				(parameters.plural.comparison > 1) : (parameters.plural > 1))
		}
		if (shallBePlural) {
			if (typeof parameters.plural.key === 'string') {
				value = chosenLangStrings[parameters.plural.key]
			} else {
				value = chosenLangStrings[key] + genericPluralParticle
			}
		}
	}
	/* Outputs single value or plural with parameter replacement */
	if (parameters.replacements) {
		return _replacer(value, parameters.replacements)
	} else {
		return value
	}

}

const _replacer = (string, replacements) => {
	if (typeof replacements !== 'object') {
		replacements = [String(replacements)]
	}
	return string.replace(/{(\d+)}/g, (match, number) => {
		return typeof replacements[number] !== 'undefined' ? replacements[number] : match
	})
}

export default i18n
