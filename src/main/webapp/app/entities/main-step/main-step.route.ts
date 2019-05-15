import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MainStep } from 'app/shared/model/main-step.model';
import { MainStepService } from './main-step.service';
import { MainStepComponent } from './main-step.component';
import { MainStepDetailComponent } from './main-step-detail.component';
import { MainStepUpdateComponent } from './main-step-update.component';
import { MainStepDeletePopupComponent } from './main-step-delete-dialog.component';
import { IMainStep } from 'app/shared/model/main-step.model';

@Injectable({ providedIn: 'root' })
export class MainStepResolve implements Resolve<IMainStep> {
    constructor(private service: MainStepService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMainStep> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MainStep>) => response.ok),
                map((mainStep: HttpResponse<MainStep>) => mainStep.body)
            );
        }
        return of(new MainStep());
    }
}

export const mainStepRoute: Routes = [
    {
        path: '',
        component: MainStepComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.mainStep.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MainStepDetailComponent,
        resolve: {
            mainStep: MainStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.mainStep.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MainStepUpdateComponent,
        resolve: {
            mainStep: MainStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.mainStep.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MainStepUpdateComponent,
        resolve: {
            mainStep: MainStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.mainStep.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mainStepPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MainStepDeletePopupComponent,
        resolve: {
            mainStep: MainStepResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.mainStep.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
