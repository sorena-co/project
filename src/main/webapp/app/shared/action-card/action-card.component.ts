import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-action-card',
    templateUrl: './action-card.component.html',
    styleUrls: ['action-card.css']
})
export class ActionCardComponent implements OnInit {
    @Input() title: string;
    @Input() url: string;
    @Input() backgroundColor: string;
    @Input() details: string[];
    @Input() projectId: string;

    constructor(protected router: Router) {}

    ngOnInit(): void {}

    openUrl() {
        this.router.navigate([this.url]);
    }
    openProjectFinancial() {
        this.router.navigate(['/project/', this.projectId, 'financial-project']);
    }

    openProjectPhase() {
        this.router.navigate(['/project/', this.projectId, 'phase']);
    }

    openDocument() {
        this.router.navigate(['/project/', this.projectId, 'document']);
    }
}
