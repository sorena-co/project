import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';
import { ExistingResearchProjectService } from './existing-research-project.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-existing-research-project-update',
    templateUrl: './existing-research-project-update.component.html'
})
export class ExistingResearchProjectUpdateComponent implements OnInit {
    existingResearchProject: IExistingResearchProject;
    isSaving: boolean;

    documents: IDocument[];
    fromDate: string;
    toDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected existingResearchProjectService: ExistingResearchProjectService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ existingResearchProject }) => {
            this.existingResearchProject = existingResearchProject;
            this.fromDate =
                this.existingResearchProject.fromDate != null ? this.existingResearchProject.fromDate.format(DATE_TIME_FORMAT) : null;
            this.toDate = this.existingResearchProject.toDate != null ? this.existingResearchProject.toDate.format(DATE_TIME_FORMAT) : null;
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }
}