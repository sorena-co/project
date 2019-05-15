import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICollageEducation } from 'app/shared/model/collage-education.model';

@Component({
    selector: 'jhi-collage-education-detail',
    templateUrl: './collage-education-detail.component.html'
})
export class CollageEducationDetailComponent implements OnInit {
    collageEducation: ICollageEducation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ collageEducation }) => {
            this.collageEducation = collageEducation;
        });
    }

    previousState() {
        window.history.back();
    }
}
