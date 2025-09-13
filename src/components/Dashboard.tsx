import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseList } from "./ExpenseList";
import { BudgetOverview } from "./BudgetOverview";
import { SpendingChart } from "./SpendingChart";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Textbooks",
      amount: 250,
      category: "education",
      date: "2024-09-10",
      type: "expense"
    },
    {
      id: "2", 
      description: "Lunch",
      amount: 12.50,
      category: "food",
      date: "2024-09-11",
      type: "expense"
    },
    {
      id: "3",
      description: "Part-time job",
      amount: 320,
      category: "income",
      date: "2024-09-08",
      type: "income"
    }
  ]);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Finance Manager</h1>
          <p className="text-muted-foreground">Track your spending, manage your budget, achieve your goals</p>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Current available balance
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                This month's income
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                This month's spending
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SpendingChart transactions={transactions} />
          <BudgetOverview expenses={totalExpenses} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button 
                onClick={() => setShowExpenseForm(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
            <ExpenseList transactions={transactions} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-muted-foreground/30 hover:border-primary/50">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Set Savings Goal</h3>
                    <p className="text-sm text-muted-foreground">Plan for your future expenses</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-muted-foreground/30 hover:border-secondary/50">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  <div>
                    <h3 className="font-medium">View Analytics</h3>
                    <p className="text-sm text-muted-foreground">See detailed spending patterns</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {showExpenseForm && (
        <ExpenseForm
          onClose={() => setShowExpenseForm(false)}
          onSubmit={addTransaction}
        />
      )}
    </div>
  );
};

export default Dashboard;