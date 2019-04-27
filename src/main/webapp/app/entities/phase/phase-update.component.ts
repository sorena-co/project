import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPhase } from 'app/shared/model/phase.model';
import { PhaseService } from './phase.service';

@Component({
    selector: 'jhi-phase-update',
    templateUrl: './phase-update.component.html'
})
export class PhaseUpdateComponent implements OnInit {
    phase: IPhase;
    isSaving: boolean;
    startDate: string;
    finishDate: string;

    constructor(protected phaseService: PhaseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ phase }) => {
            this.phase = phase;
            this.startDate = this.phase.startDate != null ? this.phase.startDate.format(DATE_TIME_FORMAT) : null;
            this.finishDate = this.phase.finishDate != null ? this.phase.finishDate.format(DATE_TIME_FORMAT) : null;
        });
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
}
