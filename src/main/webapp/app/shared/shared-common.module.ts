import { NgModule } from '@angular/core';

import { FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, ProjectSharedLibsModule } from './';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

@NgModule({
    imports: [ProjectSharedLibsModule, DpDatePickerModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ProjectSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, DpDatePickerModule]
})
export class ProjectSharedCommonModule {}
