import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { FinancialProjectType, FinancialProjectTypeExist, IFinancialProject } from 'app/shared/model/financial-project.model';
import { FinancialProjectService } from './financial-project.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-financial-project-update',
    templateUrl: './financial-project-update.component.html'
})
export class FinancialProjectUpdateComponent implements OnInit {
    financialProject: IFinancialProject;
    isSaving: boolean;

    projects: IProject[];
    registerDate: string;
    startDate: string;
    finishDate: string;
    projectId: number;
    FinancialProjectType = FinancialProjectType;
    financialProjectTypeExist: FinancialProjectTypeExist = new FinancialProjectTypeExist();

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected financialProjectService: FinancialProjectService,
        protected projectService: ProjectService,
        protected activatedRoute: ActivatedRoute
    ) {
        this.projectId = Number(this.activatedRoute.snapshot.params['projectId']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ financialProject }) => {
            this.financialProject = financialProject;
            this.financialProject.projectId = this.projectId;
            this.registerDate = this.financialProject.registerDate != null ? this.financialProject.registerDate.format(DATE_FORMAT) : null;
            this.startDate = this.financialProject.startDate != null ? this.financialProject.startDate.format(DATE_FORMAT) : null;
            this.finishDate = this.financialProject.finishDate != null ? this.financialProject.finishDate.format(DATE_FORMAT) : null;
        });
        this.financialProjectService.getStyleForType(this.projectId).subscribe(value => (this.financialProjectTypeExist = value.body));
        this.projectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProject[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProject[]>) => response.body)
            )
            .subscribe((res: IProject[]) => (this.projects = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.financialProject.registerDate = this.registerDate != null ? moment(this.registerDate, DATE_FORMAT) : null;
        this.financialProject.startDate = this.startDate != null ? moment(this.startDate, DATE_FORMAT) : null;
        this.financialProject.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_FORMAT) : null;
        if (this.financialProject.id !== undefined) {
            this.subscribeToSaveResponse(this.financialProjectService.update(this.financialProject));
        } else {
            this.subscribeToSaveResponse(this.financialProjectService.create(this.financialProject));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFinancialProject>>) {
        result.subscribe((res: HttpResponse<IFinancialProject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }
}
