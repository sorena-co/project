import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICollageEducation } from 'app/shared/model/collage-education.model';

type EntityResponseType = HttpResponse<ICollageEducation>;
type EntityArrayResponseType = HttpResponse<ICollageEducation[]>;

@Injectable({ providedIn: 'root' })
export class CollageEducationService {
    public resourceUrl = SERVER_API_URL + 'api/collage-educations';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/collage-educations';

    constructor(protected http: HttpClient) {}

    create(collageEducation: ICollageEducation): Observable<EntityResponseType> {
        return this.http.post<ICollageEducation>(this.resourceUrl, collageEducation, { observe: 'response' });
    }

    update(collageEducation: ICollageEducation): Observable<EntityResponseType> {
        return this.http.put<ICollageEducation>(this.resourceUrl, collageEducation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICollageEducation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICollageEducation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICollageEducation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
