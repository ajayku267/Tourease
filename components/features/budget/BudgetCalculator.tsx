"use client";

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PlusCircle, MinusCircle, Calculator, DollarSign, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Types
interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  color: string;
  icon?: string;
  editable?: boolean;
}

interface BudgetCalculatorProps {
  initialBudget?: number;
  initialCategories?: ExpenseCategory[];
  currency?: string;
  title?: string;
  description?: string;
  className?: string;
  onBudgetChange?: (totalBudget: number, categories: ExpenseCategory[]) => void;
}

// Default categories with colors
const defaultCategories: ExpenseCategory[] = [
  { id: 'accommodation', name: 'Accommodation', amount: 500, color: '#FF6384', editable: true },
  { id: 'transportation', name: 'Transportation', amount: 300, color: '#36A2EB', editable: true },
  { id: 'food', name: 'Food & Drinks', amount: 250, color: '#FFCE56', editable: true },
  { id: 'activities', name: 'Activities', amount: 200, color: '#4BC0C0', editable: true },
  { id: 'shopping', name: 'Shopping', amount: 150, color: '#9966FF', editable: true },
  { id: 'misc', name: 'Miscellaneous', amount: 100, color: '#FF9F40', editable: true },
];

export function BudgetCalculator({
  initialBudget = 1500,
  initialCategories = defaultCategories,
  currency = '$',
  title = 'Travel Budget Calculator',
  description = 'Plan your trip expenses by category',
  className,
  onBudgetChange,
}: BudgetCalculatorProps) {
  const [totalBudget, setTotalBudget] = useState(initialBudget);
  const [categories, setCategories] = useState<ExpenseCategory[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [budgetInput, setBudgetInput] = useState(initialBudget.toString());

  // Calculate total amount from categories
  const totalExpenses = categories.reduce((sum, category) => sum + category.amount, 0);
  const remaining = totalBudget - totalExpenses;
  const remainingPercentage = (remaining / totalBudget) * 100;

  // Pie chart data preparation
  const getPieData = () => {
    const chartData = [...categories];
    
    // Add remaining budget if positive
    if (remaining > 0) {
      chartData.push({
        id: 'remaining',
        name: 'Remaining',
        amount: remaining,
        color: '#E8E8E8',
      });
    }
    
    return chartData.filter(item => item.amount > 0);
  };

  // Handle changing a category amount
  const handleCategoryAmountChange = (id: string, newAmount: number) => {
    const updated = categories.map(category => 
      category.id === id ? { ...category, amount: newAmount } : category
    );
    setCategories(updated);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    // Generate a random color
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    const newCategory: ExpenseCategory = {
      id: `custom-${Date.now()}`,
      name: newCategoryName,
      amount: 0,
      color: randomColor,
      editable: true,
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  // Handle removing a category
  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString()}`;
  };

  // Update budget when input changes
  const handleBudgetChange = () => {
    const newBudget = parseInt(budgetInput);
    if (!isNaN(newBudget) && newBudget >= 0) {
      setTotalBudget(newBudget);
    }
  };

  // Notify parent component about changes
  useEffect(() => {
    if (onBudgetChange) {
      onBudgetChange(totalBudget, categories);
    }
  }, [totalBudget, categories, onBudgetChange]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex-1">
            <Label htmlFor="budget">Total Budget</Label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="budget"
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                onBlur={handleBudgetChange}
                min="0"
                step="100"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex-1">
            <Label>Summary</Label>
            <div className="flex items-center justify-between mt-1">
              <Badge variant={remaining >= 0 ? "outline" : "destructive"}>
                {remaining >= 0 ? 'Remaining' : 'Over budget'}: {formatCurrency(Math.abs(remaining))}
              </Badge>
              <span className="text-sm font-medium">
                {Math.abs(remainingPercentage).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-64 md:h-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getPieData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {getPieData().map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)} 
                  labelFormatter={(index) => getPieData()[index].name}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Categories */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }} 
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                  </div>
                  <div className="text-sm font-medium">{formatCurrency(category.amount)}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Slider
                    id={`category-${category.id}`}
                    value={[category.amount]}
                    min={0}
                    max={totalBudget}
                    step={10}
                    onValueChange={(values) => handleCategoryAmountChange(category.id, values[0])}
                  />
                  
                  {category.editable && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCategory(category.id)}
                      className="h-7 w-7"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Add new category */}
            {isAddingCategory ? (
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleAddCategory}>Add</Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setIsAddingCategory(false);
                      setNewCategoryName('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => setIsAddingCategory(true)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            )}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Budget breakdown */}
        <div>
          <h4 className="font-medium mb-4">Budget Breakdown</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Total Budget:</span>
              <span className="font-medium">{formatCurrency(totalBudget)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Total Allocated:</span>
              <span className="font-medium">{formatCurrency(totalExpenses)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-medium">
              <span>Remaining:</span>
              <span className={remaining < 0 ? "text-red-500" : "text-green-500"}>
                {formatCurrency(remaining)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCategories(initialCategories)}>
          <Calculator className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </CardFooter>
    </Card>
  );
} 