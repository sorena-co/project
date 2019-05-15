import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMainStep } from 'app/shared/model/main-step.model';

@Component({
    selector: 'jhi-main-step-detail',
    templateUrl: './main-step-detail.component.html'
})
export class MainStepDetailComponent implements OnInit {
    mainStep: IMainStep;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mainStep }) => {
            this.mainStep = mainStep;
        });
    }

    previousState() {
        window.history.back();
    }
}
