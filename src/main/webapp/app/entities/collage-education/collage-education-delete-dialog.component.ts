import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICollageEducation } from 'app/shared/model/collage-education.model';
import { CollageEducationService } from './collage-education.service';

@Component({
    selector: 'jhi-collage-education-delete-dialog',
    templateUrl: './collage-education-delete-dialog.component.html'
})
export class CollageEducationDeleteDialogComponent {
    collageEducation: ICollageEducation;

    constructor(
        protected collageEducationService: CollageEducationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.collageEducationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'collageEducationListModification',
                content: 'Deleted an collageEducation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-collage-education-delete-popup',
    template: ''
})
export class CollageEducationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ collageEducation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CollageEducationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.collageEducation = collageEducation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/collage-education', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/collage-education', { outlets: { popup: null } }]);
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
