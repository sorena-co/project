import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-group',
                loadChildren: './user-group/user-group.module#ProjectUserGroupModule'
            },
            {
                path: 'project',
                loadChildren: './project/project.module#ProjectProjectModule'
            },
            {
                path: 'project/:projectId/financial-project',
                loadChildren: './financial-project/financial-project.module#ProjectFinancialProjectModule'
            },
            {
                path: 'project/:projectId/phase',
                loadChildren: './phase/phase.module#ProjectPhaseModule'
            },
            {
                path: 'project/:projectId/phase/:phaseId/action',
                loadChildren: './action/action.module#ProjectActionModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectEntityModule {}
