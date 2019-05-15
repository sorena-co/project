import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';
import { OrganizationPartnerService } from './organization-partner.service';

@Component({
    selector: 'jhi-organization-partner-delete-dialog',
    templateUrl: './organization-partner-delete-dialog.component.html'
})
export class OrganizationPartnerDeleteDialogComponent {
    organizationPartner: IOrganizationPartner;

    constructor(
        protected organizationPartnerService: OrganizationPartnerService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organizationPartnerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'organizationPartnerListModification',
                content: 'Deleted an organizationPartner'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organization-partner-delete-popup',
    template: ''
})
export class OrganizationPartnerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organizationPartner }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrganizationPartnerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.organizationPartner = organizationPartner;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/organization-partner', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/organization-partner', { outlets: { popup: null } }]);
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
