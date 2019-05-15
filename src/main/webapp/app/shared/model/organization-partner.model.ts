export interface IOrganizationPartner {
    id?: number;
    organization?: string;
    type?: string;
    name?: string;
    documentId?: number;
}

export class OrganizationPartner implements IOrganizationPartner {
    constructor(public id?: number, public organization?: string, public type?: string, public name?: string, public documentId?: number) {}
}
