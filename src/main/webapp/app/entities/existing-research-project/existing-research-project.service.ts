import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';

type EntityResponseType = HttpResponse<IExistingResearchProject>;
type EntityArrayResponseType = HttpResponse<IExistingResearchProject[]>;

@Injectable({ providedIn: 'root' })
export class ExistingResearchProjectService {
    public resourceUrl = SERVER_API_URL + 'api/existing-research-projects';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/existing-research-projects';

    constructor(protected http: HttpClient) {}

    create(existingResearchProject: IExistingResearchProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(existingResearchProject);
        return this.http
            .post<IExistingResearchProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(existingResearchProject: IExistingResearchProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(existingResearchProject);
        return this.http
            .put<IExistingResearchProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExistingResearchProject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExistingResearchProject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExistingResearchProject[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(existingResearchProject: IExistingResearchProject): IExistingResearchProject {
        const copy: IExistingResearchProject = Object.assign({}, existingResearchProject, {
            fromDate:
                existingResearchProject.fromDate != null && existingResearchProject.fromDate.isValid()
                    ? existingResearchProject.fromDate.toJSON()
                    : null,
            toDate:
                existingResearchProject.toDate != null && existingResearchProject.toDate.isValid()
                    ? existingResearchProject.toDate.toJSON()
                    : null
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
            res.body.forEach((existingResearchProject: IExistingResearchProject) => {
                existingResearchProject.fromDate =
                    existingResearchProject.fromDate != null ? moment(existingResearchProject.fromDate) : null;
                existingResearchProject.toDate = existingResearchProject.toDate != null ? moment(existingResearchProject.toDate) : null;
            });
        }
        return res;
    }
}
