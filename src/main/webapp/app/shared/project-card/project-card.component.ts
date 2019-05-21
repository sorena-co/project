import { AfterViewInit, Component, Input } from '@angular/core';
import { Project } from 'app/shared/model/project.model';

@Component({
    selector: 'jhi-project-card',
    templateUrl: './project-card.component.html'
})
export class ProjectCardComponent implements AfterViewInit {
    @Input() project: Project;

    constructor() {}

    ngAfterViewInit() {}
}
