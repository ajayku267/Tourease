"use client";

import React, { useState } from 'react';
import { Banknote, PlusCircle, Trash2, Edit2, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { format } from 'date-fns';
import { safeDateString } from '@/app/lib/utils';

// Types
export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

export interface BudgetPlannerProps {
  tripId?: string;
  initialBudget?: number;
  initialCurrency?: string;
  initialExpenses?: Expense[];
  onUpdate?: (budget: number, expenses: Expense[]) => void;
  className?: string;
}

// Default categories
const DEFAULT_CATEGORIES = [
  'Accommodations',
  'Transportation',
  'Food & Dining',
  'Activities',
  'Shopping',
  'Miscellaneous'
];

// Currency options
const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
];

const BudgetPlanner = ({ 
  tripId,
  initialBudget = 0,
  initialCurrency = 'USD',
  initialExpenses = [],
  onUpdate,
  className
}: BudgetPlannerProps) => {
  const [totalBudget, setTotalBudget] = useState(initialBudget);
  const [currency, setCurrency] = useState(initialCurrency);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: DEFAULT_CATEGORIES[0],
    description: '',
    amount: 0,
    date: new Date().toISOString(),
    currency: initialCurrency
  });
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  
  // Generate summary
  const generateSummary = () => {
    const spent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remaining = totalBudget - spent;
    
    const categories: { [key: string]: number } = {};
    expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });
    
    return {
      total: totalBudget,
      spent,
      remaining,
      categories
    };
  };
  
  const summary = generateSummary();
  
  // Reset new expense form
  const resetNewExpenseForm = () => {
    setNewExpense({
      category: DEFAULT_CATEGORIES[0],
      description: '',
      amount: 0,
      date: new Date().toISOString(),
      currency
    });
    setEditingExpenseId(null);
  };
  
  // Add a new expense
  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      return; // Validation
    }
    
    const expenseToAdd: Expense = {
      id: editingExpenseId || Date.now().toString(),
      category: newExpense.category || DEFAULT_CATEGORIES[0],
      description: newExpense.description || '',
      amount: Number(newExpense.amount) || 0,
      date: newExpense.date || new Date().toISOString(),
      currency: newExpense.currency || currency
    };
    
    if (editingExpenseId) {
      // Update existing expense
      setExpenses(expenses.map(expense => 
        expense.id === editingExpenseId ? expenseToAdd : expense
      ));
    } else {
      // Add new expense
      setExpenses([...expenses, expenseToAdd]);
    }
    
    // Reset form after adding
    resetNewExpenseForm();
    
    // Call update callback if provided
    if (onUpdate) {
      onUpdate(totalBudget, [...expenses, expenseToAdd]);
    }
  };
  
  // Edit an expense
  const editExpense = (expense: Expense) => {
    setNewExpense({...expense});
    setEditingExpenseId(expense.id);
  };
  
  // Delete an expense
  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    
    // Call update callback if provided
    if (onUpdate) {
      onUpdate(totalBudget, updatedExpenses);
    }
  };
  
  // Get currency symbol
  const getCurrencySymbol = (code: string) => {
    const currency = CURRENCY_OPTIONS.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };
  
  // Calculate percentage for progress bars
  const calculatePercentage = (amount: number) => {
    return totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Budget Summary Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Banknote className="h-5 w-5 text-[#ff5f1f]" />
            Budget Summary
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Budget Settings */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-3">Budget Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Total Budget</label>
                <div className="flex gap-2">
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {CURRENCY_OPTIONS.map(option => (
                      <option key={option.code} value={option.code}>
                        {option.code} ({option.symbol})
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="number"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    placeholder="Enter total budget"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Budget Summary Figures */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Budget</h3>
              <p className="text-2xl font-semibold text-gray-800">
                {getCurrencySymbol(currency)}{totalBudget.toLocaleString()}
              </p>
            </div>
            
            <div className="flex-1 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Spent</h3>
              <p className="text-2xl font-semibold text-orange-500">
                {getCurrencySymbol(currency)}{summary.spent.toLocaleString()}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${calculatePercentage(summary.spent)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex-1 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Remaining</h3>
              <p className="text-2xl font-semibold text-green-500">
                {getCurrencySymbol(currency)}{summary.remaining.toLocaleString()}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${calculatePercentage(summary.remaining)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Add New Expense Form */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-3">
              {editingExpenseId ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                >
                  {DEFAULT_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Amount</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    {getCurrencySymbol(currency)}
                  </span>
                  <input
                    type="number"
                    className="flex-1 rounded-r-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                    value={newExpense.amount || ''}
                    onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                  value={newExpense.description || ''}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  placeholder="What did you spend on?"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f1f] focus:border-transparent"
                  value={newExpense.date ? format(new Date(newExpense.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setNewExpense({...newExpense, date: new Date(e.target.value).toISOString()})}
                />
              </div>
              
              <div className="flex justify-end items-end">
                {editingExpenseId && (
                  <Button 
                    variant="outline" 
                    onClick={resetNewExpenseForm}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  onClick={addExpense}
                  iconLeft={editingExpenseId ? Edit2 : PlusCircle}
                >
                  {editingExpenseId ? 'Update' : 'Add Expense'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Expenses List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50">
                <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Date</div>
                  <div className="col-span-3">Category</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-1">Amount</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
              </div>
              
              <div className="bg-white divide-y divide-gray-200">
                {expenses.length === 0 ? (
                  <div className="px-6 py-4 text-center text-sm text-gray-500">
                    No expenses added yet. Start tracking your spending!
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                      <div className="col-span-3 text-gray-600">
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </div>
                      <div className="col-span-3 font-medium text-gray-900">
                        {expense.category}
                      </div>
                      <div className="col-span-4 text-gray-500">
                        {expense.description}
                      </div>
                      <div className="col-span-1 font-medium text-gray-900">
                        {getCurrencySymbol(expense.currency)}{expense.amount.toLocaleString()}
                      </div>
                      <div className="col-span-1 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => editExpense(expense)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 flex justify-between">
          <p className="text-xs text-gray-500">
            Last updated: {format(new Date(), 'MMM dd, yyyy, h:mm a')}
          </p>
          
          <Button 
            size="sm" 
            onClick={() => {
              if (onUpdate) {
                onUpdate(totalBudget, expenses);
              }
            }}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BudgetPlanner; 