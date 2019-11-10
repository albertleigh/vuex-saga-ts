import { delay, all, putResolve, takeLatest } from 'redux-saga/effects';

import { SagaActions, MutationsActions } from '@/store/application'

import applicationSaga, { handleApplicationLoading } from '@/store/sagas/application';

describe('Application saga',()=>{

    describe('handleApplicationLoading saga',()=>{
        it('default handled correctly',()=>{
            const gen = handleApplicationLoading();
            expect(gen.next().value).toEqual(all([
                delay(3000),
            ]));
            expect(gen.next().value).toEqual(putResolve(MutationsActions.ready()));
            expect(gen.next().done).toBeTruthy();
        })
    })

    it('default function register all event', ()=>{
        const gen = applicationSaga();
        expect(gen.next().value).toEqual(takeLatest(SagaActions.start,handleApplicationLoading));
        expect(gen.next().done).toBeTruthy();
    })

})
