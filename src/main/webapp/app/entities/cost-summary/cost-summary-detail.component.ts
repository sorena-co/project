import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostSummary } from 'app/shared/model/cost-summary.model';

@Component({
    selector: 'jhi-cost-summary-detail',
    templateUrl: './cost-summary-detail.component.html'
})
export class CostSummaryDetailComponent implements OnInit {
    costSummary: ICostSummary;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ costSummary }) => {
            this.costSummary = costSummary;
        });
    }

    previousState() {
        window.history.back();
    }
}
