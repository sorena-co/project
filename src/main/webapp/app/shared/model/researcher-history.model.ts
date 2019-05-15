import { Moment } from 'moment';

export interface IResearcherHistory {
    id?: number;
    fromDate?: Moment;
    toDate?: Moment;
    organization?: string;
    level?: string;
    job?: string;
    documentId?: number;
}

export class ResearcherHistory implements IResearcherHistory {
    constructor(
        public id?: number,
        public fromDate?: Moment,
        public toDate?: Moment,
        public organization?: string,
        public level?: string,
        public job?: string,
        public documentId?: number
    ) {}
}
