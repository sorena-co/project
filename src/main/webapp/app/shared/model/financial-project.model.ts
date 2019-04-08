import { Moment } from 'moment';

export enum FinancialProjectType {
    CREDIT_ESTIMATES = 'CREDIT_ESTIMATES',
    SELL_CONTRACT_AMOUNT = 'SELL_CONTRACT_AMOUNT',
    AMOUNT_CONFIRMED = 'AMOUNT_CONFIRMED',
    RECEIVED_FROM_INSTITUTION = 'RECEIVED_FROM_INSTITUTION',
    RECEIVED_FROM_ORGANIZATION = 'RECEIVED_FROM_ORGANIZATION',
    RECEIVED_TOTAL_FOR_PROJECT = 'RECEIVED_TOTAL_FOR_PROJECT',
    SEND_TO_PROJECT_HAVE_CODE = 'SEND_TO_PROJECT_HAVE_CODE',
    SEND_TO_PROJECT_NOT_HAVE_CODE = 'SEND_TO_PROJECT_NOT_HAVE_CODE',
    SURPLUS_COST = 'SURPLUS_COST',
    CREDIT_REMAIN = 'CREDIT_REMAIN',
    BEFORE_CLEARING = 'BEFORE_CLEARING',
    IN_CLEARING = 'IN_CLEARING',
    FINAL_CLEARING = 'FINAL_CLEARING',
    DEBIT_TO_INSTITUTION = 'DEBIT_TO_INSTITUTION',
    CREDIT_APPLY = 'CREDIT_APPLY'
}

export class FinancialProjectTypeExist {
    constructor(
        public existCreditEstimates?: boolean,
        public existSellContractAmount?: boolean,
        public existBeforeClearing?: boolean,
        public existAmountConfirmed?: boolean,
        public existReceivedFromInstitution?: boolean,
        public existReceivedFromOrganization?: boolean,
        public existReceivedTotalForProject?: boolean,
        public existSendToProjectHaveCode?: boolean,
        public existSendToProjectNotHaveCode?: boolean,
        public existSurplusCost?: boolean,
        public existCreditRemain?: boolean,
        public existInClearing?: boolean,
        public existFinalClearing?: boolean,
        public existDebitToInstitution?: boolean,
        public existCreditApply?: boolean
    ) {}
}

export interface IFinancialProject {
    id?: number;
    title?: string;
    code?: string;
    name?: string;
    factorNo?: string;
    sellContractNo?: string;
    amount?: number;
    registerDate?: Moment;
    startDate?: Moment;
    finishDate?: Moment;
    description?: string;
    financialProjectType?: FinancialProjectType;
    projectTitle?: string;
    projectId?: number;
    getCreditProjectId?: number;
}

export class FinancialProject implements IFinancialProject {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public name?: string,
        public factorNo?: string,
        public sellContractNo?: string,
        public amount?: number,
        public registerDate?: Moment,
        public startDate?: Moment,
        public finishDate?: Moment,
        public description?: string,
        public financialProjectType?: FinancialProjectType,
        public projectTitle?: string,
        public projectId?: number,
        public getCreditProjectId?: number
    ) {}
}
