import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Boolean',
    pure: true,
})
export class BooleanPipe implements PipeTransform {
    constructor() { }

    public transform(value: boolean | null): string | null {
        if (value === null) {
            return null;
        }
        return value ? String.fromCharCode(10003) : String.fromCharCode(10005);
    }
}
