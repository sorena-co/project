import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPhase } from 'app/shared/model/phase.model';

type EntityResponseType = HttpResponse<IPhase>;
type EntityArrayResponseType = HttpResponse<IPhase[]>;

@Injectable({ providedIn: 'root' })
export class PhaseService {
    public resourceUrl = SERVER_API_URL + 'api/phases';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/phases';

    constructor(protected http: HttpClient) {}

    create(phase: IPhase): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(phase);
        return this.http
            .post<IPhase>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(phase: IPhase): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(phase);
        return this.http
            .put<IPhase>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPhase>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(projectId: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPhase[]>(`${this.resourceUrl}/${projectId}/project`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPhase[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(phase: IPhase): IPhase {
        const copy: IPhase = Object.assign({}, phase, {
            startDate: phase.startDate != null && phase.startDate.isValid() ? phase.startDate.toJSON() : null,
            finishDate: phase.finishDate != null && phase.finishDate.isValid() ? phase.finishDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((phase: IPhase) => {
                phase.startDate = phase.startDate != null ? moment(phase.startDate) : null;
                phase.finishDate = phase.finishDate != null ? moment(phase.finishDate) : null;
            });
        }
        return res;
    }
}
