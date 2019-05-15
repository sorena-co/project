import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocument } from 'app/shared/model/document.model';

type EntityResponseType = HttpResponse<IDocument>;
type EntityArrayResponseType = HttpResponse<IDocument[]>;

@Injectable({ providedIn: 'root' })
export class DocumentService {
    public resourceUrl = SERVER_API_URL + 'api/documents';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/documents';

    constructor(protected http: HttpClient) {}

    create(document: IDocument): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(document);
        return this.http
            .post<IDocument>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(document: IDocument): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(document);
        return this.http
            .put<IDocument>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDocument[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(document: IDocument): IDocument {
        const copy: IDocument = Object.assign({}, document, {
            exportPlanDate: document.exportPlanDate != null && document.exportPlanDate.isValid() ? document.exportPlanDate.toJSON() : null,
            executivePlanDate:
                document.executivePlanDate != null && document.executivePlanDate.isValid() ? document.executivePlanDate.toJSON() : null,
            fromPlanDate: document.fromPlanDate != null && document.fromPlanDate.isValid() ? document.fromPlanDate.toJSON() : null,
            toPlanDate: document.toPlanDate != null && document.toPlanDate.isValid() ? document.toPlanDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.exportPlanDate = res.body.exportPlanDate != null ? moment(res.body.exportPlanDate) : null;
            res.body.executivePlanDate = res.body.executivePlanDate != null ? moment(res.body.executivePlanDate) : null;
            res.body.fromPlanDate = res.body.fromPlanDate != null ? moment(res.body.fromPlanDate) : null;
            res.body.toPlanDate = res.body.toPlanDate != null ? moment(res.body.toPlanDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((document: IDocument) => {
                document.exportPlanDate = document.exportPlanDate != null ? moment(document.exportPlanDate) : null;
                document.executivePlanDate = document.executivePlanDate != null ? moment(document.executivePlanDate) : null;
                document.fromPlanDate = document.fromPlanDate != null ? moment(document.fromPlanDate) : null;
                document.toPlanDate = document.toPlanDate != null ? moment(document.toPlanDate) : null;
            });
        }
        return res;
    }
}
