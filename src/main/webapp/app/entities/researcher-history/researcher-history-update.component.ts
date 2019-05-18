import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IResearcherHistory } from 'app/shared/model/researcher-history.model';
import { ResearcherHistoryService } from './researcher-history.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-researcher-history-update',
    templateUrl: './researcher-history-update.component.html'
})
export class ResearcherHistoryUpdateComponent implements OnInit {
    researcherHistory: IResearcherHistory;
    isSaving: boolean;

    documents: IDocument[];
    fromDate: string;
    toDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected researcherHistoryService: ResearcherHistoryService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ researcherHistory }) => {
            this.researcherHistory = researcherHistory;
            this.fromDate = this.researcherHistory.fromDate != null ? this.researcherHistory.fromDate.format(DATE_TIME_FORMAT) : null;
            this.toDate = this.researcherHistory.toDate != null ? this.researcherHistory.toDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.researcherHistory.fromDate = this.fromDate != null ? moment(this.fromDate, DATE_TIME_FORMAT) : null;
        this.researcherHistory.toDate = this.toDate != null ? moment(this.toDate, DATE_TIME_FORMAT) : null;
        if (this.researcherHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.researcherHistoryService.update(this.researcherHistory));
        } else {
            this.subscribeToSaveResponse(this.researcherHistoryService.create(this.researcherHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IResearcherHistory>>) {
        result.subscribe((res: HttpResponse<IResearcherHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
