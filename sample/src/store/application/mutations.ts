import { MutationTree } from 'vuex';
import { createAction } from 'vuex-saga-ts'

import { IApplicationState } from './types';

export const MutationsActions = {
    ready:createAction<void>('APPLICATION_READY')
}

export const mutations: MutationTree<IApplicationState> = {
    [''+MutationsActions.ready]:function(state){
        state.loading = false;
    }
}
