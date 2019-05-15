import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResearcherHistory } from 'app/shared/model/researcher-history.model';
import { ResearcherHistoryService } from './researcher-history.service';
import { ResearcherHistoryComponent } from './researcher-history.component';
import { ResearcherHistoryDetailComponent } from './researcher-history-detail.component';
import { ResearcherHistoryUpdateComponent } from './researcher-history-update.component';
import { ResearcherHistoryDeletePopupComponent } from './researcher-history-delete-dialog.component';
import { IResearcherHistory } from 'app/shared/model/researcher-history.model';

@Injectable({ providedIn: 'root' })
export class ResearcherHistoryResolve implements Resolve<IResearcherHistory> {
    constructor(private service: ResearcherHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResearcherHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ResearcherHistory>) => response.ok),
                map((researcherHistory: HttpResponse<ResearcherHistory>) => researcherHistory.body)
            );
        }
        return of(new ResearcherHistory());
    }
}

export const researcherHistoryRoute: Routes = [
    {
        path: '',
        component: ResearcherHistoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.researcherHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ResearcherHistoryDetailComponent,
        resolve: {
            researcherHistory: ResearcherHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.researcherHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ResearcherHistoryUpdateComponent,
        resolve: {
            researcherHistory: ResearcherHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.researcherHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ResearcherHistoryUpdateComponent,
        resolve: {
            researcherHistory: ResearcherHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.researcherHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const researcherHistoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ResearcherHistoryDeletePopupComponent,
        resolve: {
            researcherHistory: ResearcherHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.researcherHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
