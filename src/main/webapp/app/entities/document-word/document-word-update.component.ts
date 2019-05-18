import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDocumentWord } from 'app/shared/model/document-word.model';
import { DocumentWordService } from './document-word.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-document-word-update',
    templateUrl: './document-word-update.component.html'
})
export class DocumentWordUpdateComponent implements OnInit {
    documentWord: IDocumentWord;
    isSaving: boolean;

    documents: IDocument[];
    documentId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected documentWordService: DocumentWordService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {
        this.documentId = Number(this.activatedRoute.snapshot.params['documentId']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ documentWord }) => {
            this.documentWord = documentWord;
            this.documentWord.documentId = this.documentId;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.documentWord.id !== undefined) {
            this.subscribeToSaveResponse(this.documentWordService.update(this.documentWord));
        } else {
            this.subscribeToSaveResponse(this.documentWordService.create(this.documentWord));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentWord>>) {
        result.subscribe((res: HttpResponse<IDocumentWord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
