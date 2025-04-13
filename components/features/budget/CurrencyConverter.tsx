"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Check, AlertCircle } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { mockExchangeRates, currencies, Currency } from "@/lib/mock-data";
import { safeDateString } from '@/app/lib/utils';

interface CurrencyConverterProps {
  defaultFromCurrency?: string;
  defaultToCurrency?: string;
  defaultAmount?: number;
  className?: string;
}

export function CurrencyConverter({
  defaultFromCurrency = "USD",
  defaultToCurrency = "EUR",
  defaultAmount = 100,
  className = "",
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>(defaultAmount.toString());
  const [fromCurrency, setFromCurrency] = useState<string>(defaultFromCurrency);
  const [toCurrency, setToCurrency] = useState<string>(defaultToCurrency);
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  // Function to convert between currencies
  const convertCurrency = () => {
    setError(null);
    
    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      try {
        // Get exchange rates from the mock data
        const fromRate = mockExchangeRates[fromCurrency];
        const toRate = mockExchangeRates[toCurrency];
        
        if (!fromRate || !toRate) {
          throw new Error("Exchange rate not available");
        }
        
        // Convert the amount
        // First convert to USD, then to target currency
        const amountInUSD = parseFloat(amount) / fromRate;
        const result = amountInUSD * toRate;
        
        // Format the result
        setConvertedAmount(result.toFixed(2));
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        setError("Failed to convert currency. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 800); // Simulate network delay
  };
  
  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  // Convert when currencies change or on mount
  useEffect(() => {
    if (amount) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency]);
  
  // Get display info for currencies
  const getSymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };
  
  const getName = (code: string) => {
    return currencies.find(c => c.code === code)?.name || code;
  };
  
  return (
    <div className={`${className}`}>
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <Label htmlFor="amount" className="text-sm font-medium mb-1.5 block">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-white"
          />
        </div>
        
        {/* Currency Selection */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div>
            <Label htmlFor="fromCurrency" className="text-sm font-medium mb-1.5 block">
              From
            </Label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={swapCurrencies}
            className="mt-6"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Swap currencies</span>
          </Button>
          
          <div>
            <Label htmlFor="toCurrency" className="text-sm font-medium mb-1.5 block">
              To
            </Label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Convert Button */}
        <Button
          type="button"
          onClick={convertCurrency}
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert"
          )}
        </Button>
        
        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}
        
        {/* Results */}
        {convertedAmount && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-green-50 p-4"
          >
            <div className="flex items-center mb-2">
              <Check className="h-4 w-4 mr-2 text-green-600" />
              <h3 className="font-medium">Conversion Result</h3>
            </div>
            
            <div className="text-center my-3">
              <div className="text-gray-600 text-sm mb-1">
                {amount} {getSymbol(fromCurrency)} = 
              </div>
              <div className="text-2xl font-bold">
                {getSymbol(toCurrency)} {convertedAmount}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                1 {fromCurrency} = {(mockExchangeRates[toCurrency] / mockExchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
              <span>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                Rates updated
              </span>
              <span>
                Last updated: {lastUpdated}
              </span>
            </div>
          </motion.div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>
            * Exchange rates are for demonstration purposes only and may not reflect current market rates.
          </p>
        </div>
      </div>
    </div>
  );
} 