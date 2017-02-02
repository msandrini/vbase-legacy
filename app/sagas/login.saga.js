import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { LOGIN } from '../constants';

export const loginActionCreator = function*(action) {
    
}

const loginWatcher = function*() {
    yield * takeLatest(LOGIN.REQUESTED, loginActionCreator);
}

export default loginWatcher;
