import i18nStrings_en from './i18n/en.json'
import i18nStrings_pt_br from './i18n/pt-br.json'

const i18nDict = {
	en: i18nStrings_en,
	'pt-br': i18nStrings_pt_br
}

export const lang = window.lang || 'en'

const i18n = (key, replacements = []) => {
	const chosenLangStrings = i18nDict[lang]
	if (!chosenLangStrings) {
		return `*** Error: non-existing lang resource for "${lang}" ***`
	}
	if (!chosenLangStrings[key]) {
		return `*** Error: non-existing key "${key}" for lang "${lang}" ***`
	}
    if (replacements.length) {
    	return replacer(chosenLangStrings[key], replacements)
	} else {
        return chosenLangStrings[key]
    }
}

const replacer = (string, replacements) => {
	return string.replace(/{(\d+)}/g, (match, number) => {
		return typeof replacements[number] != 'undefined' ? replacements[number] : match
	})
}

export default i18n