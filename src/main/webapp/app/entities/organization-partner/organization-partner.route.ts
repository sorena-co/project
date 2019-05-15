import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrganizationPartner } from 'app/shared/model/organization-partner.model';
import { OrganizationPartnerService } from './organization-partner.service';
import { OrganizationPartnerComponent } from './organization-partner.component';
import { OrganizationPartnerDetailComponent } from './organization-partner-detail.component';
import { OrganizationPartnerUpdateComponent } from './organization-partner-update.component';
import { OrganizationPartnerDeletePopupComponent } from './organization-partner-delete-dialog.component';
import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';

@Injectable({ providedIn: 'root' })
export class OrganizationPartnerResolve implements Resolve<IOrganizationPartner> {
    constructor(private service: OrganizationPartnerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrganizationPartner> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrganizationPartner>) => response.ok),
                map((organizationPartner: HttpResponse<OrganizationPartner>) => organizationPartner.body)
            );
        }
        return of(new OrganizationPartner());
    }
}

export const organizationPartnerRoute: Routes = [
    {
        path: '',
        component: OrganizationPartnerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.organizationPartner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrganizationPartnerDetailComponent,
        resolve: {
            organizationPartner: OrganizationPartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.organizationPartner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrganizationPartnerUpdateComponent,
        resolve: {
            organizationPartner: OrganizationPartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.organizationPartner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OrganizationPartnerUpdateComponent,
        resolve: {
            organizationPartner: OrganizationPartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.organizationPartner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizationPartnerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OrganizationPartnerDeletePopupComponent,
        resolve: {
            organizationPartner: OrganizationPartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.organizationPartner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
