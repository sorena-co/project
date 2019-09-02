import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { FinancialProject, FinancialProjectType, IFinancialProject } from 'app/shared/model/financial-project.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { FinancialProjectService } from './financial-project.service';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-financial-project',
    templateUrl: './financial-project.component.html'
})
export class FinancialProjectComponent implements OnInit, OnDestroy {
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
    type: any;
    FinancialProjectType = FinancialProjectType;

    constructor(
        protected dataUtils: JhiDataUtils,
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
        this.type = this.activatedRoute.snapshot.params['type'];
    }

    loadAll() {
        if (this.currentSearch) {
            this.financialProjectService
                .search({
                    page: this.page - 1,
                    type: this.type,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IFinancialProject[]>) => this.paginateFinancialProjects(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.financialProjectService
            .query(this.projectId, {
                page: this.page - 1,
                type: this.type,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFinancialProject[]>) => this.paginateFinancialProjects(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/project/' + this.projectId + '/financial-project/details-of-main/' + this.type], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/project/' + this.projectId + '/financial-project/details-of-main/' + this.type,
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/project/' + this.projectId + '/financial-project/details-of-main/' + this.type,
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
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

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateFinancialProjects(data: IFinancialProject[], headers: HttpHeaders) {
        this.financialProjects = data;
        this.financialProjects.forEach(value => {
            if (value.getCreditProjectId) {
                this.projectService.find(value.getCreditProjectId).subscribe(projectRes => {
                    value.getCreditProjectTitle = projectRes.body.title;
                });
            }
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    editFinancialProject(item: FinancialProject) {
        this.financialProjectService.update(item).subscribe(value => console.log(value));
    }

    download() {
        this.financialProjectService.download(this.projectId, this.type).subscribe(
            value => {
                return this.dataUtils.downloadFile('applications/ms-xlsx', value.body, this.type + '.xlsx');
            },
            error1 => {
                console.log(error1);
                return this.dataUtils.downloadFile('applications/ms-xlsx', error1.error.text, this.type + '.xlsx');
            }
        );
    }
}
