import loginWatcher from './login.saga';

const rootSaga = function*() {
    yield [
        loginWatcher()
    ];
};

export { rootSaga };