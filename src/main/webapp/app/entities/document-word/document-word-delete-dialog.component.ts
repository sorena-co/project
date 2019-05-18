import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentWord } from 'app/shared/model/document-word.model';
import { DocumentWordService } from './document-word.service';

@Component({
    selector: 'jhi-document-word-delete-dialog',
    templateUrl: './document-word-delete-dialog.component.html'
})
export class DocumentWordDeleteDialogComponent {
    documentWord: IDocumentWord;

    constructor(
        protected documentWordService: DocumentWordService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentWordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentWordListModification',
                content: 'Deleted an documentWord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-word-delete-popup',
    template: ''
})
export class DocumentWordDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentWord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentWordDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentWord = documentWord;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/document-word', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/document-word', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
