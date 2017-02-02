/* React Libs */
import React from 'react';
import ReactDOM from 'react-dom';

/* Additional React Libs */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/* Saga init */
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/root';

/* Containers */
import AppContainer from './components/app.container.jsx';
import LoginContainer from './components/login.container.jsx';

/* Reducers */
import loginReducer from './reducers/login.reducer';

/* Router helper */
import { authRedirection } from './auth';

/* Styles */
/// postcss

/* Middleware routines */
const combinedReducers = combineReducers({
    login: loginReducer,
    routing: routerReducer
});
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

/* Router mapping */
const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppContainer}>
                <IndexRoute />
                <Route path="login" component={LoginContainer} onEnter={authRedirection} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

