import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Phase } from 'app/shared/model/phase.model';
import { PhaseService } from './phase.service';
import { PhaseComponent } from './phase.component';
import { PhaseDetailComponent } from './phase-detail.component';
import { PhaseUpdateComponent } from './phase-update.component';
import { PhaseDeletePopupComponent } from './phase-delete-dialog.component';
import { IPhase } from 'app/shared/model/phase.model';

@Injectable({ providedIn: 'root' })
export class PhaseResolve implements Resolve<IPhase> {
    constructor(private service: PhaseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPhase> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Phase>) => response.ok),
                map((phase: HttpResponse<Phase>) => phase.body)
            );
        }
        return of(new Phase());
    }
}

export const phaseRoute: Routes = [
    {
        path: '',
        component: PhaseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PhaseDetailComponent,
        resolve: {
            phase: PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PhaseUpdateComponent,
        resolve: {
            phase: PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PhaseUpdateComponent,
        resolve: {
            phase: PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.phase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phasePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PhaseDeletePopupComponent,
        resolve: {
            phase: PhaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.phase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
