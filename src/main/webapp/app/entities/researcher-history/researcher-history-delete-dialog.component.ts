import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResearcherHistory } from 'app/shared/model/researcher-history.model';
import { ResearcherHistoryService } from './researcher-history.service';

@Component({
    selector: 'jhi-researcher-history-delete-dialog',
    templateUrl: './researcher-history-delete-dialog.component.html'
})
export class ResearcherHistoryDeleteDialogComponent {
    researcherHistory: IResearcherHistory;

    constructor(
        protected researcherHistoryService: ResearcherHistoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.researcherHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'researcherHistoryListModification',
                content: 'Deleted an researcherHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-researcher-history-delete-popup',
    template: ''
})
export class ResearcherHistoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ researcherHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ResearcherHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.researcherHistory = researcherHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/researcher-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/researcher-history', { outlets: { popup: null } }]);
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
