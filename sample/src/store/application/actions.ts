import { ActionTree } from 'vuex';
import { createAction } from 'vuex-saga-ts'

import { IApplicationState } from './types';
import { IRootState } from '../types';

export const SagaActions = {
    start:createAction<void>('APPLICATION_START')
}

// thunk actions go below
export const actions: ActionTree<IApplicationState, IRootState> = {

}
