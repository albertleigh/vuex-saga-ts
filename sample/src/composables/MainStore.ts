import { provide, inject } from '@vue/composition-api';
import { Store } from 'vuex';

import { IRootState } from '@/store/types';

export const MainStoreSymbol = Symbol('MAIN_STORE');

export function mainStoreProvider($store){
    provide(MainStoreSymbol,$store);
}

export function mainStoreInjector():{store:Store<IRootState>}{
    const store = inject(MainStoreSymbol) as Store<IRootState>;
    return {
        store
    }
}
