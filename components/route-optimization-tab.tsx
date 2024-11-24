import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for the scatter plot
const mockETAData = [
  { x: 1, y: 2, z: 200 },
  { x: 2, y: 3, z: 260 },
  { x: 3, y: 3, z: 400 },
  { x: 4, y: 4, z: 300 },
  { x: 5, y: 1, z: 470 },
  { x: 6, y: 5, z: 100 },
]

const orderTypes = ['Standard', 'Express', 'Bulk', 'Fragile', 'Perishable']
const packagingTypes = ['Cardboard Box', 'Padded Envelope', 'Plastic Container', 'Wooden Crate', 'Eco-friendly Wrap']
const fulfillmentMethods = ['Amazon MCF', 'In-house Warehouse', 'Local Partner', 'Dropshipping']

export function RouteOptimizationTab() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [orderType, setOrderType] = useState('')
  const [etaData, setEtaData] = useState(mockETAData)
  const [suggestedPackaging, setSuggestedPackaging] = useState('')
  const [suggestedFulfillment, setSuggestedFulfillment] = useState('')

  const handleOptimize = () => {
    // In a real application, this would call an API to perform the optimization
    // For this example, we'll use mock data and random selection
    setEtaData(mockETAData.map(point => ({
      ...point,
      x: point.x + Math.random() * 2 - 1,
      y: point.y + Math.random() * 2 - 1,
    })))
    setSuggestedPackaging(packagingTypes[Math.floor(Math.random() * packagingTypes.length)])
    setSuggestedFulfillment(fulfillmentMethods[Math.floor(Math.random() * fulfillmentMethods.length)])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Route Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Enter origin" />
              </div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" />
              </div>
              <div>
                <Label htmlFor="order-type">Order Type</Label>
                <Select onValueChange={setOrderType}>
                  <SelectTrigger id="order-type">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleOptimize}>Optimize Route</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Optimization Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Suggested Packaging:</strong> {suggestedPackaging}</p>
                <p><strong>Suggested Fulfillment Method:</strong> {suggestedFulfillment}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ETA Scatter Plot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Distance" unit="km" />
                <YAxis type="number" dataKey="y" name="Time" unit="h" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="ETA" data={etaData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



