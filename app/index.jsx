/* React Libs */
import React from 'react'
import ReactDOM from 'react-dom'

/* Additional React Libs */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

/* Saga init */
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root'

/* Containers */
import AppWrapper from './components/app.jsx'
import Results from './components/results/results.jsx'
import TermsPage from './components/pages/terms.jsx'
import ContactPage from './components/pages/contact.jsx'
import GamePage from './components/pages/game.jsx'
import InfoPage from './components/pages/info.jsx'

/* Reducers */
import loginReducer from './reducers/login.reducer'
import searchReducer from './reducers/search.reducer'
import resultsReducer from './reducers/results.reducer'
import contactReducer from './reducers/contact.reducer'

/* Styles */
import './styles/main.styl'

/* Middleware routines */
const combinedReducers = combineReducers({
    login: loginReducer,
    search: searchReducer,
    contact: contactReducer,
    results: resultsReducer,
    routing: routerReducer
})
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

/* Router mapping */
const history = syncHistoryWithStore(hashHistory, store)
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppWrapper}>
                <IndexRedirect to="/all-games" />
                <Route path="all-games(/:page)" component={Results} />
                <Route path="search/:names(/:page)" component={Results} />
                <Route path="advanced-search/:query(/:page)" component={Results} />
                <Route path="game/:game" component={GamePage} />
                <Route path="info/:subject" component={InfoPage} />
                <Route path="terms-privacy" component={TermsPage} />
                <Route path="contact" component={ContactPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)

