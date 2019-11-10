import { reactive, toRefs } from '@vue/composition-api';

import { SagaActions } from '@/store/application'

import { mainStoreInjector } from './MainStore'
import {IApplicationState} from "@/store/application/types";

interface IApplicaitonCtx extends IApplicationState{
    actions:{
        start:()=>void;
    }
}

export function compzApplicatoinCtx():IApplicaitonCtx{
    const {store} = mainStoreInjector();

    const applicationsState = reactive(store.state.application);

    return {
        // @ts-ignore
        ...toRefs(applicationsState),
        actions:{
            start: ()=>{store.sagaDispatchAction(SagaActions.start())}
        }
    };

}
