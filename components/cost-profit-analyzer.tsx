"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function CostProfitAnalyzer() {
  const [sellingPrice, setSellingPrice] = useState('')
  const [fulfillmentCost, setFulfillmentCost] = useState('')

  const profitMargin = sellingPrice && fulfillmentCost
    ? ((parseFloat(sellingPrice) - parseFloat(fulfillmentCost)) / parseFloat(sellingPrice) * 100).toFixed(2)
    : '0.00'

    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Cost and Profit Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="selling-price">Selling Price ($)</Label>
          <Input
            id="selling-price"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Enter selling price"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fulfillment-cost">Fulfillment Cost ($)</Label>
          <Input
            id="fulfillment-cost"
            type="number"
            value={fulfillmentCost}
            onChange={(e) => setFulfillmentCost(e.target.value)}
            placeholder="Enter fulfillment cost"
          />
        </div>
        <div>
          <p className="font-semibold">Profit Margin: {profitMargin}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

