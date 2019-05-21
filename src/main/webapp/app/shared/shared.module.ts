import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, JhiLoginModalComponent, ProjectSharedCommonModule, ProjectSharedLibsModule } from './';
import { CardModule, SplitButtonModule, TreeTableModule } from 'primeng/primeng';
import { ProjectCardComponent } from 'app/shared/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        ProjectSharedLibsModule,
        ProjectSharedCommonModule,
        TreeTableModule,
        CardModule,
        RouterModule,
        SplitButtonModule,
        TableModule
    ],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, ProjectCardComponent],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent, ProjectCardComponent],
    exports: [
        ProjectSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        TreeTableModule,
        CardModule,
        ProjectCardComponent,
        SplitButtonModule,
        TableModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectSharedModule {
    static forRoot() {
        return {
            ngModule: ProjectSharedModule
        };
    }
}
