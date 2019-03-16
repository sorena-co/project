export interface IUserGroup {
    id?: number;
    title?: string;
}

export class UserGroup implements IUserGroup {
    constructor(public id?: number, public title?: string) {}
}
