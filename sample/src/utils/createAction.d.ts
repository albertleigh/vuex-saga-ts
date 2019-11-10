import { Action } from './types'

/** argument inferring borrowed from lodash definitions */
export type ActionFunction0<R> = () => R;
export type ActionFunction1<T1, R> = (t1: T1) => R;
export type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R;
export type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export type ActionFunction4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;
export type ActionFunctionAny<R> = (...args: any[]) => R;

export default function createAction(
    actionType: string
): ActionFunctionAny<Action<any>>;

export default function createAction<Payload>(
    actionType: string,
    payloadCreator: ActionFunction0<Payload>
): ActionFunction0<Action<Payload>>;

export default function createAction<Payload, Arg1>(
    actionType: string,
    payloadCreator: ActionFunction1<Arg1, Payload>
): ActionFunction1<Arg1, Action<Payload>>;

export default function createAction<Payload, Arg1, Arg2>(
    actionType: string,
    payloadCreator: ActionFunction2<Arg1, Arg2, Payload>
): ActionFunction2<Arg1, Arg2, Action<Payload>>;

export default function createAction<Payload, Arg1, Arg2, Arg3>(
    actionType: string,
    payloadCreator: ActionFunction3<Arg1, Arg2, Arg3, Payload>
): ActionFunction3<Arg1, Arg2, Arg3, Action<Payload>>;

export default function createAction<Payload, Arg1, Arg2, Arg3, Arg4>(
    actionType: string,
    payloadCreator: ActionFunction4<Arg1, Arg2, Arg3, Arg4, Payload>
): ActionFunction4<Arg1, Arg2, Arg3, Arg4, Action<Payload>>;

export default function createAction<Payload>(
    actionType: string
): ActionFunction1<Payload, Action<Payload>>;
