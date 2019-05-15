export interface ICollageEducation {
    id?: number;
    fullName?: string;
    lastDegree?: string;
    program?: string;
    institution?: string;
    country?: string;
    receiveDateDegree?: string;
    documentId?: number;
}

export class CollageEducation implements ICollageEducation {
    constructor(
        public id?: number,
        public fullName?: string,
        public lastDegree?: string,
        public program?: string,
        public institution?: string,
        public country?: string,
        public receiveDateDegree?: string,
        public documentId?: number
    ) {}
}
