import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    PhaseComponent,
    PhaseDetailComponent,
    PhaseUpdateComponent,
    PhaseDeletePopupComponent,
    PhaseDeleteDialogComponent,
    phaseRoute,
    phasePopupRoute
} from './';

const ENTITY_STATES = [...phaseRoute, ...phasePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PhaseComponent, PhaseDetailComponent, PhaseUpdateComponent, PhaseDeleteDialogComponent, PhaseDeletePopupComponent],
    entryComponents: [PhaseComponent, PhaseUpdateComponent, PhaseDeleteDialogComponent, PhaseDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectPhaseModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
