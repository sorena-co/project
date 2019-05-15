import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ForeCastCost } from 'app/shared/model/fore-cast-cost.model';
import { ForeCastCostService } from './fore-cast-cost.service';
import { ForeCastCostComponent } from './fore-cast-cost.component';
import { ForeCastCostDetailComponent } from './fore-cast-cost-detail.component';
import { ForeCastCostUpdateComponent } from './fore-cast-cost-update.component';
import { ForeCastCostDeletePopupComponent } from './fore-cast-cost-delete-dialog.component';
import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';

@Injectable({ providedIn: 'root' })
export class ForeCastCostResolve implements Resolve<IForeCastCost> {
    constructor(private service: ForeCastCostService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForeCastCost> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ForeCastCost>) => response.ok),
                map((foreCastCost: HttpResponse<ForeCastCost>) => foreCastCost.body)
            );
        }
        return of(new ForeCastCost());
    }
}

export const foreCastCostRoute: Routes = [
    {
        path: '',
        component: ForeCastCostComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.foreCastCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ForeCastCostDetailComponent,
        resolve: {
            foreCastCost: ForeCastCostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.foreCastCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ForeCastCostUpdateComponent,
        resolve: {
            foreCastCost: ForeCastCostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.foreCastCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ForeCastCostUpdateComponent,
        resolve: {
            foreCastCost: ForeCastCostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.foreCastCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const foreCastCostPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ForeCastCostDeletePopupComponent,
        resolve: {
            foreCastCost: ForeCastCostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.foreCastCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
