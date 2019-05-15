import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CostSummary } from 'app/shared/model/cost-summary.model';
import { CostSummaryService } from './cost-summary.service';
import { CostSummaryComponent } from './cost-summary.component';
import { CostSummaryDetailComponent } from './cost-summary-detail.component';
import { CostSummaryUpdateComponent } from './cost-summary-update.component';
import { CostSummaryDeletePopupComponent } from './cost-summary-delete-dialog.component';
import { ICostSummary } from 'app/shared/model/cost-summary.model';

@Injectable({ providedIn: 'root' })
export class CostSummaryResolve implements Resolve<ICostSummary> {
    constructor(private service: CostSummaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICostSummary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CostSummary>) => response.ok),
                map((costSummary: HttpResponse<CostSummary>) => costSummary.body)
            );
        }
        return of(new CostSummary());
    }
}

export const costSummaryRoute: Routes = [
    {
        path: '',
        component: CostSummaryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.costSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CostSummaryDetailComponent,
        resolve: {
            costSummary: CostSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.costSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CostSummaryUpdateComponent,
        resolve: {
            costSummary: CostSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.costSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CostSummaryUpdateComponent,
        resolve: {
            costSummary: CostSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.costSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costSummaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CostSummaryDeletePopupComponent,
        resolve: {
            costSummary: CostSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.costSummary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
