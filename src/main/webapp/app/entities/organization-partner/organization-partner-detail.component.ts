import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganizationPartner } from 'app/shared/model/organization-partner.model';

@Component({
    selector: 'jhi-organization-partner-detail',
    templateUrl: './organization-partner-detail.component.html'
})
export class OrganizationPartnerDetailComponent implements OnInit {
    organizationPartner: IOrganizationPartner;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organizationPartner }) => {
            this.organizationPartner = organizationPartner;
        });
    }

    previousState() {
        window.history.back();
    }
}
