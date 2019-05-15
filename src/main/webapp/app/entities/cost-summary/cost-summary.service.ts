import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICostSummary } from 'app/shared/model/cost-summary.model';

type EntityResponseType = HttpResponse<ICostSummary>;
type EntityArrayResponseType = HttpResponse<ICostSummary[]>;

@Injectable({ providedIn: 'root' })
export class CostSummaryService {
    public resourceUrl = SERVER_API_URL + 'api/cost-summaries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/cost-summaries';

    constructor(protected http: HttpClient) {}

    create(costSummary: ICostSummary): Observable<EntityResponseType> {
        return this.http.post<ICostSummary>(this.resourceUrl, costSummary, { observe: 'response' });
    }

    update(costSummary: ICostSummary): Observable<EntityResponseType> {
        return this.http.put<ICostSummary>(this.resourceUrl, costSummary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICostSummary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICostSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICostSummary[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
