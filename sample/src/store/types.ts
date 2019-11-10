import {IApplicationState} from './application/types';

export interface IRootState {
    version:string,
    application?:Partial<IApplicationState>,
}
