/* React Libs */
import React from 'react'
import ReactDOM from 'react-dom'

/* Additional React Libs */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

/* Utils and i18n */
import { optimizeScroll } from './utils'
import t from './i18n'

/* Saga init */
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root'

/* Containers */
import AppWrapper from './components/app.jsx'
import Results from './components/results/_main.jsx'
import TermsPage from './components/pages/terms.jsx'
import ContactPage from './components/pages/contact.jsx'
import GamePage from './components/pages/game/_main.jsx'
import InfoPage from './components/pages/info.jsx'

/* Reducers */
import loginReducer from './reducers/login.reducer'
import searchReducer from './reducers/search.reducer'
import resultsReducer from './reducers/results.reducer'
import contactReducer from './reducers/contact.reducer'
import gameReducer from './reducers/game.reducer'
import infoReducer from './reducers/info.reducer'
import userInputReducer from './reducers/user-input.reducer'

/* Middleware routines */
const combinedReducers = combineReducers({
	login: loginReducer,
	search: searchReducer,
	contact: contactReducer,
	results: resultsReducer,
	game: gameReducer,
	info: infoReducer,
	routing: routerReducer,
	userInput: userInputReducer
})
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

/* Router mapping */
const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => {
	if (location.pathname === '/' + t('url__other-language-root')) {
		document.location.reload()
	}
})
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={AppWrapper}>
				<IndexRedirect to={t('url__all-games')} />
				<Route path={t('url__all-games') + '(/:page)'} component={Results} />
				<Route path={t('url__search') + '/:names(/:page)'} component={Results} />
				<Route path={t('url__advanced-search') + '(/:page)'} component={Results} />
				<Route path={t('url__game') + '/:game'} component={GamePage} />
				<Route path={t('url__info') + '/:subject/:key'} component={InfoPage} />
				<Route path={t('url__terms-privacy')} component={TermsPage} />
				<Route path={t('url__contact')} component={ContactPage} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
)

/* Other */
window.addEventListener('scroll', optimizeScroll, false)
