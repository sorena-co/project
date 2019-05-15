import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    ExistingResearchProjectComponent,
    ExistingResearchProjectDetailComponent,
    ExistingResearchProjectUpdateComponent,
    ExistingResearchProjectDeletePopupComponent,
    ExistingResearchProjectDeleteDialogComponent,
    existingResearchProjectRoute,
    existingResearchProjectPopupRoute
} from './';

const ENTITY_STATES = [...existingResearchProjectRoute, ...existingResearchProjectPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExistingResearchProjectComponent,
        ExistingResearchProjectDetailComponent,
        ExistingResearchProjectUpdateComponent,
        ExistingResearchProjectDeleteDialogComponent,
        ExistingResearchProjectDeletePopupComponent
    ],
    entryComponents: [
        ExistingResearchProjectComponent,
        ExistingResearchProjectUpdateComponent,
        ExistingResearchProjectDeleteDialogComponent,
        ExistingResearchProjectDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectExistingResearchProjectModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
