import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    CostSummaryComponent,
    CostSummaryDetailComponent,
    CostSummaryUpdateComponent,
    CostSummaryDeletePopupComponent,
    CostSummaryDeleteDialogComponent,
    costSummaryRoute,
    costSummaryPopupRoute
} from './';

const ENTITY_STATES = [...costSummaryRoute, ...costSummaryPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CostSummaryComponent,
        CostSummaryDetailComponent,
        CostSummaryUpdateComponent,
        CostSummaryDeleteDialogComponent,
        CostSummaryDeletePopupComponent
    ],
    entryComponents: [CostSummaryComponent, CostSummaryUpdateComponent, CostSummaryDeleteDialogComponent, CostSummaryDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectCostSummaryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
