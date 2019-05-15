import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICostSummary } from 'app/shared/model/cost-summary.model';
import { CostSummaryService } from './cost-summary.service';

@Component({
    selector: 'jhi-cost-summary-delete-dialog',
    templateUrl: './cost-summary-delete-dialog.component.html'
})
export class CostSummaryDeleteDialogComponent {
    costSummary: ICostSummary;

    constructor(
        protected costSummaryService: CostSummaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costSummaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'costSummaryListModification',
                content: 'Deleted an costSummary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-summary-delete-popup',
    template: ''
})
export class CostSummaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ costSummary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CostSummaryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.costSummary = costSummary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cost-summary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cost-summary', { outlets: { popup: null } }]);
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
