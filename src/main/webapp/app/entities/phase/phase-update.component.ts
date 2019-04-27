import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPhase } from 'app/shared/model/phase.model';
import { PhaseService } from './phase.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-phase-update',
    templateUrl: './phase-update.component.html'
})
export class PhaseUpdateComponent implements OnInit {
    phase: IPhase;
    isSaving: boolean;

    projects: IProject[];
    startDate: string;
    finishDate: string;
    projectId: number;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected phaseService: PhaseService,
        protected projectService: ProjectService,
        protected activatedRoute: ActivatedRoute
    ) {
        this.projectId = Number(this.activatedRoute.snapshot.params['projectId']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ phase }) => {
            this.phase = phase;
            this.phase.projectId = this.projectId;
            this.startDate = this.phase.startDate != null ? this.phase.startDate.format(DATE_TIME_FORMAT) : null;
            this.finishDate = this.phase.finishDate != null ? this.phase.finishDate.format(DATE_TIME_FORMAT) : null;
        });
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
        this.phase.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.phase.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_TIME_FORMAT) : null;
        if (this.phase.id !== undefined) {
            this.subscribeToSaveResponse(this.phaseService.update(this.phase));
        } else {
            this.subscribeToSaveResponse(this.phaseService.create(this.phase));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhase>>) {
        result.subscribe((res: HttpResponse<IPhase>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
