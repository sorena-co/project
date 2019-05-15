import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResearcherHistory } from 'app/shared/model/researcher-history.model';

@Component({
    selector: 'jhi-researcher-history-detail',
    templateUrl: './researcher-history-detail.component.html'
})
export class ResearcherHistoryDetailComponent implements OnInit {
    researcherHistory: IResearcherHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ researcherHistory }) => {
            this.researcherHistory = researcherHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
