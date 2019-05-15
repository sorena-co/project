import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CollageEducation } from 'app/shared/model/collage-education.model';
import { CollageEducationService } from './collage-education.service';
import { CollageEducationComponent } from './collage-education.component';
import { CollageEducationDetailComponent } from './collage-education-detail.component';
import { CollageEducationUpdateComponent } from './collage-education-update.component';
import { CollageEducationDeletePopupComponent } from './collage-education-delete-dialog.component';
import { ICollageEducation } from 'app/shared/model/collage-education.model';

@Injectable({ providedIn: 'root' })
export class CollageEducationResolve implements Resolve<ICollageEducation> {
    constructor(private service: CollageEducationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICollageEducation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CollageEducation>) => response.ok),
                map((collageEducation: HttpResponse<CollageEducation>) => collageEducation.body)
            );
        }
        return of(new CollageEducation());
    }
}

export const collageEducationRoute: Routes = [
    {
        path: '',
        component: CollageEducationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.collageEducation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CollageEducationDetailComponent,
        resolve: {
            collageEducation: CollageEducationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.collageEducation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CollageEducationUpdateComponent,
        resolve: {
            collageEducation: CollageEducationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.collageEducation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CollageEducationUpdateComponent,
        resolve: {
            collageEducation: CollageEducationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.collageEducation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const collageEducationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CollageEducationDeletePopupComponent,
        resolve: {
            collageEducation: CollageEducationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.collageEducation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
