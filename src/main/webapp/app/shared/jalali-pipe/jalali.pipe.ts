import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';
@Pipe({
    name: 'jalalidate'
})
export class JalaliDatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const MomentDate = moment(value, 'YYYY-MM-DD');
        return MomentDate.locale('fa').format('YYYY-MM-DD');
    }
}

@Pipe({
    name: 'jalalidatetime'
})
export class JalaliDateTimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const MomentDate = moment(value, 'YYYY/MM/DD-THH:mm');
        return MomentDate.locale('fa').format('YYYY/MM/DD-HH:mm');
    }
}
