import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    ResearcherHistoryComponent,
    ResearcherHistoryDetailComponent,
    ResearcherHistoryUpdateComponent,
    ResearcherHistoryDeletePopupComponent,
    ResearcherHistoryDeleteDialogComponent,
    researcherHistoryRoute,
    researcherHistoryPopupRoute
} from './';

const ENTITY_STATES = [...researcherHistoryRoute, ...researcherHistoryPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ResearcherHistoryComponent,
        ResearcherHistoryDetailComponent,
        ResearcherHistoryUpdateComponent,
        ResearcherHistoryDeleteDialogComponent,
        ResearcherHistoryDeletePopupComponent
    ],
    entryComponents: [
        ResearcherHistoryComponent,
        ResearcherHistoryUpdateComponent,
        ResearcherHistoryDeleteDialogComponent,
        ResearcherHistoryDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectResearcherHistoryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
