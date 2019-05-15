import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';
import { OrganizationPartnerService } from './organization-partner.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';

@Component({
    selector: 'jhi-organization-partner-update',
    templateUrl: './organization-partner-update.component.html'
})
export class OrganizationPartnerUpdateComponent implements OnInit {
    organizationPartner: IOrganizationPartner;
    isSaving: boolean;

    documents: IDocument[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected organizationPartnerService: OrganizationPartnerService,
        protected documentService: DocumentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ organizationPartner }) => {
            this.organizationPartner = organizationPartner;
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
        if (this.organizationPartner.id !== undefined) {
            this.subscribeToSaveResponse(this.organizationPartnerService.update(this.organizationPartner));
        } else {
            this.subscribeToSaveResponse(this.organizationPartnerService.create(this.organizationPartner));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganizationPartner>>) {
        result.subscribe((res: HttpResponse<IOrganizationPartner>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
