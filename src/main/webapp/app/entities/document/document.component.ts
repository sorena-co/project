import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DocumentService } from './document.service';
import { MenuItem } from 'primeng/api';
import { DocumentWord } from 'app/shared/model/document-word.model';
import { DocumentWordService } from 'app/entities/document-word';

@Component({
    selector: 'jhi-document',
    templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
    currentAccount: any;
    documents: IDocument[];
    documentWord: DocumentWord;
    documentPDF: DocumentWord;
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
    items: MenuItem[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected documentService: DocumentService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected documentWordService: DocumentWordService,
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
            this.documentService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IDocument[]>) => this.paginateDocuments(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.documentService
            .query(this.projectId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDocument[]>) => this.paginateDocuments(res.body, res.headers),
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
        this.router.navigate(['/document'], {
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
            '/document',
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
            '/document',
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
        this.registerChangeInDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocument) {
        return item.id;
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateDocuments(data: IDocument[], headers: HttpHeaders) {
        this.documents = data;
        this.documents.forEach(document => {
            if (document.documentFiles) {
                this.documentWord = document.documentFiles.find(documentFile => documentFile.type === 'WORD');
                this.documentPDF = document.documentFiles.find(documentFile => documentFile.type === 'PDF');
                if (!this.documentWord) {
                    this.documentWord = new DocumentWord();
                }
                if (!this.documentPDF) {
                    this.documentPDF = new DocumentWord();
                }
            } else {
                this.documentWord = new DocumentWord();
                this.documentPDF = new DocumentWord();
            }
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    loadDocumentFilePage(document) {
        this.router.navigate(['/project', document.projectId, 'document', document.id, 'document-word']);
    }

    openFileBrowser(event?: any, type?: any) {
        /*  if (event) {
              event.preventDefault();
          }*/
        let element: HTMLElement = document.getElementById('file_file_' + type) as HTMLElement;
        element.click();
    }

    setFileData(event, entity: DocumentWord, field, isImage, document: IDocument, type) {
        // entity = new DocumentWord();
        this.dataUtils.setFileData(event, entity, field, isImage);
        entity.documentId = document.id;
        entity.type = type;
        entity.id = null;
        var self = this;
        setTimeout(function() {
            self.documentWordService.create(entity).subscribe(value => {
                console.log(value);
                self.loadAll();
            });
        }, 3000);
    }

    download(item: DocumentWord, type) {
        return this.dataUtils.downloadFile(item.fileContentType, item.file, 'file.' + type);
    }

    getItems(i) {
        this.items = [
            {
                label: 'بارگزاری فایل PDF',
                icon: 'pi pi-upload',
                command: () => {
                    this.openFileBrowser(null, 'pdf');
                }
            },
            {
                label: 'دانلود فایل PDF',
                icon: 'pi pi-download',
                command: () => {
                    if (this.documents[i].documentFiles) {
                        this.documentPDF = this.documents[i].documentFiles.find(documentFile => documentFile.type === 'PDF');
                        if (this.documentPDF) {
                            this.download(this.documentPDF, 'pdf');
                        }
                    }
                }
            },
            {
                label: 'بارگزاری فایل Word',
                icon: 'pi pi-upload',
                command: () => {
                    this.openFileBrowser(null, 'word');
                }
            },
            {
                label: 'دانلود فایل Word',
                icon: 'pi pi-download',
                command: () => {
                    if (this.documents[i].documentFiles) {
                        this.documentWord = this.documents[i].documentFiles.find(documentFile => documentFile.type === 'WORD');
                        if (this.documentWord) {
                            this.download(this.documentWord, 'docx');
                        }
                    }
                }
            }
        ];
        return this.items;
    }
}
