import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IMainStep, MainStep } from 'app/shared/model/main-step.model';
import { MainStepService } from 'app/entities/main-step';
import { ICollageEducation } from 'app/shared/model/collage-education.model';
import { CollageEducationService } from 'app/entities/collage-education';
import { IResearcherHistory } from 'app/shared/model/researcher-history.model';
import { ResearcherHistoryService } from 'app/entities/researcher-history';
import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';
import { ExistingResearchProjectService } from 'app/entities/existing-research-project';
import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';
import { OrganizationPartnerService } from 'app/entities/organization-partner';
import { ICostSummary } from 'app/shared/model/cost-summary.model';
import { CostSummaryService } from 'app/entities/cost-summary';
import { Action } from 'app/shared/model/action.model';

@Component({
    selector: 'jhi-document-update',
    templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
    document: IDocument;
    isSaving: boolean;

    mainSteps: IMainStep[];

    collageeducations: ICollageEducation[];

    researcherhistories: IResearcherHistory[];

    existingresearchprojects: IExistingResearchProject[];

    organizationpartners: IOrganizationPartner[];

    costsummaries: ICostSummary[];
    exportPlanDate: string;
    executivePlanDate: string;
    fromPlanDate: string;
    toPlanDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected documentService: DocumentService,
        protected mainStepService: MainStepService,
        protected collageEducationService: CollageEducationService,
        protected researcherHistoryService: ResearcherHistoryService,
        protected existingResearchProjectService: ExistingResearchProjectService,
        protected organizationPartnerService: OrganizationPartnerService,
        protected costSummaryService: CostSummaryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
            this.exportPlanDate = this.document.exportPlanDate != null ? this.document.exportPlanDate.format(DATE_TIME_FORMAT) : null;
            this.executivePlanDate =
                this.document.executivePlanDate != null ? this.document.executivePlanDate.format(DATE_TIME_FORMAT) : null;
            this.fromPlanDate = this.document.fromPlanDate != null ? this.document.fromPlanDate.format(DATE_TIME_FORMAT) : null;
            this.toPlanDate = this.document.toPlanDate != null ? this.document.toPlanDate.format(DATE_TIME_FORMAT) : null;
        });
        this.mainStepService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMainStep[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMainStep[]>) => response.body)
            )
            .subscribe((res: IMainStep[]) => (this.mainSteps = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.collageEducationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICollageEducation[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICollageEducation[]>) => response.body)
            )
            .subscribe((res: ICollageEducation[]) => (this.collageeducations = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.researcherHistoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IResearcherHistory[]>) => mayBeOk.ok),
                map((response: HttpResponse<IResearcherHistory[]>) => response.body)
            )
            .subscribe(
                (res: IResearcherHistory[]) => (this.researcherhistories = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.existingResearchProjectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IExistingResearchProject[]>) => mayBeOk.ok),
                map((response: HttpResponse<IExistingResearchProject[]>) => response.body)
            )
            .subscribe(
                (res: IExistingResearchProject[]) => (this.existingresearchprojects = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.organizationPartnerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IOrganizationPartner[]>) => mayBeOk.ok),
                map((response: HttpResponse<IOrganizationPartner[]>) => response.body)
            )
            .subscribe(
                (res: IOrganizationPartner[]) => (this.organizationpartners = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.costSummaryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICostSummary[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICostSummary[]>) => response.body)
            )
            .subscribe((res: ICostSummary[]) => (this.costsummaries = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }
    trackId(index: number, item: IMainStep) {
        return item.id;
    }

    save() {
        this.isSaving = true;
        this.document.exportPlanDate = this.exportPlanDate != null ? moment(this.exportPlanDate, DATE_TIME_FORMAT) : null;
        this.document.executivePlanDate = this.executivePlanDate != null ? moment(this.executivePlanDate, DATE_TIME_FORMAT) : null;
        this.document.fromPlanDate = this.fromPlanDate != null ? moment(this.fromPlanDate, DATE_TIME_FORMAT) : null;
        this.document.toPlanDate = this.toPlanDate != null ? moment(this.toPlanDate, DATE_TIME_FORMAT) : null;
        this.document.mainSteps = this.mainSteps;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMainStepById(index: number, item: IMainStep) {
        return item.id;
    }

    trackCollageEducationById(index: number, item: ICollageEducation) {
        return item.id;
    }

    trackResearcherHistoryById(index: number, item: IResearcherHistory) {
        return item.id;
    }

    trackExistingResearchProjectById(index: number, item: IExistingResearchProject) {
        return item.id;
    }

    trackOrganizationPartnerById(index: number, item: IOrganizationPartner) {
        return item.id;
    }

    trackCostSummaryById(index: number, item: ICostSummary) {
        return item.id;
    }

    editOrCreate(item: Action) {
        /*if (item.id) {
            this.actionService.update(item).subscribe(value => this.loadAll());
        } else {
            this.actionService.create(item).subscribe(value => this.loadAll());
        }*/
    }

    createNewMainStep() {
        this.mainSteps.push(new MainStep());
    }
}
