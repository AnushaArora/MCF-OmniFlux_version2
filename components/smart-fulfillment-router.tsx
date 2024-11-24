"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Leaf, Zap, DollarSign } from 'lucide-react'

const fulfillmentOptions = [
  { id: 'amazon', name: 'Amazon MCF', cost: 5.99, speed: 2, eco: 3 },
  { id: 'inhouse', name: 'In-house Warehouse', cost: 3.99, speed: 3, eco: 4 },
  { id: 'local', name: 'Local Partner', cost: 4.99, speed: 1, eco: 5 },
]

export function SmartFulfillmentRouter() {
  const [priority, setPriority] = useState('balanced')
  const [orderValue, setOrderValue] = useState('100')
  const [weight, setWeight] = useState('1')
  const [ecoFriendly, setEcoFriendly] = useState(false)
  const [selectedOption, setSelectedOption] = useState(fulfillmentOptions[0])
  const [profitMargin, setProfitMargin] = useState(30)

  const handleRouteOrder = () => {
    const option = fulfillmentOptions.reduce((prev, current) => {
      let score = 0
      if (priority === 'cost') score = -current.cost
      else if (priority === 'speed') score = -current.speed
      else if (priority === 'eco') score = current.eco
      else score = (current.cost + current.speed + current.eco) / 3

      return score > prev.score ? { option: current, score } : prev
    }, { option: fulfillmentOptions[0], score: -Infinity }).option

    setSelectedOption(option)
    setProfitMargin(Math.floor(Math.random() * 50) + 10) // Simulated profit margin
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Smart Fulfillment Router</CardTitle>
        <CardDescription>Optimize your order fulfillment with AI-based routing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="order-value">Order Value ($)</Label>
            <Input
              id="order-value"
              value={orderValue}
              onChange={(e) => setOrderValue(e.target.value)}
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              min="0"
              step="0.1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Routing Priority</Label>
          <Select onValueChange={setPriority} defaultValue={priority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cost">Lowest Cost</SelectItem>
              <SelectItem value="speed">Fastest Delivery</SelectItem>
              <SelectItem value="eco">Most Eco-Friendly</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="eco-friendly"
            checked={ecoFriendly}
            onCheckedChange={setEcoFriendly}
          />
          <Label htmlFor="eco-friendly">Prioritize Eco-Friendly Options</Label>
        </div>
        <Button onClick={handleRouteOrder} className="w-full">Calculate Optimal Route</Button>
      </CardContent>
      <CardFooter className="flex-col items-start space-y-4">
        <div className="w-full">
          <h4 className="font-semibold mb-2">Optimal Fulfillment Option:</h4>
          <p className="text-lg font-bold">{selectedOption.name}</p>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm font-semibold">Cost</p>
              <p>${selectedOption.cost.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-semibold">Speed</p>
              <p>{selectedOption.speed} day(s)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-semibold">Eco Score</p>
              <p>{selectedOption.eco}/5</p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-2">
          <Label>Estimated Profit Margin</Label>
          <Slider
            value={[profitMargin]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>0%</span>
            <span className="font-semibold">{profitMargin}%</span>
            <span>100%</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}





// "use client"

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export function SmartFulfillmentRouter() {
//   const [priority, setPriority] = useState('balanced')

//   const handleRouteOrder = async () => {
//     // In a real application, this would call an API to route the order
//     console.log(`Routing order with ${priority} priority`)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Smart Fulfillment Router</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <Select onValueChange={setPriority} defaultValue={priority}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select priority" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="cost">Lowest Cost</SelectItem>
//             <SelectItem value="speed">Fastest Delivery</SelectItem>
//             <SelectItem value="eco">Most Eco-Friendly</SelectItem>
//             <SelectItem value="balanced">Balanced</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button onClick={handleRouteOrder}>Route Order</Button>
//       </CardContent>
//     </Card>
//   )
// }

