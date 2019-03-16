import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from './user-group.service';

@Component({
    selector: 'jhi-user-group-update',
    templateUrl: './user-group-update.component.html'
})
export class UserGroupUpdateComponent implements OnInit {
    userGroup: IUserGroup;
    isSaving: boolean;

    constructor(protected userGroupService: UserGroupService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userGroup }) => {
            this.userGroup = userGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.userGroupService.update(this.userGroup));
        } else {
            this.subscribeToSaveResponse(this.userGroupService.create(this.userGroup));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserGroup>>) {
        result.subscribe((res: HttpResponse<IUserGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
