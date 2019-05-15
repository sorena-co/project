export interface IMainStep {
    id?: number;
    mainStep?: string;
    actionTitle?: string;
    detailOfAction?: string;
    month?: number;
    percent?: number;
    result?: string;
}

export class MainStep implements IMainStep {
    constructor(
        public id?: number,
        public mainStep?: string,
        public actionTitle?: string,
        public detailOfAction?: string,
        public month?: number,
        public percent?: number,
        public result?: string
    ) {}
}
