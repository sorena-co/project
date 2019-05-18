import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentWord } from 'app/shared/model/document-word.model';
import { DocumentWordService } from './document-word.service';
import { DocumentWordComponent } from './document-word.component';
import { DocumentWordDetailComponent } from './document-word-detail.component';
import { DocumentWordUpdateComponent } from './document-word-update.component';
import { DocumentWordDeletePopupComponent } from './document-word-delete-dialog.component';
import { IDocumentWord } from 'app/shared/model/document-word.model';

@Injectable({ providedIn: 'root' })
export class DocumentWordResolve implements Resolve<IDocumentWord> {
    constructor(private service: DocumentWordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentWord> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentWord>) => response.ok),
                map((documentWord: HttpResponse<DocumentWord>) => documentWord.body)
            );
        }
        return of(new DocumentWord());
    }
}

export const documentWordRoute: Routes = [
    {
        path: '',
        component: DocumentWordComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.documentWord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DocumentWordDetailComponent,
        resolve: {
            documentWord: DocumentWordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.documentWord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DocumentWordUpdateComponent,
        resolve: {
            documentWord: DocumentWordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.documentWord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DocumentWordUpdateComponent,
        resolve: {
            documentWord: DocumentWordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.documentWord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentWordPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DocumentWordDeletePopupComponent,
        resolve: {
            documentWord: DocumentWordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.documentWord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
