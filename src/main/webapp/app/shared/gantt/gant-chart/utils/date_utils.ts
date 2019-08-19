/**
 * DATES
 */
import * as moment from 'jalali-moment';

export const getMinDate = function(pList, pFormat, pMinDate) {
    const vDate = new Date();

    if (pList.length <= 0) {
        return pMinDate || vDate;
    }

    vDate.setTime((pMinDate && pMinDate.getTime()) || pList[0].getStart().getTime());

    // Parse all Task Start dates to find min
    for (let i = 0; i < pList.length; i++) {
        if (pList[i].getStart().getTime() < vDate.getTime()) {
            vDate.setTime(pList[i].getStart().getTime());
        }
    }

    // Adjust min date to specific format boundaries (first of week or first of month)
    if (pFormat === 'day') {
        vDate.setDate(vDate.getDate() - 1);
        while (vDate.getDay() % 7 !== 1) {
            vDate.setDate(vDate.getDate() - 1);
        }
    } else if (pFormat === 'week') {
        vDate.setDate(vDate.getDate() - 1);
        while (vDate.getDay() % 7 !== 1) {
            vDate.setDate(vDate.getDate() - 1);
        }
    } else if (pFormat === 'month') {
        vDate.setDate(vDate.getDate() - 15);
        while (vDate.getDate() > 1) {
            vDate.setDate(vDate.getDate() - 1);
        }
    } else if (pFormat === 'quarter') {
        vDate.setDate(vDate.getDate() - 31);
        if (vDate.getMonth() === 0 || vDate.getMonth() === 1 || vDate.getMonth() === 2) {
            vDate.setFullYear(vDate.getFullYear(), 0, 1);
        } else if (vDate.getMonth() === 3 || vDate.getMonth() === 4 || vDate.getMonth() === 5) {
            vDate.setFullYear(vDate.getFullYear(), 3, 1);
        } else if (vDate.getMonth() === 6 || vDate.getMonth() === 7 || vDate.getMonth() === 8) {
            vDate.setFullYear(vDate.getFullYear(), 6, 1);
        } else if (vDate.getMonth() === 9 || vDate.getMonth() === 10 || vDate.getMonth() === 11) {
            vDate.setFullYear(vDate.getFullYear(), 9, 1);
        }
    } else if (pFormat === 'hour') {
        vDate.setHours(vDate.getHours() - 1);
        while (vDate.getHours() % 6 !== 0) {
            vDate.setHours(vDate.getHours() - 1);
        }
    }

    if (pFormat === 'hour') {
        vDate.setMinutes(0, 0);
    } else {
        vDate.setHours(0, 0, 0);
    }
    return vDate;
};

export const getMaxDate = function(pList, pFormat, pMaxDate) {
    const vDate = new Date();

    if (pList.length <= 0) {
        return pMaxDate || vDate;
    }

    vDate.setTime((pMaxDate && pMaxDate.getTime()) || pList[0].getEnd().getTime());

    // Parse all Task End dates to find max
    for (let i = 0; i < pList.length; i++) {
        if (pList[i].getEnd().getTime() > vDate.getTime()) {
            vDate.setTime(pList[i].getEnd().getTime());
        }
    }

    // Adjust max date to specific format boundaries (end of week or end of month)
    if (pFormat === 'day') {
        vDate.setDate(vDate.getDate() + 1);

        while (vDate.getDay() % 7 !== 0) {
            vDate.setDate(vDate.getDate() + 1);
        }
    } else if (pFormat === 'week') {
        // For weeks, what is the last logical boundary?
        vDate.setDate(vDate.getDate() + 1);

        while (vDate.getDay() % 7 !== 0) {
            vDate.setDate(vDate.getDate() + 1);
        }
    } else if (pFormat === 'month') {
        // Set to last day of current Month
        while (vDate.getDate() > 1) {
            vDate.setDate(vDate.getDate() + 1);
        }
        vDate.setDate(vDate.getDate() - 1);
    } else if (pFormat === 'quarter') {
        // Set to last day of current Quarter
        if (vDate.getMonth() === 0 || vDate.getMonth() === 1 || vDate.getMonth() === 2) {
            vDate.setFullYear(vDate.getFullYear(), 2, 31);
        } else if (vDate.getMonth() === 3 || vDate.getMonth() === 4 || vDate.getMonth() === 5) {
            vDate.setFullYear(vDate.getFullYear(), 5, 30);
        } else if (vDate.getMonth() === 6 || vDate.getMonth() === 7 || vDate.getMonth() === 8) {
            vDate.setFullYear(vDate.getFullYear(), 8, 30);
        } else if (vDate.getMonth() === 9 || vDate.getMonth() === 10 || vDate.getMonth() === 11) {
            vDate.setFullYear(vDate.getFullYear(), 11, 31);
        }
    } else if (pFormat === 'hour') {
        if (vDate.getHours() === 0) {
            vDate.setDate(vDate.getDate() + 1);
        }
        vDate.setHours(vDate.getHours() + 1);

        while (vDate.getHours() % 6 !== 5) {
            vDate.setHours(vDate.getHours() + 1);
        }
    }
    return vDate;
};

