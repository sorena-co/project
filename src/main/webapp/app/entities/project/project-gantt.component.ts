import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Project } from 'app/shared/model/project.model';
import { AccountService } from 'app/core';
import { ProjectService } from './project.service';
import { ActionService } from 'app/entities/action';
import { Action } from 'app/shared/model/action.model';
import { Phase } from 'app/shared/model/phase.model';
import { PhaseService } from 'app/entities/phase';
import { DATE_FORMAT } from 'app/shared';

@Component({
    selector: 'jhi-project-gantt',
    templateUrl: './project-gantt.component.html'
})
export class ProjectGanttComponent implements OnInit, OnDestroy {
    project: Project = new Project();
    projectId: number;
    totalMonth: number;
    totalWidth: number;
    monthNames: any[];
    actions: Action[] = [];
    phases: Phase[] = [];
    _data = [];

    showGant: boolean;

    constructor(
        protected projectService: ProjectService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected actionService: ActionService,
        protected phaseService: PhaseService
    ) {
        this.projectId = Number(this.activatedRoute.snapshot.params['projectId']);
    }

    ngOnInit() {
        this.phaseService.query(this.projectId).subscribe(value => {
            this.phases = value.body;
            this.phases.forEach(phase => {
                const startDate = phase.startDate.format(DATE_FORMAT);
                const finishDate = phase.finishDate.format(DATE_FORMAT);
                let data = {
                    pID: phase.id,
                    pName: phase.title,
                    pStart: startDate,
                    pEnd: finishDate,
                    pPlanStart: '',
                    pPlanEnd: '',
                    pClass: 'ggroupblack',
                    pLink: '',
                    pMile: 0,
                    pRes: phase.cost.toString(),
                    pComp: 0,
                    pGroup: 1,
                    pParent: 0,
                    pOpen: 1,
                    pDepend: '',
                    pCaption: '',
                    pNotes: 'توضیحات',
                    category: 'نرم افزار',
                    sector: ''
                };
                this._data.push(data);
                phase.actions.forEach(action => {
                    const startDatee = action.startDate.format(DATE_FORMAT);
                    const finishDatee = action.finishDate.format(DATE_FORMAT);
                    let d = {
                        pID: action.id,
                        pName: action.title,
                        pStart: startDatee,
                        pEnd: finishDatee,
                        pClass: 'gmilestone',
                        pLink: '',
                        pMile: 1,
                        pRes: phase.cost.toString(),
                        pComp: 100,
                        pGroup: 0,
                        pParent: phase.id,
                        pOpen: 1,
                        pDepend: '',
                        pCaption: '',
                        pNotes: 'توضیحات',
                        category: 'نرم افزار',
                        sector: ''
                    };
                    this._data.push(d);
                });
            });
            console.log(JSON.stringify(this._data));
            this.showGant = true;
        });
        /* this.projectService.find(this.projectId).subscribe(value => {
             this.project = value.body;
             this.totalMonth = 0;
             const startDate = this.project.startDate != null ? this.project.startDate.format(DATE_FORMAT) : null;
             const finishDate = this.project.finishDate != null ? this.project.finishDate.format(DATE_FORMAT) : null;
             let jalaliStartYear: number =
                 startDate != null
                     ? Number(
                     jalali(startDate, DATE_FORMAT)
                         .locale('fa')
                         .format('YYYY')
                     )
                     : null;
             let jalaliStartMonth: number =
                 startDate != null
                     ? Number(
                     jalali(startDate, DATE_FORMAT)
                         .locale('fa')
                         .format('MM')
                     )
                     : null;
             const jalaliFinishYear: number =
                 finishDate != null
                     ? Number(
                     jalali(finishDate, DATE_FORMAT)
                         .locale('fa')
                         .format('YYYY')
                     )
                     : null;
             const jalaliFinishMonth: number =
                 finishDate != null
                     ? Number(
                     jalali(finishDate, DATE_FORMAT)
                         .locale('fa')
                         .format('MM')
                     )
                     : null;
             this.monthNames = [];
             while (jalaliStartYear < jalaliFinishYear || (jalaliStartYear === jalaliFinishYear && jalaliStartMonth <= jalaliFinishMonth)) {
                 switch (jalaliStartMonth) {
                     case 1: {
                         this.monthNames.push({
                             month: 'فروردین',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 2: {
                         this.monthNames.push({
                             month: 'اردیبهشت',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 3: {
                         this.monthNames.push({
                             month: 'خرداد',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 4: {
                         this.monthNames.push({
                             month: 'تیر',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 5: {
                         this.monthNames.push({
                             month: 'مرداد',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 6: {
                         this.monthNames.push({
                             month: 'شهریور',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 7: {
                         this.monthNames.push({
                             month: 'مهر',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 8: {
                         this.monthNames.push({
                             month: 'آبان',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 9: {
                         this.monthNames.push({
                             month: 'آذر',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 10: {
                         this.monthNames.push({
                             month: 'دی',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 11: {
                         this.monthNames.push({
                             month: 'بهمن',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliFinishYear + 1;
                         }
                         break;
                     }
                     case 12: {
                         this.monthNames.push({
                             month: 'اسفند',
                             year: jalaliStartYear
                         });
                         this.totalMonth += 1;
                         jalaliStartMonth = jalaliStartMonth + 1;
                         if (jalaliStartMonth > 12) {
                             jalaliStartMonth = 1;
                             jalaliStartYear = jalaliStartYear + 1;
                         }
                         break;
                     }
                 }
             }
             this.actionService.queryByProjectId(this.projectId).subscribe(value1 => {
                 this.actions = value1.body;
                 this.actions.forEach(action => {
                     this.totalWidth = this.totalMonth * 150 + 150;
                     const baseWidth = this.totalWidth / 365;

                     action.beforeWidth = 0;
                     const durationFromProject = jalali.duration(action.startDate.diff(this.project.startDate));
                     let dayDurationFromProject = durationFromProject.asDays();
                     while (dayDurationFromProject >= 30) {
                         dayDurationFromProject -= 30;
                         action.beforeWidth += 150;
                     }
                     if (dayDurationFromProject > 5) {
                         action.beforeWidth += 150 * (dayDurationFromProject / 30);
                     }
                     // action.beforeWidth = baseWidth * dayDurationFromProject;
                     action.width = 0;
                     const duration = jalali.duration(action.finishDate.diff(action.startDate));
                     let dayDuration = duration.asDays();
                     while (dayDuration >= 30) {
                         dayDuration -= 30;
                         action.width += 150;
                     }
                     if (dayDuration > 5) {
                         action.width += 150 * (dayDuration / 30);
                     }
                     // action.width = baseWidth * dayDuration;

                     const startDate = this.project.startDate != null ? this.project.startDate.format(DATE_FORMAT) : null;
                     const finishDate = this.project.finishDate != null ? this.project.finishDate.format(DATE_FORMAT) : null;
                     const jalaliStartYear: number =
                         startDate != null
                             ? Number(
                             jalali(startDate, DATE_FORMAT)
                                 .locale('fa')
                                 .format('YYYY')
                             )
                             : null;
                     const jalaliStartMonth: number =
                         startDate != null
                             ? Number(
                             jalali(startDate, DATE_FORMAT)
                                 .locale('fa')
                                 .format('MM')
                             )
                             : null;
                     const jalaliFinishYear: number =
                         finishDate != null
                             ? Number(
                             jalali(finishDate, DATE_FORMAT)
                                 .locale('fa')
                                 .format('YYYY')
                             )
                             : null;
                     const jalaliFinishMonth: number =
                         finishDate != null
                             ? Number(
                             jalali(finishDate, DATE_FORMAT)
                                 .locale('fa')
                                 .format('MM')
                             )
                             : null;
                 });
             });
         });*/
    }

    ngOnDestroy(): void {}
}
