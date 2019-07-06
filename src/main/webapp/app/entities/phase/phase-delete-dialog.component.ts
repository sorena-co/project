import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhase } from 'app/shared/model/phase.model';
import { PhaseService } from './phase.service';

@Component({
    selector: 'jhi-phase-delete-dialog',
    templateUrl: './phase-delete-dialog.component.html'
})
export class PhaseDeleteDialogComponent {
    phase: IPhase;

    constructor(protected phaseService: PhaseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.phaseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'phaseListModification',
                content: 'Deleted an phase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-phase-delete-popup',
    template: ''
})
export class PhaseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ phase }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PhaseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.phase = phase;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/project' + phase.projectId + '/phase', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/project' + phase.projectId + '/phase', { outlets: { popup: null } }]);
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
