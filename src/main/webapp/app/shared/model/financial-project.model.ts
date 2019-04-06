import { Moment } from 'moment';

export enum FinancialProjectType {
    CREDIT_ESTIMATES = 'CREDIT_ESTIMATES',
    AMOUNT_CONFIRMED = 'AMOUNT_CONFIRMED',
    RECEIVED_FROM_INSTITUTION = 'RECEIVED_FROM_INSTITUTION',
    RECEIVED_FROM_ORGANIZATION = 'RECEIVED_FROM_ORGANIZATION',
    RECEIVED_TOTAL_FOR_PROJECT = 'RECEIVED_TOTAL_FOR_PROJECT',
    SEND_TO_PROJECT_HAVE_CODE = 'SEND_TO_PROJECT_HAVE_CODE',
    SURPLUS_COST = 'SURPLUS_COST',
    CREDIT_REMAIN = 'CREDIT_REMAIN',
    BEFORE_CLEARING = 'BEFORE_CLEARING',
    IN_CLEARING = 'IN_CLEARING',
    FINAL_CLEARING = 'FINAL_CLEARING',
    DEBIT_TO_INSTITUTION = 'DEBIT_TO_INSTITUTION'
}

export interface IFinancialProject {
    id?: number;
    title?: string;
    code?: string;
    name?: string;
    sellContractNo?: string;
    amount?: number;
    registerDate?: Moment;
    startDate?: Moment;
    finishDate?: Moment;
    description?: string;
    financialProjectType?: FinancialProjectType;
    projectTitle?: string;
    projectId?: number;
}

export class FinancialProject implements IFinancialProject {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public name?: string,
        public sellContractNo?: string,
        public amount?: number,
        public registerDate?: Moment,
        public startDate?: Moment,
        public finishDate?: Moment,
        public description?: string,
        public financialProjectType?: FinancialProjectType,
        public projectTitle?: string,
        public projectId?: number
    ) {}
}
