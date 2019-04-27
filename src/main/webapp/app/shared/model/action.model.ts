import { Moment } from 'moment';

export interface IAction {
    id?: number;
    title?: string;
    doPercent?: boolean;
    finalPercent?: boolean;
    startDate?: Moment;
    finishDate?: Moment;
    reasonOfDelay?: string;
    isFinish?: boolean;
    phaseTitle?: string;
    phaseId?: number;
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public title?: string,
        public doPercent?: boolean,
        public finalPercent?: boolean,
        public startDate?: Moment,
        public finishDate?: Moment,
        public reasonOfDelay?: string,
        public isFinish?: boolean,
        public phaseTitle?: string,
        public phaseId?: number
    ) {
        this.doPercent = this.doPercent || false;
        this.finalPercent = this.finalPercent || false;
        this.isFinish = this.isFinish || false;
    }
}
