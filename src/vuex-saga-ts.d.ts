import Vue from 'vue';
import {SagaDispatchActionFun, SagaDispatchFun} from "./types";

declare module '@vue/composition-api/dist/component/component' {
    interface SetupContext {
        readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
    }
}

declare module 'vuex' {
    interface Store<S>{
        sagaDispatch:SagaDispatchFun;
        sagaDispatchAction:SagaDispatchActionFun;
    }
}

export {
    SagaList, SagaTree, MappedSagaMethodMap, Action, SagaDispatchFun, SagaDispatchActionFun

} from './types'

export {default as createAction} from './createAction';

export {
    mapSagaActions,
    VuexSaga as VuexSagaPlugin,
} from './VuexSaga'
