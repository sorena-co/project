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

    constructor(protected router: Router) {}

    ngOnInit(): void {}

    openUrl() {
        this.router.navigate([this.url]);
    }
}
