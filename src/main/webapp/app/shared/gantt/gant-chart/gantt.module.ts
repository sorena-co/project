import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { GanttComponent } from './gant.component';

@NgModule({
    imports: [CommonModule, NgxEchartsModule],
    declarations: [GanttComponent]
})
export class GanttModule {}
