import { select, delay, all, call, put, putResolve, takeLatest } from 'redux-saga/effects';

import { SagaActions, MutationsActions } from '../application'

export function* handleApplicationLoading() {
    yield all([
        delay(3000)
    ]);
    yield putResolve(MutationsActions.ready())
}

export default function* () {
    yield takeLatest(SagaActions.start,handleApplicationLoading);
}
