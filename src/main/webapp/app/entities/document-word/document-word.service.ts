import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentWord } from 'app/shared/model/document-word.model';

type EntityResponseType = HttpResponse<IDocumentWord>;
type EntityArrayResponseType = HttpResponse<IDocumentWord[]>;

@Injectable({ providedIn: 'root' })
export class DocumentWordService {
    public resourceUrl = SERVER_API_URL + 'api/document-words';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/document-words';

    constructor(protected http: HttpClient) {}

    create(documentWord: IDocumentWord): Observable<EntityResponseType> {
        return this.http.post<IDocumentWord>(this.resourceUrl, documentWord, { observe: 'response' });
    }

    update(documentWord: IDocumentWord): Observable<EntityResponseType> {
        return this.http.put<IDocumentWord>(this.resourceUrl, documentWord, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentWord>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(documentId, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentWord[]>(`${this.resourceUrl}/${documentId}/document`, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentWord[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
