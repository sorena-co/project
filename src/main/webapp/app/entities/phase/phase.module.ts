import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    PhaseComponent,
    PhaseDeleteDialogComponent,
    PhaseDeletePopupComponent,
    PhaseDetailComponent,
    PhaseFinishModalComponent,
    phasePopupRoute,
    phaseRoute,
    PhaseUpdateComponent
} from './';
import { TreeTableModule } from 'primeng/primeng';

const ENTITY_STATES = [...phaseRoute, ...phasePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PhaseComponent,
        PhaseDetailComponent,
        PhaseUpdateComponent,
        PhaseDeleteDialogComponent,
        PhaseDeletePopupComponent,
        PhaseFinishModalComponent
    ],
    entryComponents: [
        PhaseComponent,
        PhaseUpdateComponent,
        PhaseDeleteDialogComponent,
        PhaseDeletePopupComponent,
        PhaseFinishModalComponent
    ],
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
