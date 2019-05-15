import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    MainStepComponent,
    MainStepDetailComponent,
    MainStepUpdateComponent,
    MainStepDeletePopupComponent,
    MainStepDeleteDialogComponent,
    mainStepRoute,
    mainStepPopupRoute
} from './';

const ENTITY_STATES = [...mainStepRoute, ...mainStepPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MainStepComponent,
        MainStepDetailComponent,
        MainStepUpdateComponent,
        MainStepDeleteDialogComponent,
        MainStepDeletePopupComponent
    ],
    entryComponents: [MainStepComponent, MainStepUpdateComponent, MainStepDeleteDialogComponent, MainStepDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectMainStepModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
