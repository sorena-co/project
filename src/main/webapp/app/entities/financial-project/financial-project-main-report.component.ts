import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { FinancialProjectMain, IFinancialProject } from 'app/shared/model/financial-project.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { FinancialProjectService } from './financial-project.service';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-financial-project-main-report',
    templateUrl: './financial-project-main-report.component.html'
})
export class FinancialProjectMainReportComponent implements OnInit, OnDestroy {
    currentAccount: any;
    financialProjects: IFinancialProject[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    projectId: number;
    financialProjectMain: FinancialProjectMain = new FinancialProjectMain();

    constructor(
        protected financialProjectService: FinancialProjectService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected projectService: ProjectService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.projectId = Number(this.activatedRoute.snapshot.params['projectId']);
    }

    loadAll() {
        this.financialProjectService.getFinancialProjectMain(this.projectId).subscribe(
            (res: HttpResponse<FinancialProjectMain>) => {
                this.financialProjectMain = res.body;
                if (this.financialProjectMain.sendToProjectHaveCode > this.financialProjectMain.receivedFromOrganization) {
                    this.financialProjectMain.overfllowCost =
                        this.financialProjectMain.sendToProjectHaveCode - this.financialProjectMain.receivedFromOrganization;
                    this.financialProjectMain.remainCredit = 0;
                } else {
                    this.financialProjectMain.overfllowCost = 0;
                    this.financialProjectMain.remainCredit =
                        this.financialProjectMain.receivedFromOrganization - this.financialProjectMain.sendToProjectHaveCode;
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    transition() {
        this.router.navigate(['/project/' + this.projectId + '/financial-project'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFinancialProjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFinancialProject) {
        return item.id;
    }

    registerChangeInFinancialProjects() {
        this.eventSubscriber = this.eventManager.subscribe('financialProjectListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    navigateToDetail(type) {
        this.router.navigate(['/project/' + this.projectId + '/financial-project/details-of-main/' + type]);
    }
}
