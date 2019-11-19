import {Store} from 'vuex';

import { RunSagaOptions, Saga } from '@redux-saga/core';
import { runSaga, stdChannel } from 'redux-saga';

import { SagaTree, MappedSagaMethodMap, Action } from './types'

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return Array<{key:string,val:string|Function}
 */

function normalizeMap(map:SagaTree):Array<{key:string,val:string|Function}> {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key, val: map[key] }));
}

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export function mapSagaActions(actions:SagaTree):MappedSagaMethodMap {
    const res:MappedSagaMethodMap = {};
    normalizeMap(actions).forEach(({ key, val }) => {
        res[key] = function mappedSagaAction(...args:any[]) {
            // get saga dispatch function from store
            const { sagaDispatch } = this.$store as any;
            return typeof val === 'function'
                ? val.apply(this, [sagaDispatch].concat(args))
                : sagaDispatch.apply(this.$store, [val].concat(args));
        };
    });
    return res;
}

interface ExtSagaOption<Action,State> extends RunSagaOptions<Action,State> {
    dispatchSagaAction:boolean;
}

/**
 * Main plugin function
 *
 * @param saga generator function
 * @param options saga options
 * @param args other parameters acceptable by rudux-saga runSaga function
 * @return {Function}
 */

export function VuexSaga<
    A extends Action,
    State,
    S extends Saga
>(
    saga: S,
    options?: ExtSagaOption<Action, State>,
    ...args: Parameters<S>
) {
    return (store:Store<State>) => {
        const channel = stdChannel();
        const dispatchSagaAction = options && options.dispatchSagaAction;
        // eslint-disable-next-line no-param-reassign
        (store as any ).sagaDispatch = (type, payload={}) => {
            dispatchSagaAction && store.commit({ type, payload });
            return channel.put({ type, payload })
        };
        (store as any ).sagaDispatchAction = (action:Action) =>{
            dispatchSagaAction && store.commit(action);
            return channel.put(action)
        };
        runSaga(
            {
                channel,
                dispatch: (output:any) => {store.commit(output)},
                getState: () => store.state,
                ...options
            },
            saga,
            ...args
        );
    };
}
