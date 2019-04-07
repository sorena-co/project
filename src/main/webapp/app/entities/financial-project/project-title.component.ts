import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-project-title',
    templateUrl: './project-title.component.html'
})
export class ProjectTitleComponent implements OnInit {
    @Input() projectId: number;
    project: Project = new Project();

    constructor(protected projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.find(this.projectId).subscribe(value => {
            this.project = value.body;
            if (this.project.level !== 0) {
                this.projectService.find(this.project.parentProjectId).subscribe(value1 => {
                    this.project.code = value1.body.code;
                });
            }
        });
    }
}
