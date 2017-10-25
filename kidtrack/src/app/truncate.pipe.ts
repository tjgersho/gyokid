import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

   transform(value: string, args: string[] = []) : string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 4;
    let prefix = args.length > 1 ? args[1] : 'xxx..';
	console.log('transform limit');
	console.log(limit);

    return value.length > limit ? prefix + value.substr(value.length-limit) : value;
  }
}
