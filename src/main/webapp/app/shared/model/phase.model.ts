import { Moment } from 'moment';

export interface IPhase {
    id?: number;
    title?: string;
    percent?: number;
    startDate?: Moment;
    finishDate?: Moment;
    cost?: number;
    reasonOfDelay?: string;
    isFinish?: boolean;
}

export class Phase implements IPhase {
    constructor(
        public id?: number,
        public title?: string,
        public percent?: number,
        public startDate?: Moment,
        public finishDate?: Moment,
        public cost?: number,
        public reasonOfDelay?: string,
        public isFinish?: boolean
    ) {
        this.isFinish = this.isFinish || false;
    }
}
