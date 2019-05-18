export interface IDocumentWord {
    id?: number;
    fileContentType?: string;
    file?: any;
    documentTitle?: string;
    documentId?: number;
}

export class DocumentWord implements IDocumentWord {
    constructor(
        public id?: number,
        public fileContentType?: string,
        public file?: any,
        public documentTitle?: string,
        public documentId?: number
    ) {}
}
