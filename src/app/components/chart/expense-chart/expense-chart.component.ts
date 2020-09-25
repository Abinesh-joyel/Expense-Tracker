import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ExpenseCategory } from 'src/app/utils/models';
import { chartColors } from 'src/app/utils';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent {
  doughnutChartColors: any[] = [
    {
      backgroundColor: [...chartColors],
    },
  ];
  doughnutChartData: number[];
  doughnutChartLabels: string[];
  doughnutChartType = 'doughnut';
  doughnutOptions: ChartOptions = Object.assign({
    legend: {
      display: true,
      position: 'bottom',
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  });

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
    this.doughnutChartData = exp.amount;
    this.doughnutChartLabels = exp.labels;
  }
}
