import { Moment } from 'moment';
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
    createDate?: Moment;
    startDate?: Moment;
    finishDate?: Moment;
    amountConfirmed?: number;
    totalCost?: number;
    parentProjectId?: number;
    level?: number;
    projectType?: any | ProjectType;
}

export class Project implements IProject {
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public createDate?: Moment,
        public startDate?: Moment,
        public finishDate?: Moment,
        public amountConfirmed?: number,
        public totalCost?: number,
        public parentProjectId?: number,
        public level?: number,
        public projectType?: ProjectType
    ) {}
}
