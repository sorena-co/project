import { Moment } from 'moment';
import { MainStep } from 'app/shared/model/main-step.model';

export const enum PlanType {
    FUNDANMENTAL = 'FUNDANMENTAL',
    PRACTICAL = 'PRACTICAL',
    DEVELOPMENT = 'DEVELOPMENT'
}

export interface IDocument {
    id?: number;
    title?: string;
    protectiveClassification?: string;
    persianTitle?: string;
    foreignTitle?: string;
    planType?: PlanType;
    detailOfProject?: string;
    visionOfProject?: string;
    executiveBidder?: string;
    organization?: string;
    industry?: string;
    address?: string;
    exportPlanDate?: Moment;
    executivePlanDate?: Moment;
    fromPlanDate?: Moment;
    toPlanDate?: Moment;
    rialBudget?: number;
    foreignBudget?: number;
    leaderCommand?: string;
    fiveYearProgram?: string;
    standingApprovals?: string;
    approvedPattern?: string;
    percentageOfOutsourcing?: number;
    employerOperations?: string;
    industrialUser?: string;
    generalSpecificationOfTheDesign?: string;
    thePurposeOfTheProject?: string;
    scientificAndTechnicalBuildings?: string;
    howImplementProject?: string;
    historyOfPlan?: string;
    historyOfStudiesAndResearch?: string;
    howUse?: string;
    defenseNeeds?: string;
    whichMilitary?: string;
    civilianApplications?: string;
    imaginedDate?: string;
    mainStepMainStep?: string;
    mainStepId?: number;
    collageEducationFullName?: string;
    collageEducationId?: number;
    researcherHistoryId?: number;
    existingResearchProjectId?: number;
    organizationPartnerId?: number;
    costSummaryId?: number;
    foreCastCostConsumeId?: number;
    foreCastCostCostId?: number;
    foreCastCostSupportId?: number;
    foreCastCostSpaceId?: number;
    foreCastCostSellContractId?: number;
    foreCastCostOtherId?: number;
    mainSteps?: MainStep[];
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public title?: string,
        public protectiveClassification?: string,
        public persianTitle?: string,
        public foreignTitle?: string,
        public planType?: PlanType,
        public detailOfProject?: string,
        public visionOfProject?: string,
        public executiveBidder?: string,
        public organization?: string,
        public industry?: string,
        public address?: string,
        public exportPlanDate?: Moment,
        public executivePlanDate?: Moment,
        public fromPlanDate?: Moment,
        public toPlanDate?: Moment,
        public rialBudget?: number,
        public foreignBudget?: number,
        public leaderCommand?: string,
        public fiveYearProgram?: string,
        public standingApprovals?: string,
        public approvedPattern?: string,
        public percentageOfOutsourcing?: number,
        public employerOperations?: string,
        public industrialUser?: string,
        public generalSpecificationOfTheDesign?: string,
        public thePurposeOfTheProject?: string,
        public scientificAndTechnicalBuildings?: string,
        public howImplementProject?: string,
        public historyOfPlan?: string,
        public historyOfStudiesAndResearch?: string,
        public howUse?: string,
        public defenseNeeds?: string,
        public whichMilitary?: string,
        public civilianApplications?: string,
        public imaginedDate?: string,
        public mainStepMainStep?: string,
        public mainStepId?: number,
        public collageEducationFullName?: string,
        public collageEducationId?: number,
        public researcherHistoryId?: number,
        public existingResearchProjectId?: number,
        public organizationPartnerId?: number,
        public costSummaryId?: number,
        public foreCastCostConsumeId?: number,
        public foreCastCostCostId?: number,
        public foreCastCostSupportId?: number,
        public foreCastCostSpaceId?: number,
        public foreCastCostSellContractId?: number,
        public foreCastCostOtherId?: number,
        public mainSteps?: MainStep[]
    ) {}
}
