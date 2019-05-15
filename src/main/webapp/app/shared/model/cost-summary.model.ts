export interface ICostSummary {
    id?: number;
    costDetail?: string;
    fromPage?: number;
    costRial?: number;
    costDollar?: number;
}

export class CostSummary implements ICostSummary {
    constructor(
        public id?: number,
        public costDetail?: string,
        public fromPage?: number,
        public costRial?: number,
        public costDollar?: number
    ) {}
}
