import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagearr'
})

export class PagearrPipe implements PipeTransform {

  transform(value: number, args?: any): number[] {
	const pageArray = Array(value);

	for (let i = 0; i < value; i++){
		pageArray[i] = i + 1;

	}

    return pageArray;
  }

}
