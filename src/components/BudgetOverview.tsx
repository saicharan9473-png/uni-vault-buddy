import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface BudgetOverviewProps {
  expenses: number;
}

export const BudgetOverview = ({ expenses }: BudgetOverviewProps) => {
  const monthlyBudgets = [
    { category: "Education", budget: 500, spent: 250, color: "bg-blue-500" },
    { category: "Food", budget: 300, spent: expenses * 0.4 || 150, color: "bg-orange-500" },
    { category: "Entertainment", budget: 150, spent: expenses * 0.2 || 75, color: "bg-purple-500" },
    { category: "Transportation", budget: 100, spent: expenses * 0.15 || 50, color: "bg-green-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyBudgets.map((item) => {
            const percentage = (item.spent / item.budget) * 100;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80;

            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.category}</span>
                    {isOverBudget ? (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    ) : isNearLimit ? (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ${item.spent.toFixed(0)} / ${item.budget}
                  </span>
                </div>
                
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-2 ${
                    isOverBudget 
                      ? '[&>div]:bg-destructive' 
                      : isNearLimit 
                        ? '[&>div]:bg-warning' 
                        : '[&>div]:bg-success'
                  }`}
                />
                
                <div className="flex justify-between text-xs">
                  <span className={
                    isOverBudget 
                      ? 'text-destructive font-medium' 
                      : isNearLimit 
                        ? 'text-warning font-medium'
                        : 'text-muted-foreground'
                  }>
                    {percentage.toFixed(0)}% used
                  </span>
                  <span className="text-success">
                    ${Math.max(item.budget - item.spent, 0).toFixed(0)} left
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-accent/50 rounded-lg">
          <h4 className="font-medium text-sm mb-1">💡 Budget Tip</h4>
          <p className="text-xs text-muted-foreground">
            Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};