import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMainStep } from 'app/shared/model/main-step.model';
import { MainStepService } from './main-step.service';

@Component({
    selector: 'jhi-main-step-delete-dialog',
    templateUrl: './main-step-delete-dialog.component.html'
})
export class MainStepDeleteDialogComponent {
    mainStep: IMainStep;

    constructor(protected mainStepService: MainStepService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mainStepService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mainStepListModification',
                content: 'Deleted an mainStep'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-step-delete-popup',
    template: ''
})
export class MainStepDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mainStep }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MainStepDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mainStep = mainStep;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/main-step', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/main-step', { outlets: { popup: null } }]);
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
