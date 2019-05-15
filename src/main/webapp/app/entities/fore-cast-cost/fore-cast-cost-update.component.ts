import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';
import { ForeCastCostService } from './fore-cast-cost.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-fore-cast-cost-update',
    templateUrl: './fore-cast-cost-update.component.html'
})
export class ForeCastCostUpdateComponent implements OnInit {
    foreCastCost: IForeCastCost;
    isSaving: boolean;

    documents: IDocument[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected foreCastCostService: ForeCastCostService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ foreCastCost }) => {
            this.foreCastCost = foreCastCost;
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
        if (this.foreCastCost.id !== undefined) {
            this.subscribeToSaveResponse(this.foreCastCostService.update(this.foreCastCost));
        } else {
            this.subscribeToSaveResponse(this.foreCastCostService.create(this.foreCastCost));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IForeCastCost>>) {
        result.subscribe((res: HttpResponse<IForeCastCost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
