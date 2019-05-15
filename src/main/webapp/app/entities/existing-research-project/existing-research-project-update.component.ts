import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';
import { ExistingResearchProjectService } from './existing-research-project.service';

@Component({
    selector: 'jhi-existing-research-project-update',
    templateUrl: './existing-research-project-update.component.html'
})
export class ExistingResearchProjectUpdateComponent implements OnInit {
    existingResearchProject: IExistingResearchProject;
    isSaving: boolean;
    fromDate: string;
    toDate: string;

    constructor(protected existingResearchProjectService: ExistingResearchProjectService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ existingResearchProject }) => {
            this.existingResearchProject = existingResearchProject;
            this.fromDate =
                this.existingResearchProject.fromDate != null ? this.existingResearchProject.fromDate.format(DATE_TIME_FORMAT) : null;
            this.toDate = this.existingResearchProject.toDate != null ? this.existingResearchProject.toDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.existingResearchProject.fromDate = this.fromDate != null ? moment(this.fromDate, DATE_TIME_FORMAT) : null;
        this.existingResearchProject.toDate = this.toDate != null ? moment(this.toDate, DATE_TIME_FORMAT) : null;
        if (this.existingResearchProject.id !== undefined) {
            this.subscribeToSaveResponse(this.existingResearchProjectService.update(this.existingResearchProject));
        } else {
            this.subscribeToSaveResponse(this.existingResearchProjectService.create(this.existingResearchProject));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExistingResearchProject>>) {
        result.subscribe(
            (res: HttpResponse<IExistingResearchProject>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
