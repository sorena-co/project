import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { Action, IAction } from 'app/shared/model/action.model';
import { AccountService } from 'app/core';

import { DATE_FORMAT, ITEMS_PER_PAGE, JALALI_DATE_FORMAT } from 'app/shared';
import { ActionService } from './action.service';
import * as jalali from 'jalali-moment';
@Component({
    selector: 'jhi-action',
    templateUrl: './action.component.html'
})
export class ActionComponent implements OnInit, OnDestroy {
    currentAccount: any;
    actions: IAction[];
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
    phaseId: number;
    projectId: number;

    constructor(
        protected actionService: ActionService,
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

        this.phaseId = Number(this.activatedRoute.snapshot.params['phaseId']);
        this.projectId = Number(this.activatedRoute.snapshot.params['projectId']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.actionService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IAction[]>) => this.paginateActions(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.actionService
            .query(this.phaseId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAction[]>) => this.paginateActions(res.body, res.headers),
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
        this.router.navigate(['/action'], {
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
            '/action',
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
            '/action',
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
        this.registerChangeInActions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAction) {
        return item.id;
    }

    registerChangeInActions() {
        this.eventSubscriber = this.eventManager.subscribe('actionListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateActions(data: IAction[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.actions = data;
        this.actions.forEach(action => {
            const startDate = action.startDate != null ? action.startDate.format(DATE_FORMAT) : null;
            const finishDate = action.finishDate != null ? action.finishDate.format(DATE_FORMAT) : null;
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
            action.startDate = jalaliStartDate != null ? jalali(jalaliStartDate, JALALI_DATE_FORMAT) : null;
            action.finishDate = jalaliFinishDate != null ? jalali(jalaliFinishDate, JALALI_DATE_FORMAT) : null;
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    editOrCreate(item: Action) {
        if (item.id) {
            this.actionService.update(item).subscribe(value => this.loadAll());
        } else {
            this.actionService.create(item).subscribe(value => this.loadAll());
        }
    }

    createNewAction() {
        const action = new Action();
        action.phaseId = this.phaseId;
        this.actions.push(action);
    }
}
