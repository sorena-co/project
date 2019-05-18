import { Moment } from 'moment';
import { IMainStep } from 'app/shared/model/main-step.model';
import { ICollageEducation } from 'app/shared/model/collage-education.model';
import { IResearcherHistory } from 'app/shared/model/researcher-history.model';
import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';
import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';
import { ICostSummary } from 'app/shared/model/cost-summary.model';
import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';

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
    base64?: string;
    howUse?: string;
    defenseNeeds?: string;
    whichMilitary?: string;
    civilianApplications?: string;
    imaginedDate?: string;
    mainSteps?: IMainStep[];
    collageEducations?: ICollageEducation[];
    researcherHistories?: IResearcherHistory[];
    existingResearchProjects?: IExistingResearchProject[];
    organizationPartners?: IOrganizationPartner[];
    costSummaries?: ICostSummary[];
    foreCastCosts?: IForeCastCost[];
    projectTitle?: string;
    projectId?: number;
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
        public base64?: string,
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
        public mainSteps?: IMainStep[],
        public collageEducations?: ICollageEducation[],
        public researcherHistories?: IResearcherHistory[],
        public existingResearchProjects?: IExistingResearchProject[],
        public organizationPartners?: IOrganizationPartner[],
        public costSummaries?: ICostSummary[],
        public foreCastCosts?: IForeCastCost[],
        public projectTitle?: string,
        public projectId?: number
    ) {}
}
