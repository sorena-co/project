import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IPhase, Phase } from 'app/shared/model/phase.model';
import { AccountService } from 'app/core';

import { DATE_FORMAT, DATE_TIME_FORMAT, ITEMS_PER_PAGE, JALALI_DATE_FORMAT } from 'app/shared';
import { PhaseService } from './phase.service';

import * as jalali from 'jalali-moment';
@Component({
    selector: 'jhi-phase',
    templateUrl: './phase.component.html'
})
export class PhaseComponent implements OnInit, OnDestroy {
    currentAccount: any;
    phases: IPhase[];
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

    constructor(
        protected phaseService: PhaseService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
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
        if (this.currentSearch) {
            this.phaseService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IPhase[]>) => this.paginatePhases(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.phaseService
            .query(this.projectId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPhase[]>) => this.paginatePhases(res.body, res.headers),
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
        this.router.navigate(['/project/' + this.projectId + '/phase'], {
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
            '/project/' + this.projectId + '/phase',
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
            '/project/' + this.projectId + '/phase',
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
        this.registerChangeInPhases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPhase) {
        return item.id;
    }

    registerChangeInPhases() {
        this.eventSubscriber = this.eventManager.subscribe('phaseListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePhases(data: IPhase[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.phases = data;
        this.phases.forEach(phase => {
            const startDate = phase.startDate != null ? phase.startDate.format(DATE_FORMAT) : null;
            const finishDate = phase.finishDate != null ? phase.finishDate.format(DATE_FORMAT) : null;
            const jalaliStartDate =
                startDate != null
                    ? jalali(startDate, DATE_FORMAT)
                          .locale('fa')
                          .format(DATE_FORMAT)
                    : null;
            const jalaliFinishDate =
                finishDate != null
                    ? jalali(finishDate, DATE_FORMAT)
                          .locale('fa')
                          .format(DATE_FORMAT)
                    : null;
            phase.startDate = jalaliStartDate != null ? jalali(jalaliStartDate, JALALI_DATE_FORMAT) : null;
            phase.finishDate = jalaliFinishDate != null ? jalali(jalaliFinishDate, JALALI_DATE_FORMAT) : null;
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    editOrCreate(item: Phase) {
        if (item.id) {
            this.phaseService.update(item).subscribe(value => this.loadAll());
        } else {
            this.phaseService.create(item).subscribe(value => this.loadAll());
        }
    }

    createNewPhase() {
        const phase = new Phase();
        phase.projectId = this.projectId;
        this.phases.push(phase);
    }
}
