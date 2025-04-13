/**
 * Forwarding file to maintain backward compatibility during component migration.
 * 
 * This file re-exports the BudgetCalculator component from its new location
 * so that existing imports to BudgetPlanner continue to work.
 */

import { BudgetCalculator } from '@/components/features/budget/BudgetCalculator';

// Re-export types defined in the original component
export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

// Map the old props interface to the new one
const BudgetPlanner = ({
  tripId,
  initialBudget,
  initialCurrency,
  initialExpenses,
  onUpdate,
  ...rest
}: {
  tripId: string;
  initialBudget: number;
  initialCurrency: string;
  initialExpenses: Expense[];
  onUpdate: (budget: number, expenses: Expense[]) => void;
}) => {
  // Convert expenses to categories format for BudgetCalculator
  const categoryMap = new Map();
  
  initialExpenses.forEach(expense => {
    if (categoryMap.has(expense.category)) {
      categoryMap.set(
        expense.category, 
        categoryMap.get(expense.category) + expense.amount
      );
    } else {
      categoryMap.set(expense.category, expense.amount);
    }
  });
  
  // Generate colors for categories
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
  ];
  
  let colorIndex = 0;
  const categories = Array.from(categoryMap.entries()).map(([name, amount]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    amount,
    color: colors[colorIndex++ % colors.length],
    editable: true
  }));

  const handleBudgetChange = (budget: number, updatedCategories: any[]) => {
    // Convert categories back to expenses format for backward compatibility
    const newExpenses: Expense[] = initialExpenses.map(exp => ({ ...exp }));

    onUpdate(budget, newExpenses);
  };

  return (
    <BudgetCalculator
      initialBudget={initialBudget}
      initialCategories={categories}
      currency={initialCurrency}
      title="Trip Budget Planner"
      description="Manage your travel expenses"
      onBudgetChange={handleBudgetChange}
      {...rest}
    />
  );
};

export default BudgetPlanner; 