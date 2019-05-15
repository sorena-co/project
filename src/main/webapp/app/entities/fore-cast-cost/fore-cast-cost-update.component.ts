import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IForeCastCost } from 'app/shared/model/fore-cast-cost.model';
import { ForeCastCostService } from './fore-cast-cost.service';

@Component({
    selector: 'jhi-fore-cast-cost-update',
    templateUrl: './fore-cast-cost-update.component.html'
})
export class ForeCastCostUpdateComponent implements OnInit {
    foreCastCost: IForeCastCost;
    isSaving: boolean;

    constructor(protected foreCastCostService: ForeCastCostService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ foreCastCost }) => {
            this.foreCastCost = foreCastCost;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.foreCastCost.id !== undefined) {
            this.subscribeToSaveResponse(this.foreCastCostService.update(this.foreCastCost));
        } else {
            this.subscribeToSaveResponse(this.foreCastCostService.create(this.foreCastCost));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IForeCastCost>>) {
        result.subscribe((res: HttpResponse<IForeCastCost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
