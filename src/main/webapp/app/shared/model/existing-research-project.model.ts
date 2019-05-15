import { Moment } from 'moment';

export interface IExistingResearchProject {
    id?: number;
    projectTitle?: string;
    projectCode?: string;
    institution?: string;
    fromDate?: Moment;
    toDate?: Moment;
    lastStatus?: string;
}

export class ExistingResearchProject implements IExistingResearchProject {
    constructor(
        public id?: number,
        public projectTitle?: string,
        public projectCode?: string,
        public institution?: string,
        public fromDate?: Moment,
        public toDate?: Moment,
        public lastStatus?: string
    ) {}
}
