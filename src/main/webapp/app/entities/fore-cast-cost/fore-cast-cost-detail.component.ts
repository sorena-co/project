import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';

@Component({
    selector: 'jhi-fore-cast-cost-detail',
    templateUrl: './fore-cast-cost-detail.component.html'
})
export class ForeCastCostDetailComponent implements OnInit {
    foreCastCost: IForeCastCost;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ foreCastCost }) => {
            this.foreCastCost = foreCastCost;
        });
    }

    previousState() {
        window.history.back();
    }
}
