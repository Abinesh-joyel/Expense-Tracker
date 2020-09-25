import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expensePercentage',
})
export class ExpensePercentagePipe implements PipeTransform {
  transform(value: number, args: number): string {
    return value.toFixed(args);
  }
}
