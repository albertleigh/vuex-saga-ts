import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

import { IApplicationState } from './types';
import { IRootState } from '../types';

export const state:IApplicationState = {
    loading: true,
}

const namespaced: boolean = false;

export {SagaActions} from './actions';
export {MutationsActions} from './mutations';

export const application:Module<IApplicationState,IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
