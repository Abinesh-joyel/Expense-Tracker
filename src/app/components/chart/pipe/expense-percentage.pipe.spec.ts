import { ExpensePercentagePipe } from './expense-percentage.pipe';

describe('ExpensePercentagePipe', () => {
  it('create an instance', () => {
    const pipe = new ExpensePercentagePipe();
    expect(pipe).toBeTruthy();
  });
});
