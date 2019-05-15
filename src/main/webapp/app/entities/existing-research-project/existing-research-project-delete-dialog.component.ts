import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';
import { ExistingResearchProjectService } from './existing-research-project.service';

@Component({
    selector: 'jhi-existing-research-project-delete-dialog',
    templateUrl: './existing-research-project-delete-dialog.component.html'
})
export class ExistingResearchProjectDeleteDialogComponent {
    existingResearchProject: IExistingResearchProject;

    constructor(
        protected existingResearchProjectService: ExistingResearchProjectService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.existingResearchProjectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'existingResearchProjectListModification',
                content: 'Deleted an existingResearchProject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-existing-research-project-delete-popup',
    template: ''
})
export class ExistingResearchProjectDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ existingResearchProject }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExistingResearchProjectDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.existingResearchProject = existingResearchProject;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/existing-research-project', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/existing-research-project', { outlets: { popup: null } }]);
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
