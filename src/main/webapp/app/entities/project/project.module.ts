import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    ProjectComponent,
    ProjectDeleteDialogComponent,
    ProjectDeletePopupComponent,
    ProjectDetailComponent,
    projectPopupRoute,
    projectRoute,
    ProjectUpdateComponent
} from './';
import { ProjectTitleComponent } from 'app/entities/project/project-title.component';
import { ProjectGanttComponent } from 'app/entities/project/project-gantt.component';

const ENTITY_STATES = [...projectRoute, ...projectPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProjectComponent,
        ProjectDetailComponent,
        ProjectUpdateComponent,
        ProjectDeleteDialogComponent,
        ProjectDeletePopupComponent,
        ProjectTitleComponent,
        ProjectGanttComponent
    ],
    entryComponents: [
        ProjectComponent,
        ProjectUpdateComponent,
        ProjectDeleteDialogComponent,
        ProjectDeletePopupComponent,
        ProjectTitleComponent,
        ProjectGanttComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectProjectModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
