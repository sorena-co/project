import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, AccountService, LoginModalService } from 'app/core';
import { ProjectService } from 'app/entities/project';
import { Project } from 'app/shared/model/project.model';
import { FinancialProjectService } from 'app/entities/financial-project';
import { FinancialProjectType } from 'app/shared/model/financial-project.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    projects: Project[] = [];
    FinancialProjectType = FinancialProjectType;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private financialProjectService: FinancialProjectService
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
            this.loadProject();
        });
        this.registerAuthenticationSuccess();
    }

    loadProject() {
        this.projectService.query().subscribe(value => {
            this.projects = value.body;
            this.projects.forEach(project => {
                project.details = [];
                this.financialProjectService
                    .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.AMOUNT_CONFIRMED])
                    .subscribe(financialProject => {
                        project.amountConfirmed = financialProject.body && financialProject.body.amount ? financialProject.body.amount : 0;
                        project.details.push(`مبلغ قرارداد : ${project.amountConfirmed}`);
                    });

                this.financialProjectService.getCostOfProject(project.id).subscribe(financialProject => {
                    project.totalCost = financialProject.body ? financialProject.body : 0;
                    project.details.push(`مبلغ هزینه شده : ${project.totalCost}`);
                });
            });
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
                this.loadProject();
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
