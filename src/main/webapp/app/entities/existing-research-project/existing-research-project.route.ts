import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExistingResearchProject } from 'app/shared/model/existing-research-project.model';
import { ExistingResearchProjectService } from './existing-research-project.service';
import { ExistingResearchProjectComponent } from './existing-research-project.component';
import { ExistingResearchProjectDetailComponent } from './existing-research-project-detail.component';
import { ExistingResearchProjectUpdateComponent } from './existing-research-project-update.component';
import { ExistingResearchProjectDeletePopupComponent } from './existing-research-project-delete-dialog.component';
import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';

@Injectable({ providedIn: 'root' })
export class ExistingResearchProjectResolve implements Resolve<IExistingResearchProject> {
    constructor(private service: ExistingResearchProjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExistingResearchProject> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ExistingResearchProject>) => response.ok),
                map((existingResearchProject: HttpResponse<ExistingResearchProject>) => existingResearchProject.body)
            );
        }
        return of(new ExistingResearchProject());
    }
}

export const existingResearchProjectRoute: Routes = [
    {
        path: '',
        component: ExistingResearchProjectComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.existingResearchProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ExistingResearchProjectDetailComponent,
        resolve: {
            existingResearchProject: ExistingResearchProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.existingResearchProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ExistingResearchProjectUpdateComponent,
        resolve: {
            existingResearchProject: ExistingResearchProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.existingResearchProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ExistingResearchProjectUpdateComponent,
        resolve: {
            existingResearchProject: ExistingResearchProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.existingResearchProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const existingResearchProjectPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ExistingResearchProjectDeletePopupComponent,
        resolve: {
            existingResearchProject: ExistingResearchProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.existingResearchProject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
