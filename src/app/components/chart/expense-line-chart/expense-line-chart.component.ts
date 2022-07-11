import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { getMonthName } from 'src/app/utils';
import { ExpenseCategory, Expense } from 'src/app/utils/models';

@Component({
  selector: 'app-expense-line-chart',
  templateUrl: './expense-line-chart.component.html',
  styleUrls: ['./expense-line-chart.component.scss'],
})
export class ExpenseLineChartComponent {
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      }
    }
  };
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  }
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
    this.lineChartData.datasets = [{ data, label }];
    this.lineChartData.labels = chartLabels;
  }
}
