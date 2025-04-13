"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Our currency converter is temporarily unavailable.</p>
        <p>Please check back later.</p>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter; 