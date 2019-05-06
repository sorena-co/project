import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProject, Project } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectUpdateComponent } from './project-update.component';
import { ProjectDeletePopupComponent } from './project-delete-dialog.component';
import { ProjectGanttComponent } from 'app/entities/project/project-gantt.component';

@Injectable({ providedIn: 'root' })
export class ProjectResolve implements Resolve<IProject> {
    constructor(private service: ProjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Project>) => response.ok),
                map((project: HttpResponse<Project>) => project.body)
            );
        }
        return of(new Project());
    }
}

export const projectRoute: Routes = [
    {
        path: '',
        component: ProjectComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':projectId/gantt',
        component: ProjectGanttComponent,
        resolve: {
            project: ProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProjectDetailComponent,
        resolve: {
            project: ProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProjectUpdateComponent,
        resolve: {
            project: ProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProjectUpdateComponent,
        resolve: {
            project: ProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProjectDeletePopupComponent,
        resolve: {
            project: ProjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
