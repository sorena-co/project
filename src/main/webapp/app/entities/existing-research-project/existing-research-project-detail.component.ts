import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExistingResearchProject } from 'app/shared/model/existing-research-project.model';

@Component({
    selector: 'jhi-existing-research-project-detail',
    templateUrl: './existing-research-project-detail.component.html'
})
export class ExistingResearchProjectDetailComponent implements OnInit {
    existingResearchProject: IExistingResearchProject;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ existingResearchProject }) => {
            this.existingResearchProject = existingResearchProject;
        });
    }

    previousState() {
        window.history.back();
    }
}
