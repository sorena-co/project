import { Moment } from 'moment';
import { User } from 'app/core';

export const enum ProjectType {
    SOFTWARE = 'SOFTWARE',
    HARDWARE = 'HARDWARE'
}

export interface IProject {
    id?: number;
    title?: string;
    users?: User[];
    createDate?: Moment;
    projectType?: ProjectType;
}

export class Project implements IProject {
    constructor(public id?: number, public title?: string, public createDate?: Moment, public projectType?: ProjectType) {}
}
