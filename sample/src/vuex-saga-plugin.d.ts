import Vue from 'vue';
import {SagaDispatchActionFun, SagaDispatchFun} from "vuex-saga-ts";

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
