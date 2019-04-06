import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFinancialProject } from 'app/shared/model/financial-project.model';

@Component({
    selector: 'jhi-financial-project-detail',
    templateUrl: './financial-project-detail.component.html'
})
export class FinancialProjectDetailComponent implements OnInit {
    financialProject: IFinancialProject;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ financialProject }) => {
            this.financialProject = financialProject;
        });
    }

    previousState() {
        window.history.back();
    }
}
