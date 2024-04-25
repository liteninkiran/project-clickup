import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'AutoFormatMs',
    pure: true,
})
export class AutoFormatMsPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            let seconds = (value / 1000);
            let minutes = (value / (1000 * 60));
            let hours = (value / (1000 * 60 * 60));
            let days = (value / (1000 * 60 * 60 * 24));
            if (seconds < 60) return seconds + ' seconds';
            else if (minutes < 60) return minutes + ' minutes';
            else if (hours < 24) return hours + ' hours';
            else return days + ' days';
        }
    }
}
