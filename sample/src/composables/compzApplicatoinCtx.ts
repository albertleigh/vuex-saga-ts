import { reactive, toRefs } from '@vue/composition-api';

import { SagaActions } from '@/store/application'

import { mainStoreInjector } from './MainStore'
import {IApplicationState} from "@/store/application/types";

interface IApplicaitonCtx{
    state:IApplicationState,
    actions:{
        start:()=>void;
    }
}

export function compzApplicatoinCtx():IApplicaitonCtx{
    const {store} = mainStoreInjector();

    const applicationsState = reactive(store.state.application);

    return {
        // @ts-ignore
        state:toRefs(applicationsState),
        actions:{
            start: ()=>{store.sagaDispatchAction(SagaActions.start())}
        }
    };

}
