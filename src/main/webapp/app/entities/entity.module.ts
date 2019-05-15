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
            },
            {
                path: 'document',
                loadChildren: './document/document.module#ProjectDocumentModule'
            },
            {
                path: 'main-step',
                loadChildren: './main-step/main-step.module#ProjectMainStepModule'
            },
            {
                path: 'collage-education',
                loadChildren: './collage-education/collage-education.module#ProjectCollageEducationModule'
            },
            {
                path: 'researcher-history',
                loadChildren: './researcher-history/researcher-history.module#ProjectResearcherHistoryModule'
            },
            {
                path: 'existing-research-project',
                loadChildren: './existing-research-project/existing-research-project.module#ProjectExistingResearchProjectModule'
            },
            {
                path: 'organization-partner',
                loadChildren: './organization-partner/organization-partner.module#ProjectOrganizationPartnerModule'
            },
            {
                path: 'cost-summary',
                loadChildren: './cost-summary/cost-summary.module#ProjectCostSummaryModule'
            },
            {
                path: 'fore-cast-cost',
                loadChildren: './fore-cast-cost/fore-cast-cost.module#ProjectForeCastCostModule'
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
