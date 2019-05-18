import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    DocumentWordComponent,
    DocumentWordDetailComponent,
    DocumentWordUpdateComponent,
    DocumentWordDeletePopupComponent,
    DocumentWordDeleteDialogComponent,
    documentWordRoute,
    documentWordPopupRoute
} from './';

const ENTITY_STATES = [...documentWordRoute, ...documentWordPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentWordComponent,
        DocumentWordDetailComponent,
        DocumentWordUpdateComponent,
        DocumentWordDeleteDialogComponent,
        DocumentWordDeletePopupComponent
    ],
    entryComponents: [
        DocumentWordComponent,
        DocumentWordUpdateComponent,
        DocumentWordDeleteDialogComponent,
        DocumentWordDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectDocumentWordModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
