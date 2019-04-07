import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    FinancialProjectComponent,
    FinancialProjectDetailComponent,
    FinancialProjectUpdateComponent,
    FinancialProjectDeletePopupComponent,
    FinancialProjectDeleteDialogComponent,
    financialProjectRoute,
    financialProjectPopupRoute,
    ProjectTitleComponent
} from './';

const ENTITY_STATES = [...financialProjectRoute, ...financialProjectPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FinancialProjectComponent,
        FinancialProjectDetailComponent,
        FinancialProjectUpdateComponent,
        FinancialProjectDeleteDialogComponent,
        FinancialProjectDeletePopupComponent,
        ProjectTitleComponent
    ],
    entryComponents: [
        FinancialProjectComponent,
        FinancialProjectUpdateComponent,
        FinancialProjectDeleteDialogComponent,
        FinancialProjectDeletePopupComponent,
        ProjectTitleComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectFinancialProjectModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
