import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICostSummary } from 'app/shared/model/cost-summary.model';
import { CostSummaryService } from './cost-summary.service';

@Component({
    selector: 'jhi-cost-summary-update',
    templateUrl: './cost-summary-update.component.html'
})
export class CostSummaryUpdateComponent implements OnInit {
    costSummary: ICostSummary;
    isSaving: boolean;

    constructor(protected costSummaryService: CostSummaryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ costSummary }) => {
            this.costSummary = costSummary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.costSummary.id !== undefined) {
            this.subscribeToSaveResponse(this.costSummaryService.update(this.costSummary));
        } else {
            this.subscribeToSaveResponse(this.costSummaryService.create(this.costSummary));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostSummary>>) {
        result.subscribe((res: HttpResponse<ICostSummary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
