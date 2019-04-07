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
        });
        this.projectService.query().subscribe(value => {
            this.projects = value.body;
            this.projects.forEach(project => {
                this.financialProjectService
                    .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.AMOUNT_CONFIRMED])
                    .subscribe(financialProject => {
                        project.amountConfirmed = financialProject.body.amount;
                        if (!project.amountConfirmed) {
                            project.amountConfirmed = 0;
                        }
                    });

                this.financialProjectService.getCostOfProject(project.id).subscribe(financialProject => {
                    project.totalCost = financialProject.body;
                    if (!project.totalCost) {
                        project.totalCost = 0;
                    }
                });
            });
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
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
