import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    OrganizationPartnerComponent,
    OrganizationPartnerDetailComponent,
    OrganizationPartnerUpdateComponent,
    OrganizationPartnerDeletePopupComponent,
    OrganizationPartnerDeleteDialogComponent,
    organizationPartnerRoute,
    organizationPartnerPopupRoute
} from './';

const ENTITY_STATES = [...organizationPartnerRoute, ...organizationPartnerPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrganizationPartnerComponent,
        OrganizationPartnerDetailComponent,
        OrganizationPartnerUpdateComponent,
        OrganizationPartnerDeleteDialogComponent,
        OrganizationPartnerDeletePopupComponent
    ],
    entryComponents: [
        OrganizationPartnerComponent,
        OrganizationPartnerUpdateComponent,
        OrganizationPartnerDeleteDialogComponent,
        OrganizationPartnerDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectOrganizationPartnerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
