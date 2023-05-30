export class Expense {
  constructor(
    public id: any,
    public date: string,
    public category: string,
    public currency: string,
    public amount: number | null,
    public userId: string | undefined
  ) {}

  public getExpense(): Expense {
    return this;
  }

  public setExpense(expense: Expense): void {
    this.id = expense.id ?? null;
    this.date = expense.date;
    this.category = expense.category;
    this.amount = expense.amount;
    this.currency = expense.currency;
    this.userId = expense.userId;
  }
}
