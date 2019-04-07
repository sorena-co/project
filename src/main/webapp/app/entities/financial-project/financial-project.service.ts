import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { FinancialProjectTypeExist, IFinancialProject } from 'app/shared/model/financial-project.model';

type EntityResponseType = HttpResponse<IFinancialProject>;
type FinancialProjectTypeExistResponseType = HttpResponse<FinancialProjectTypeExist>;
type NumberResponseType = HttpResponse<number>;
type EntityArrayResponseType = HttpResponse<IFinancialProject[]>;

@Injectable({ providedIn: 'root' })
export class FinancialProjectService {
    public resourceUrl = SERVER_API_URL + 'api/financial-projects';
    public resourceProjectUrl = SERVER_API_URL + 'api/projects';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/financial-projects';

    constructor(protected http: HttpClient) {}

    create(financialProject: IFinancialProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(financialProject);
        return this.http
            .post<IFinancialProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(financialProject: IFinancialProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(financialProject);
        return this.http
            .put<IFinancialProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFinancialProject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByProjectAndType(projectId: number, type: any): Observable<EntityResponseType> {
        const params = new HttpParams().set('projectId', projectId.toString()).set('type', type.toString());
        return this.http
            .get<IFinancialProject>(`${this.resourceUrl}/find-by-project-type`, { params, observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getStyleForType(projectId: number): Observable<FinancialProjectTypeExistResponseType> {
        return this.http
            .get<FinancialProjectTypeExist>(`${this.resourceUrl}/project/${projectId}/get-style`, { observe: 'response' })
            .pipe(map((res: FinancialProjectTypeExistResponseType) => res));
    }

    getCostOfProject(projectId: number): Observable<NumberResponseType> {
        return this.http
            .get<number>(`${this.resourceUrl}/cost/${projectId}`, { observe: 'response' })
            .pipe(map((res: NumberResponseType) => res));
    }

    query(projectId: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFinancialProject[]>(`${this.resourceUrl}/${projectId}/project`, {
                params: options,
                observe: 'response'
            })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFinancialProject[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(financialProject: IFinancialProject): IFinancialProject {
        const copy: IFinancialProject = Object.assign({}, financialProject, {
            registerDate:
                financialProject.registerDate != null && financialProject.registerDate.isValid()
                    ? financialProject.registerDate.toJSON()
                    : null,
            startDate:
                financialProject.startDate != null && financialProject.startDate.isValid() ? financialProject.startDate.toJSON() : null,
            finishDate:
                financialProject.finishDate != null && financialProject.finishDate.isValid() ? financialProject.finishDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.registerDate = res.body.registerDate != null ? moment(res.body.registerDate) : null;
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((financialProject: IFinancialProject) => {
                financialProject.registerDate = financialProject.registerDate != null ? moment(financialProject.registerDate) : null;
                financialProject.startDate = financialProject.startDate != null ? moment(financialProject.startDate) : null;
                financialProject.finishDate = financialProject.finishDate != null ? moment(financialProject.finishDate) : null;
            });
        }
        return res;
    }
}
