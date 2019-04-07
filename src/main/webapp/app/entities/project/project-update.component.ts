import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IProject, Project } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';
import { User, UserService } from 'app/core';

@Component({
    selector: 'jhi-project-update',
    templateUrl: './project-update.component.html'
})
export class ProjectUpdateComponent implements OnInit {
    project: IProject;
    isSaving: boolean;
    createDate: string;
    startDate: string;
    finishDate: string;
    users: User[];
    projects: Project[] = [];

    constructor(protected projectService: ProjectService, protected activatedRoute: ActivatedRoute, private userService: UserService) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
            this.project.startDate = this.project.startDate != null ? moment(this.project.startDate, DATE_FORMAT) : null;
            this.project.finishDate = this.project.finishDate != null ? moment(this.project.finishDate, DATE_FORMAT) : null;
            this.createDate = this.project.createDate != null ? this.project.createDate.format(DATE_FORMAT) : null;
            this.startDate = this.project.startDate != null ? this.project.startDate.format(DATE_FORMAT) : null;
            this.finishDate = this.project.finishDate != null ? this.project.finishDate.format(DATE_FORMAT) : null;
        });
        this.userService.query().subscribe(value => (this.users = value.body));
        this.projectService.query().subscribe(value => (this.projects = value.body));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (!this.project.parentProjectId) {
            this.project.level = 0;
            this.project.createDate = this.createDate != null ? moment(this.createDate, DATE_FORMAT) : null;
            this.project.startDate = this.startDate != null ? moment(this.startDate, DATE_FORMAT) : null;
            this.project.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_FORMAT) : null;
            if (this.project.id !== undefined) {
                this.subscribeToSaveResponse(this.projectService.update(this.project));
            } else {
                this.subscribeToSaveResponse(this.projectService.create(this.project));
            }
        } else {
            this.projectService.find(this.project.parentProjectId).subscribe(value => {
                this.project.level = value.body.level + 1;
                this.project.createDate = this.createDate != null ? moment(this.createDate, DATE_FORMAT) : null;
                this.project.startDate = this.startDate != null ? moment(this.startDate, DATE_FORMAT) : null;
                this.project.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_FORMAT) : null;
                if (this.project.id !== undefined) {
                    this.subscribeToSaveResponse(this.projectService.update(this.project));
                } else {
                    this.subscribeToSaveResponse(this.projectService.create(this.project));
                }
            });
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>) {
        result.subscribe((res: HttpResponse<IProject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
