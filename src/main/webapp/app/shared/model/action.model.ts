export interface IAction {
    id?: number;
    title?: string;
    doPercent?: number;
    finalPercent?: number;
    startDate?: any;
    finishDate?: any;
    reasonOfDelay?: string;
    isFinish?: boolean;
    phaseTitle?: string;
    phaseId?: number;
    width?: number;
    beforeWidth?: number;
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public title?: string,
        public doPercent?: number,
        public finalPercent?: number,
        public startDate?: any,
        public finishDate?: any,
        public reasonOfDelay?: string,
        public isFinish?: boolean,
        public phaseTitle?: string,
        public phaseId?: number,
        public width?: number,
        public beforeWidth?: number
    ) {
        this.isFinish = this.isFinish || false;
    }
}
