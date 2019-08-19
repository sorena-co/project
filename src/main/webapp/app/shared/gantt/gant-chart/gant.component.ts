import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { JSGantt } from './jsgantt';

@Component({
    selector: 'app-gantt-chart',
    template: `
        <div [id]="id" class="gantt" #ganttEditorContainer></div>
    `,
    styleUrls: ['./gantt.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GanttComponent implements OnInit, OnDestroy {
    @ViewChild('ganttEditorContainer') ganttEditorContainer: ElementRef;
    formats = ['Hour', 'Day', 'Week', 'Month', 'Quarter'];
    private editor: any;
    private _data;
    public id = 'anggantteditor' + Math.floor(Math.random() * 1000000);
    public optionsChanged = false;

    @Input() format = 'week';
    @Input('data')
    set data(value: Object) {
        this._data = value;
        if (this.editor) {
            this.destroy();
            this.ngOnInit();
        }
    }

    constructor() {}

    ngOnInit() {
        const g = (this.editor = new (<any>JSGantt).GanttChart(this.ganttEditorContainer.nativeElement, this.format));

        if (g.getDivId() != null) {
            g.setOptions({
                vCaptionType: 'Complete', // Set to Show Caption : None,Caption,Resource,Duration,Complete,
                vQuarterColWidth: 36,
                vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
                vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the 'Major' header of the 'Day' view
                vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the 'Minor' header of the 'Week' view
                vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
                vShowEndWeekDate: 0, // Show/Hide the date for the last day of the week in header for
                vUseSingleCell: 10000,
                // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
                vFormatArr: this.formats.slice(1)
            });
            if (this._data && this._data.forEach) {
                this._data.forEach(row => {
                    row.pGantt = g;
                    g.AddTaskItemObject(row);
                });
            }

            g.Draw();
        }
    }

    ngOnDestroy(): void {}

    public destroy() {
        // this.editor.destroy();
    }
}
