import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-phase-finish-modal',
    templateUrl: './phase-finish-modal.component.html'
})
export class PhaseFinishModalComponent {
    reasonOfDelay: string = '';

    constructor(public activeModal: NgbActiveModal) {}
}
