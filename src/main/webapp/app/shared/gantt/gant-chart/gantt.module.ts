import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { GanttComponent } from './gant.component';
import { EChartsComponent } from 'app/shared/gantt/echarts/echarts.component';

@NgModule({
    imports: [CommonModule, NgxEchartsModule],
    declarations: [GanttComponent, EChartsComponent],
    exports: [GanttComponent, EChartsComponent]
})
export class GanttModule {}
