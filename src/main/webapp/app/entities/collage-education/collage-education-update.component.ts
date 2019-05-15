import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICollageEducation } from 'app/shared/model/collage-education.model';
import { CollageEducationService } from './collage-education.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-collage-education-update',
    templateUrl: './collage-education-update.component.html'
})
export class CollageEducationUpdateComponent implements OnInit {
    collageEducation: ICollageEducation;
    isSaving: boolean;

    documents: IDocument[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected collageEducationService: CollageEducationService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ collageEducation }) => {
            this.collageEducation = collageEducation;
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
        if (this.collageEducation.id !== undefined) {
            this.subscribeToSaveResponse(this.collageEducationService.update(this.collageEducation));
        } else {
            this.subscribeToSaveResponse(this.collageEducationService.create(this.collageEducation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICollageEducation>>) {
        result.subscribe((res: HttpResponse<ICollageEducation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
