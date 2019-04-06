import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FinancialProject } from 'app/shared/model/financial-project.model';
import { FinancialProjectService } from './financial-project.service';
import { FinancialProjectComponent } from './financial-project.component';
import { FinancialProjectDetailComponent } from './financial-project-detail.component';
import { FinancialProjectUpdateComponent } from './financial-project-update.component';
import { FinancialProjectDeletePopupComponent } from './financial-project-delete-dialog.component';
import { IFinancialProject } from 'app/shared/model/financial-project.model';

@Injectable({ providedIn: 'root' })
export class FinancialProjectResolve implements Resolve<IFinancialProject> {
    constructor(private service: FinancialProjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFinancialProject> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FinancialProject>) => response.ok),
                map((financialProject: HttpResponse<FinancialProject>) => financialProject.body)
            );
        }
        return of(new FinancialProject());
    }
}

export const financialProjectRoute: Routes = [
    {
        path: '',
        component: FinancialProjectComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.financialProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FinancialProjectDetailComponent,
        resolve: {
            financialProject: FinancialProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.financialProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FinancialProjectUpdateComponent,
        resolve: {
            financialProject: FinancialProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.financialProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FinancialProjectUpdateComponent,
        resolve: {
            financialProject: FinancialProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.financialProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const financialProjectPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FinancialProjectDeletePopupComponent,
        resolve: {
            financialProject: FinancialProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.financialProject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
