export const BASE_URL = 'https://localhost:5000/'
export const ITEMS_PER_PAGE = 20
export const DOCUMENT_TITLE = 'VBase'
export const DOCUMENT_TITLE_SEPARATOR = '-'
export const MAX_REVIEW_LENGTH = 2000

export const LOGOUT = {
	REQUESTED: 'LOGOUT_REQUESTED',
	PERFORMED: 'LOGOUT_PERFORMED'
}

export const LOGIN = {
	REQUESTED: 'LOGIN_REQUESTED',
	PERFORMED: 'LOGIN_PERFORMED',
	CHECKREQUESTED: 'LOGIN_CHECKREQUESTED'
}

export const SEARCH = {
	TOGGLEADVANCED: 'SEARCH_TOGGLEADVANCED',
	CHANGEDSIMPLE: 'SEARCH_CHANGEDSIMPLE',
	SUBMITTEDSIMPLE: 'SEARCH_SUBMITTEDSIMPLE',
	CHANGEDADVANCED: 'SEARCH_CHANGEDADVANCED',
	SUBMITTEDADVANCED: 'SEARCH_SUBMITTEDADVANCED',
	RESETFIELDREQUESTED: 'SEARCH_RESETFIELDREQUESTED'
}

export const RESULTS = {
	REQUESTED: 'RESULTS_REQUESTED',
	RETRIEVED: 'RESULTS_RETRIEVED',
	FAILED: 'RESULTS_FAILED',
	PAGEREQUESTED: 'RESULTS_PAGEREQUESTED',
	BACKREQUESTED: 'RESULTS_BACKREQUESTED'
}

export const CONTACT = {
	VALUECHANGED: 'CONTACT_VALUECHANGED',
	SUBMITTED: 'CONTACT_SUBMITTED',
	FAILED: 'CONTACT_FAILED',
	SENTSUCCESFULLY: 'CONTACT_SENTSUCCESFULLY'
}

export const GAME = {
	REQUESTEDINFO: 'GAME_REQUESTEDINFO',
	FAILEDONURL: 'GAME_FAILEDONURL',
	FAILEDLOADING: 'GAME_FAILEDLOADING',
	INFORETRIEVED: 'GAME_INFORETRIEVED',
	RELATEDGAMESRETRIEVED: 'GAME_RELATEDGAMESRETRIEVED',
	IMAGELISTRETRIEVED: 'GAME_IMAGELISTRETRIEVED',
	CHANGEIMAGEREQUESTED: 'GAME_CHANGEIMAGEREQUESTED',
	IMAGECHANGED: 'GAME_IMAGECHANGED'
}

export const INFO = {
	CONTENTREQUESTED: 'INFO_CONTENTREQUESTED',
	FAILEDLOADING: 'INFO_FAILEDLOADING',
	CONTENTRETRIEVED: 'INFO_CONTENTRETRIEVED',
	BACKREQUESTED: 'INFO_BACKREQUESTED'
}

export const USERINPUT = {
	OVERLAYREQUESTED: 'USERINPUT_OVERLAYREQUESTED',
	OVERLAYDISMISSED: 'USERINPUT_OVERLAYDISMISSED',
	LISTREQUESTED: 'USERINPUT_LISTREQUESTED',
	LISTRETRIEVED: 'USERINPUT_LISTRETRIEVED',
	LISTFAILED: 'USERINPUT_LISTFAILED',
	SCORECHANGED: 'USERINPUT_SCORECHANGED',
	TEXTCHANGED: 'USERINPUT_TEXTCHANGED',
	SUBMITTED: 'USERINPUT_SUBMITTED',
	ACCEPTED: 'USERINPUT_ACCEPTED',
	SENDFAILED: 'USERINPUT_SENDFAILED'
}
