import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';

type EntityResponseType = HttpResponse<IForeCastCost>;
type EntityArrayResponseType = HttpResponse<IForeCastCost[]>;

@Injectable({ providedIn: 'root' })
export class ForeCastCostService {
    public resourceUrl = SERVER_API_URL + 'api/fore-cast-costs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/fore-cast-costs';

    constructor(protected http: HttpClient) {}

    create(foreCastCost: IForeCastCost): Observable<EntityResponseType> {
        return this.http.post<IForeCastCost>(this.resourceUrl, foreCastCost, { observe: 'response' });
    }

    update(foreCastCost: IForeCastCost): Observable<EntityResponseType> {
        return this.http.put<IForeCastCost>(this.resourceUrl, foreCastCost, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IForeCastCost>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IForeCastCost[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IForeCastCost[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
