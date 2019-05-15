import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMainStep } from 'app/shared/model/main-step.model';

type EntityResponseType = HttpResponse<IMainStep>;
type EntityArrayResponseType = HttpResponse<IMainStep[]>;

@Injectable({ providedIn: 'root' })
export class MainStepService {
    public resourceUrl = SERVER_API_URL + 'api/main-steps';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/main-steps';

    constructor(protected http: HttpClient) {}

    create(mainStep: IMainStep): Observable<EntityResponseType> {
        return this.http.post<IMainStep>(this.resourceUrl, mainStep, { observe: 'response' });
    }

    update(mainStep: IMainStep): Observable<EntityResponseType> {
        return this.http.put<IMainStep>(this.resourceUrl, mainStep, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMainStep>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMainStep[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMainStep[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
