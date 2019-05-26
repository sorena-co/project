import { User } from 'app/core';

export enum ProjectType {
    SOFTWARE = 'SOFTWARE',
    HARDWARE = 'HARDWARE'
}

export interface IProject {
    id?: number;
    title?: string;
    code?: string;
    users?: User[];
    createDate?: any;
    startDate?: any;
    finishDate?: any;
    amountConfirmed?: number;
    totalCost?: number;
    creditEstimates?: number;
    sellContractAmount?: number;
    creditApply?: number;
    parentProjectId?: number;
    level?: number;
    projectType?: any | ProjectType;
    fileContentType?: string;
    file?: any;
}

export class Project implements IProject {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public createDate?: any,
        public startDate?: any,
        public finishDate?: any,
        public amountConfirmed?: number,
        public totalCost?: number,
        public creditEstimates?: number,
        public sellContractAmount?: number,
        public creditApply?: number,
        public parentProjectId?: number,
        public level?: number,
        public projectType?: ProjectType,
        public fileContentType?: string,
        public file?: any
    ) {}
}
