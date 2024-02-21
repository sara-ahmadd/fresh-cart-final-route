import { Pipe, PipeTransform } from '@angular/core';

type DateTimeFormatOptions = /*unresolved*/ any;
@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(input: string): string {
    const outPutDate = new Date(input);
    const options = {
      year: 'numeric',
      month: 'long',
      hour: 'numeric',
      minuite: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    const formattedDate: string = outPutDate.toLocaleString(
      options as DateTimeFormatOptions
    );
    return formattedDate;
  }
}
