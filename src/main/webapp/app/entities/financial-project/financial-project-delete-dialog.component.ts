import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFinancialProject } from 'app/shared/model/financial-project.model';
import { FinancialProjectService } from './financial-project.service';

@Component({
    selector: 'jhi-financial-project-delete-dialog',
    templateUrl: './financial-project-delete-dialog.component.html'
})
export class FinancialProjectDeleteDialogComponent {
    financialProject: IFinancialProject;

    constructor(
        protected financialProjectService: FinancialProjectService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.financialProjectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'financialProjectListModification',
                content: 'Deleted an financialProject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-financial-project-delete-popup',
    template: ''
})
export class FinancialProjectDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ financialProject }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FinancialProjectDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.financialProject = financialProject;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/financial-project', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/financial-project', { outlets: { popup: null } }]);
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
