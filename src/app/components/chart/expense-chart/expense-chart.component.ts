import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ExpenseCategory } from 'src/app/utils/models';
import { chartColors } from 'src/app/utils';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent {
  pieChartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    responsive: false,
    maintainAspectRatio: false,
  };
  pieChartLabels = [];
  pieChartDatasets = [];
  pieChartLegend = true;
  chartType = 'pie';

  @Input() set expenseCategory(expCat: ExpenseCategory[]) {
    this.onInit(expCat);
  }
  constructor() {}

  onInit(expCat: ExpenseCategory[]) {
    const exp = expCat.reduce(
      (acc, curr, ind) => {
        acc.amount[ind] = curr.amount;
        acc.labels[ind] = curr.name;
        return acc;
      },
      { amount: [], labels: [] }
    );
    console.log('exp', exp);
    this.pieChartDatasets = [{ data: exp.amount }];
    this.pieChartLabels = exp.labels;
  }
}
