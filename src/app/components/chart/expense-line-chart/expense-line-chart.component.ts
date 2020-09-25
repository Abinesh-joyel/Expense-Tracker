import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective } from 'ng2-charts';
import { getMonthName } from 'src/app/utils';
import { ExpenseCategory, Expense } from 'src/app/utils/models';

@Component({
  selector: 'app-expense-line-chart',
  templateUrl: './expense-line-chart.component.html',
  styleUrls: ['./expense-line-chart.component.scss'],
})
export class ExpenseLineChartComponent {
  lineChartData: ChartDataSets[];
  lineChartLabels: number[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: 'bottom',
    },
  };
  lineChartLegend = true;
  lineChartType = 'line';
  @Input() set expenseCategoryList(exp: { header: ExpenseCategory; body: Expense[] }) {
    this.onInit(exp);
  }
  constructor() {}

  onInit(exp: { header: ExpenseCategory; body: Expense[] }) {
    const label = getMonthName(exp.header.date);
    const expense = exp.body.reduce(
      (acc, curr, ind) => {
        acc.data[ind] = curr.amount;
        acc.chartLabels[ind] = new Date(curr.date).getDate();
        return acc;
      },
      {
        data: [],
        chartLabels: [],
      }
    );
    const { data, chartLabels } = expense;
    this.lineChartData = [{ data, label }];
    this.lineChartLabels = chartLabels;
  }
}
