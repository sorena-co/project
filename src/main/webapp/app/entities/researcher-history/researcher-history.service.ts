import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResearcherHistory } from 'app/shared/model/researcher-history.model';

type EntityResponseType = HttpResponse<IResearcherHistory>;
type EntityArrayResponseType = HttpResponse<IResearcherHistory[]>;

@Injectable({ providedIn: 'root' })
export class ResearcherHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/researcher-histories';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/researcher-histories';

    constructor(protected http: HttpClient) {}

    create(researcherHistory: IResearcherHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(researcherHistory);
        return this.http
            .post<IResearcherHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(researcherHistory: IResearcherHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(researcherHistory);
        return this.http
            .put<IResearcherHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IResearcherHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IResearcherHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IResearcherHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(researcherHistory: IResearcherHistory): IResearcherHistory {
        const copy: IResearcherHistory = Object.assign({}, researcherHistory, {
            fromDate:
                researcherHistory.fromDate != null && researcherHistory.fromDate.isValid() ? researcherHistory.fromDate.toJSON() : null,
            toDate: researcherHistory.toDate != null && researcherHistory.toDate.isValid() ? researcherHistory.toDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fromDate = res.body.fromDate != null ? moment(res.body.fromDate) : null;
            res.body.toDate = res.body.toDate != null ? moment(res.body.toDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((researcherHistory: IResearcherHistory) => {
                researcherHistory.fromDate = researcherHistory.fromDate != null ? moment(researcherHistory.fromDate) : null;
                researcherHistory.toDate = researcherHistory.toDate != null ? moment(researcherHistory.toDate) : null;
            });
        }
        return res;
    }
}
