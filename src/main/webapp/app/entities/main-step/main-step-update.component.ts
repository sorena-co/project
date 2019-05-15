import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMainStep } from 'app/shared/model/main-step.model';
import { MainStepService } from './main-step.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-main-step-update',
    templateUrl: './main-step-update.component.html'
})
export class MainStepUpdateComponent implements OnInit {
    mainStep: IMainStep;
    isSaving: boolean;

    documents: IDocument[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mainStepService: MainStepService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mainStep }) => {
            this.mainStep = mainStep;
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }
}
