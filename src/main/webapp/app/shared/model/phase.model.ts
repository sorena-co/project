import { Action } from 'app/shared/model/action.model';

export interface IPhase {
    id?: number;
    title?: string;
    percent?: number;
    startDate?: any;
    finishDate?: any;
    cost?: number;
    reasonOfDelay?: string;
    isFinish?: boolean;
    projectTitle?: string;
    projectId?: number;
    actions?: Action[];
}

export class Phase implements IPhase {
    constructor(
        public id?: number,
        public title?: string,
        public percent?: number,
        public startDate?: any,
        public finishDate?: any,
        public cost?: number,
        public reasonOfDelay?: string,
        public isFinish?: boolean,
        public projectTitle?: string,
        public projectId?: number,
        public actions?: Action[]
    ) {
        this.isFinish = this.isFinish || false;
    }
}