export const coerceDate = function(date) {
    if (date instanceof Date) {
        return date;
    } else {
        const temp = new Date(date);
        if (temp instanceof Date && !isNaN(temp.valueOf())) {
            return temp;
        }
    }
};

export const parseDateStr = function(pDateStr, pFormatStr) {
    let vDate = new Date();
    const vDateParts = pDateStr.split(/[^0-9]/);
    if (pDateStr.length >= 10 && vDateParts.length >= 3) {
        while (vDateParts.length < 5) {
            vDateParts.push(0);
        }

        switch (pFormatStr) {
            case 'mm/dd/yyyy':
                vDate = new Date(vDateParts[2], vDateParts[0] - 1, vDateParts[1], vDateParts[3], vDateParts[4]);
                break;
            case 'dd/mm/yyyy':
                vDate = new Date(vDateParts[2], vDateParts[1] - 1, vDateParts[0], vDateParts[3], vDateParts[4]);
                break;
            case 'yyyy-mm-dd':
                vDate = new Date(vDateParts[0], vDateParts[1] - 1, vDateParts[2], vDateParts[3], vDateParts[4]);
                break;
        }
    }
    return vDate;
};

export const formatDateStr = function(pDate, pDateFormatArr, pL) {
    let vDateStr = '';
    const MomentDate = moment(pDate);
    console.log('date - >' + MomentDate.locale('fa').format('YYYY/MM/DD'));
    const vYear2Str = MomentDate.locale('fa').format('YYYY');
    const vMonthStr = MomentDate.locale('fa').jMonth() + 1 + '';
    const vMonthArr = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const vDayArr = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
    const vMthArr = ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'];
    const vDyArr = ['شنب', 'یک', 'دو', 'سه', 'چها', 'پنج', 'ج'];

    for (let i = 0; i < pDateFormatArr.length; i++) {
        switch (pDateFormatArr[i]) {
            case 'dd':

            case 'd':
                vDateStr += MomentDate.locale('fa').format('DD');
                break;
            case 'day':
                vDateStr += vDayArr[MomentDate.locale('fa').weekday()];
                break;
            case 'DAY':
                vDateStr += vDayArr[MomentDate.locale('fa').weekday()];
                break;
            case 'mm':
                if (parseInt(vMonthStr, 10) < 10) {
                    vDateStr += '0';
                } // now fall through
            case 'm':
                vDateStr += vMonthStr;
                break;
            case 'mon':
                vDateStr += vMonthArr[MomentDate.locale('fa').jMonth()];
                break;
            case 'month':
                vDateStr += vMonthArr[MomentDate.locale('fa').jMonth()];
                break;
            case 'yyyy':
                vDateStr += MomentDate.locale('fa').format('YYYY');
                break;
            case 'yy':
                vDateStr += vYear2Str;
                break;
            case 'qq':
                vDateStr += pL['qtr']; // now fall through
            case 'q':
                vDateStr += Math.floor(MomentDate.locale('fa').jMonth() / 3) + 1;
                break;
            case 'hh':
                if ((pDate.getHours() % 12 === 0 ? 12 : pDate.getHours() % 12) < 10) {
                    vDateStr += '0';
                } // now fall through
            case 'h':
                vDateStr += pDate.getHours() % 12 === 0 ? 12 : pDate.getHours() % 12;
                break;
            case 'HH':
                if (pDate.getHours() < 10) {
                    vDateStr += '0';
                } // now fall through
            case 'H':
                vDateStr += pDate.getHours();
                break;
            case 'MI':
                if (pDate.getMinutes() < 10) {
                    vDateStr += '0';
                } // now fall through
            case 'mi':
                vDateStr += pDate.getMinutes();
                break;
            case 'pm':
                vDateStr += pDate.getHours() < 12 ? 'am' : 'pm';
                break;
            case 'PM':
                vDateStr += pDate.getHours() < 12 ? 'AM' : 'PM';
                break;
            case 'ww':
                if (MomentDate.locale('fa').isoWeek() < 10) {
                    vDateStr += '0';
                } // now fall through
            case 'w':
                vDateStr += MomentDate.locale('fa').isoWeek();
                break;
            case 'week':
                let vWeekNum = MomentDate.locale('fa').isoWeek();
                const vYear = MomentDate.locale('fa').year();
                const vDayOfWeek = MomentDate.locale('fa').weekday() === 0 ? 1 : MomentDate.locale('fa').weekday();

                if (vWeekNum < 10) {
                    vWeekNum = parseInt('0' + vWeekNum, 10);
                }

                vDateStr += vYear + '-W' + vWeekNum + '-' + vDayOfWeek;

                break;
            default:
                if (pL[pDateFormatArr[i].toLowerCase()]) {
                    vDateStr += pL[pDateFormatArr[i].toLowerCase()];
                } else {
                    vDateStr += pDateFormatArr[i];
                }
                break;
        }
    }
    return vDateStr;
};

