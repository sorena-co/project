import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';

type EntityResponseType = HttpResponse<IOrganizationPartner>;
type EntityArrayResponseType = HttpResponse<IOrganizationPartner[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationPartnerService {
    public resourceUrl = SERVER_API_URL + 'api/organization-partners';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/organization-partners';

    constructor(protected http: HttpClient) {}

    create(organizationPartner: IOrganizationPartner): Observable<EntityResponseType> {
        return this.http.post<IOrganizationPartner>(this.resourceUrl, organizationPartner, { observe: 'response' });
    }

    update(organizationPartner: IOrganizationPartner): Observable<EntityResponseType> {
        return this.http.put<IOrganizationPartner>(this.resourceUrl, organizationPartner, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrganizationPartner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrganizationPartner[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrganizationPartner[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
