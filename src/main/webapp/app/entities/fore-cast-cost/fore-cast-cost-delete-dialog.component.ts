import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';
import { ForeCastCostService } from './fore-cast-cost.service';

@Component({
    selector: 'jhi-fore-cast-cost-delete-dialog',
    templateUrl: './fore-cast-cost-delete-dialog.component.html'
})
export class ForeCastCostDeleteDialogComponent {
    foreCastCost: IForeCastCost;

    constructor(
        protected foreCastCostService: ForeCastCostService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.foreCastCostService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'foreCastCostListModification',
                content: 'Deleted an foreCastCost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fore-cast-cost-delete-popup',
    template: ''
})
export class ForeCastCostDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ foreCastCost }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ForeCastCostDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.foreCastCost = foreCastCost;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/fore-cast-cost', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/fore-cast-cost', { outlets: { popup: null } }]);
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
