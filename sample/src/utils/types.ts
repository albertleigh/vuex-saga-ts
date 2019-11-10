export type SagaList = string[];
export type SagaTree = SagaList | {[key:string]:Function};
export type MappedSagaMethodMap = {[key:string]:Function};

export type Action<T=any> = {type:string, payload:T, error?:boolean}

export type SagaDispatchFun =(type:string,payload:any) => void;
export type SagaDispatchActionFun =(action:Action) => void;