export const parseDateFormatStr = function(pFormatStr) {
    let vComponantStr = '';
    let vCurrChar = '';
    const vSeparators = new RegExp('[/\\ -.,\'":]');
    const vDateFormatArray = new Array();

    for (let i = 0; i < pFormatStr.length; i++) {
        vCurrChar = pFormatStr.charAt(i);
        if (vCurrChar.match(vSeparators) || i + 1 === pFormatStr.length) {
            if (i + 1 === pFormatStr.length && !vCurrChar.match(vSeparators)) {
                vComponantStr += vCurrChar;
            }
            vDateFormatArray.push(vComponantStr);
            if (vCurrChar.match(vSeparators)) {
                vDateFormatArray.push(vCurrChar);
            }
            vComponantStr = '';
        } else {
            vComponantStr += vCurrChar;
        }
    }
    return vDateFormatArray;
};

export const getIsoWeek = function(pDate) {
    // We have to compare against the monday of the first week of the year containing 04 jan *not* 01/01
    // 60*60*24*1000=86400000
    const dayMiliseconds = 86400000;
    const keyDay = new Date(pDate.getFullYear(), 0, 4, 0, 0, 0);
    const keyDayOfWeek = keyDay.getDay() === 0 ? 6 : keyDay.getDay() - 1; // define monday as 0
    const firstMondayYearTime = keyDay.getTime() - keyDayOfWeek * dayMiliseconds;
    const thisDate = new Date(pDate.getFullYear(), pDate.getMonth(), pDate.getDate(), 0, 0, 0); // This at 00:00:00
    const thisTime = thisDate.getTime();
    const daysFromFirstMonday = Math.round((thisTime - firstMondayYearTime) / dayMiliseconds);
    const lastWeek = 99;
    let thisWeek = 99;

    const firstMondayYear = new Date(firstMondayYearTime);

    thisWeek = Math.ceil((daysFromFirstMonday + 1) / 7);

    if (thisWeek <= 0) {
        thisWeek = getIsoWeek(new Date(pDate.getFullYear() - 1, 11, 31, 0, 0, 0));
    } else if (
        thisWeek === 53 &&
        new Date(pDate.getFullYear(), 0, 1, 0, 0, 0).getDay() !== 4 &&
        new Date(pDate.getFullYear(), 11, 31, 0, 0, 0).getDay() !== 4
    ) {
        thisWeek = 1;
    }
    return thisWeek;
};
