import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { IPhase } from 'app/shared/model/phase.model';
import { PhaseService } from 'app/entities/phase';

@Component({
    selector: 'jhi-action-update',
    templateUrl: './action-update.component.html'
})
export class ActionUpdateComponent implements OnInit {
    action: IAction;
    isSaving: boolean;

    phases: IPhase[];
    startDate: string;
    finishDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected actionService: ActionService,
        protected phaseService: PhaseService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ action }) => {
            this.action = action;
            this.startDate = this.action.startDate != null ? this.action.startDate.format(DATE_TIME_FORMAT) : null;
            this.finishDate = this.action.finishDate != null ? this.action.finishDate.format(DATE_TIME_FORMAT) : null;
        });
        this.phaseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPhase[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPhase[]>) => response.body)
            )
            .subscribe((res: IPhase[]) => (this.phases = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.action.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.action.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_TIME_FORMAT) : null;
        if (this.action.id !== undefined) {
            this.subscribeToSaveResponse(this.actionService.update(this.action));
        } else {
            this.subscribeToSaveResponse(this.actionService.create(this.action));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
        result.subscribe((res: HttpResponse<IAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPhaseById(index: number, item: IPhase) {
        return item.id;
    }
}
