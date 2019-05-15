import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICostSummary } from 'app/shared/model/cost-summary.model';
import { CostSummaryService } from './cost-summary.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-cost-summary-update',
    templateUrl: './cost-summary-update.component.html'
})
export class CostSummaryUpdateComponent implements OnInit {
    costSummary: ICostSummary;
    isSaving: boolean;

    documents: IDocument[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected costSummaryService: CostSummaryService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ costSummary }) => {
            this.costSummary = costSummary;
        });
        this.documentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDocument[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDocument[]>) => response.body)
            )
            .subscribe((res: IDocument[]) => (this.documents = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }
}
