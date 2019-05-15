import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMainStep } from 'app/shared/model/main-step.model';
import { MainStepService } from './main-step.service';

@Component({
    selector: 'jhi-main-step-update',
    templateUrl: './main-step-update.component.html'
})
export class MainStepUpdateComponent implements OnInit {
    mainStep: IMainStep;
    isSaving: boolean;

    constructor(protected mainStepService: MainStepService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mainStep }) => {
            this.mainStep = mainStep;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mainStep.id !== undefined) {
            this.subscribeToSaveResponse(this.mainStepService.update(this.mainStep));
        } else {
            this.subscribeToSaveResponse(this.mainStepService.create(this.mainStep));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMainStep>>) {
        result.subscribe((res: HttpResponse<IMainStep>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
