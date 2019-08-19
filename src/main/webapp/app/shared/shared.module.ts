import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, JhiLoginModalComponent, ProjectSharedCommonModule, ProjectSharedLibsModule } from './';
import { CardModule, SplitButtonModule, TreeTableModule } from 'primeng/primeng';
import { ProjectCardComponent } from 'app/shared/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MatTableModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ActionCardComponent } from 'app/shared/action-card/action-card.component';
import { JalaliDatePipe, JalaliDateTimePipe } from 'app/shared/jalali-pipe/jalali.pipe';
import { GanttModule } from 'app/shared/gantt/gant-chart';

@NgModule({
    imports: [
        ProjectSharedLibsModule,
        ProjectSharedCommonModule,
        TreeTableModule,
        CardModule,
        RouterModule,
        SplitButtonModule,
        TableModule,
        MatTableModule,
        MatInputModule,
        GanttModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        ProjectCardComponent,
        ActionCardComponent,
        JalaliDatePipe,
        JalaliDateTimePipe
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent, ProjectCardComponent, ActionCardComponent],
    exports: [
        ProjectSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        TreeTableModule,
        CardModule,
        ProjectCardComponent,
        SplitButtonModule,
        TableModule,
        MatTableModule,
        MatInputModule,
        ActionCardComponent,
        JalaliDatePipe,
        JalaliDateTimePipe,
        GanttModule
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
