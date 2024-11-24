'use client'

import React, { useState, useCallback, useMemo } from "react"
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Leaf, Package, Truck, DollarSign, BarChart2, Settings, Moon, Sun, Filter, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { SmartFulfillmentRouter } from '@/components/smart-fulfillment-router'
import { ErrorBoundary } from "@/components/error-boundary"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RouteOptimizationTab } from '@/components/route-optimization-tab'

// Types
type TabType = 'overview' | 'orders' | 'inventory' | 'analytics' | 'sustainability' | 'settings' | 'route-optimization'

type Order = {
  id: string
  customer: string
  total: number
  status: 'processing' | 'shipped' | 'delivered'
  date: string
}

type InventoryItem = {
  id: string
  name: string
  type: 'accessories' | 'apparel' | 'electronics' | 'furniture' | 'stationery'
  stock: number
  reorderPoint: number
  warehouseStock: number
  lowStockThreshold: number
  defectRate: number
}

type FulfillmentOption = {
  id: string
  name: string
  cost: number
  speed: number
  eco: number
}

// Mock data
const orders: Order[] = [
  { id: '1', customer: 'John Doe', total: 125.99, status: 'processing', date: '2023-11-22' },
  { id: '2', customer: 'Jane Smith', total: 89.99, status: 'shipped', date: '2023-11-21' },
  { id: '3', customer: 'Bob Johnson', total: 199.99, status: 'delivered', date: '2023-11-20' },
]

const inventoryItems: InventoryItem[] = [
  { id: '1', name: 'Eco-friendly Water Bottle', type: 'accessories', stock: 150, reorderPoint: 50, warehouseStock: 200, lowStockThreshold: 30, defectRate: 0.5 },
  { id: '2', name: 'Bamboo Toothbrush', type: 'accessories', stock: 75, reorderPoint: 100, warehouseStock: 150, lowStockThreshold: 50, defectRate: 0.3 },
  { id: '3', name: 'Reusable Shopping Bag', type: 'accessories', stock: 200, reorderPoint: 75, warehouseStock: 300, lowStockThreshold: 50, defectRate: 0.2 },
  { id: '4', name: 'Organic Cotton T-shirt', type: 'apparel', stock: 100, reorderPoint: 30, warehouseStock: 150, lowStockThreshold: 20, defectRate: 1.0 },
  { id: '5', name: 'Solar-powered Charger', type: 'electronics', stock: 50, reorderPoint: 20, warehouseStock: 100, lowStockThreshold: 15, defectRate: 1.5 },
  { id: '6', name: 'Recycled Plastic Chair', type: 'furniture', stock: 30, reorderPoint: 10, warehouseStock: 50, lowStockThreshold: 5, defectRate: 0.8 },
  { id: '7', name: 'Biodegradable Pen', type: 'stationery', stock: 500, reorderPoint: 200, warehouseStock: 1000, lowStockThreshold: 100, defectRate: 0.1 },
]

const fulfillmentOptions: FulfillmentOption[] = [
  { id: '1', name: 'Amazon MCF', cost: 5.99, speed: 2, eco: 3 },
  { id: '2', name: 'In-house Warehouse', cost: 3.99, speed: 3, eco: 4 },
  { id: '3', name: 'Local Partner', cost: 4.99, speed: 1, eco: 5 },
]

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 5500 },
  { name: 'Jun', value: 6000 },
]

const carbonEmissionsData = [
  { name: 'Standard', value: 400 },
  { name: 'Eco-Friendly', value: 300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Components
const SidebarLink = React.memo(({ icon: Icon, label, isActive, onClick }: { icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }) => (
  <a
    className={`flex items-center py-2 px-6 rounded-lg transition-colors ${
      isActive ? 'bg-primary text-primary-foreground' : 'text-slate-200 hover:bg-slate-800 hover:text-white'
    }`}
    href="#"
    onClick={onClick}
  >
    <Icon className="h-6 w-6" />
    <span className="mx-3">{label}</span>
  </a>
))

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
)

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<TabType>('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleTabChange = useCallback((tab: TabType) => {
    setIsLoading(true)
    setSelectedTab(tab)
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev)
    document.documentElement.classList.toggle('dark')
  }, [])

  const sidebarLinks = useMemo(() => [
    { icon: BarChart2, label: 'Overview', tab: 'overview' as const },
    { icon: Package, label: 'Orders', tab: 'orders' as const },
    { icon: Truck, label: 'Inventory', tab: 'inventory' as const },
    { icon: BarChart2, label: 'Analytics', tab: 'analytics' as const },
    { icon: Leaf, label: 'Sustainability', tab: 'sustainability' as const },
    { icon: Settings, label: 'Settings', tab: 'settings' as const },
    { icon: Settings, label: 'Route Optimization', tab: 'route-optimization' as const },
  ], [])

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="hidden w-64 overflow-y-auto bg-slate-900 md:block">
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="ml-2 text-white text-2xl font-semibold">MCF-OmniFlux</span>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          {sidebarLinks.map(({ icon, label, tab }) => (
            <SidebarLink
              key={tab}
              icon={icon}
              label={label}
              isActive={selectedTab === tab}
              onClick={() => handleTabChange(tab)}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  {selectedTab === 'overview' && <OverviewTab />}
                  {selectedTab === 'orders' && <OrdersTab />}
                  {selectedTab === 'inventory' && <InventoryTab />}
                  {selectedTab === 'analytics' && <AnalyticsTab />}
                  {selectedTab === 'sustainability' && <SustainabilityTab />}
                  {selectedTab === 'settings' && <SettingsTab />}
                  {selectedTab === 'route-optimization' && <RouteOptimizationTab />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
    </ErrorBoundary>
  )
}

const OverviewTab = React.memo(() => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">+2350</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Carbon Emissions Saved</CardTitle>
          <Leaf className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">1,234 kg</div>
          <p className="text-xs text-muted-foreground">+15.3% from last month</p>
        </CardContent>
      </Card>
    </div>
    <div className="grid grid-cols-1 gap-6 mb-6">
      <SmartFulfillmentRouter />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Carbon Emissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={carbonEmissionsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {carbonEmissionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </>
))

const OrdersTab = React.memo(() => (
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle className="text-foreground">Recent Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-semibold">Order ID</TableHead>
            <TableHead className="text-foreground font-semibold">Customer</TableHead>
            <TableHead className="text-foreground font-semibold">Total</TableHead>
            <TableHead className="text-foreground font-semibold">Status</TableHead>
            <TableHead className="text-foreground font-semibold">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-b border-border hover:bg-muted/50">
              <TableCell className="text-foreground">{order.id}</TableCell>
              <TableCell className="text-foreground">{order.customer}</TableCell>
              <TableCell className="text-foreground">${order.total.toFixed(2)}</TableCell>
              <TableCell className="text-foreground">{order.status}</TableCell>
              <TableCell className="text-foreground">{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
))

const InventoryTab = React.memo(() => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [replenishTime, setReplenishTime] = useState<number>(0)
  const [manufacturingTime, setManufacturingTime] = useState<number>(0)

  const filteredItems = selectedType
    ? inventoryItems.filter(item => item.type === selectedType)
    : inventoryItems

  const calculateShipmentDelay = () => {
    // Simulating AI calculation
    const baseDelay = replenishTime + manufacturingTime
    const variability = Math.random() * 2 - 1 // Random factor between -1 and 1
    return Math.max(0, baseDelay + variability * 2).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Inventory Status</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter by Type</h4>
                <Select onValueChange={(value) => setSelectedType(value === 'all' ? null : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="stationery">Stationery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-muted/50">
                <TableHead className="text-foreground font-semibold">Product</TableHead>
                <TableHead className="text-foreground font-semibold">Type</TableHead>
                <TableHead className="text-foreground font-semibold">Stock</TableHead>
                <TableHead className="text-foreground font-semibold">Warehouse Stock</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Defect Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="border-b border-border hover:bg-muted/50">
                  <TableCell className="text-foreground">{item.name}</TableCell>
                  <TableCell className="text-foreground capitalize">{item.type}</TableCell>
                  <TableCell className="text-foreground">{item.stock}</TableCell>
                  <TableCell className="text-foreground">{item.warehouseStock}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={(item.stock / item.reorderPoint) * 100} 
                        className="w-[60px] bg-slate-200 dark:bg-slate-700"
                      >
                        <div 
                          className="h-full transition-all" 
                          style={{ 
                            width: `${(item.stock / item.reorderPoint) * 100}%`,
                            backgroundColor: item.stock < item.lowStockThreshold ? 'red' : 'green'
                          }} 
                        />
                      </Progress>
                      <span className="text-sm text-foreground">
                        {item.stock < item.lowStockThreshold ? 'Low' : 'OK'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{item.defectRate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Check Shipment Delay Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="replenish-time">Avg time to replenish stocks (days)</Label>
              <Input 
                id="replenish-time" 
                type="number" 
                value={replenishTime}
                onChange={(e) => setReplenishTime(Number(e.target.value))}
                className="bg-background text-foreground border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturing-time">Avg time for manufacturing (days)</Label>
              <Input 
                id="manufacturing-time" 
                type="number" 
                value={manufacturingTime}
                onChange={(e) => setManufacturingTime(Number(e.target.value))}
                className="bg-background text-foreground border-border"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Calculate Shipment Delay</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Estimated Shipment Delay</DialogTitle>
                  <DialogDescription>
                    Based on the provided information and AI analysis, the estimated total shipment delay is:
                  </DialogDescription>
                </DialogHeader>
                <div className="text-center text-2xl font-bold py-4">
                  {calculateShipmentDelay()} days
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Product Defect Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={item.defectRate * 10} 
                      className="w-[100px] bg-slate-200 dark:bg-slate-700"
                    >
                      <div 
                        className="h-full bg-red-500 transition-all" 
                        style={{ width: `${item.defectRate * 10}%` }} 
                      />
                    </Progress>
                    <span className="text-sm text-foreground">{item.defectRate.toFixed(1)}%</span>
                    {item.defectRate > 1 && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})

const AnalyticsTab = React.memo(() => (
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle className="text-foreground">Fulfillment Options Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-semibold">Option</TableHead>
            <TableHead className="text-foreground font-semibold">Cost</TableHead>
            <TableHead className="text-foreground font-semibold">Speed</TableHead>
            <TableHead className="text-foreground font-semibold">Eco-Friendliness</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fulfillmentOptions.map((option) => (
            <TableRow key={option.id} className="border-b border-border hover:bg-muted/50">
              <TableCell className="text-foreground">{option.name}</TableCell>
              <TableCell className="text-foreground">${option.cost.toFixed(2)}</TableCell>
              <TableCell>
                <Progress 
                  value={option.speed * 20} 
                  className="w-[60%] bg-slate-200 dark:bg-slate-700"
                >
                  <div 
                    className="h-full bg-emerald-500 transition-all" 
                    style={{ width: `${option.speed * 20}%` }} 
                  />
                </Progress>
              </TableCell>
              <TableCell>
                <Progress 
                  value={option.eco * 20} 
                  className="w-[60%] bg-slate-200 dark:bg-slate-700"
                >
                  <div 
                    className="h-full bg-emerald-500 transition-all" 
                    style={{ width: `${option.eco * 20}%` }} 
                  />
                </Progress>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
))

const SustainabilityTab = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Carbon Emissions Saved</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground mb-2">1,234 kg</div>
        <p className="text-sm text-muted-foreground">
          Your eco-friendly choices have made a significant impact!
        </p>
      </CardContent>
    </Card>
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Eco-Friendly Deliveries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground mb-2">75%</div>
        <p className="text-sm text-muted-foreground">
          Your commitment to sustainability is commendable!
        </p>
      </CardContent>
    </Card>
  </div>
))

const SettingsTab = React.memo(() => (
  <div className="grid gap-6">
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input 
            id="email" 
            placeholder="Enter your email" 
            className="bg-background text-foreground border-border"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notifications" className="text-foreground">Notification Preferences</Label>
          <Select>
            <SelectTrigger className="bg-background text-foreground border-border">
              <SelectValue placeholder="Select notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="important">Important Only</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save Changes
        </Button>
      </CardContent>
    </Card>
    
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Integration Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="api-key" className="text-foreground">API Key</Label>
          <Input 
            id="api-key" 
            type="password" 
            placeholder="••••••••••••••••" 
            className="bg-background text-foreground border-border"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="webhook" className="text-foreground">Webhook URL</Label>
          <Input 
            id="webhook" 
            placeholder="https://" 
            className="bg-background text-foreground border-border"
          />
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Update Integration
        </Button>
      </CardContent>
    </Card>
  </div>
))



// 'use client'

// import React, { useState, useCallback, useMemo } from "react"
// import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
// import { Leaf, Package, Truck, DollarSign, BarChart2, Settings, Moon, Sun, Filter, AlertTriangle } from 'lucide-react'
// import { motion, AnimatePresence } from "framer-motion"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Progress } from "@/components/ui/progress"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Skeleton } from "@/components/ui/skeleton"
// import { SmartFulfillmentRouter } from '@/components/smart-fulfillment-router'
// import { ErrorBoundary } from "@/components/error-boundary"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// // Types
// type TabType = 'overview' | 'orders' | 'inventory' | 'analytics' | 'sustainability' | 'settings'

// type Order = {
//   id: string
//   customer: string
//   total: number
//   status: 'processing' | 'shipped' | 'delivered'
//   date: string
// }

// type InventoryItem = {
//   id: string
//   name: string
//   type: 'accessories' | 'apparel' | 'electronics' | 'furniture' | 'stationery'
//   stock: number
//   reorderPoint: number
//   warehouseStock: number
//   lowStockThreshold: number
//   defectRate: number
// }

// type FulfillmentOption = {
//   id: string
//   name: string
//   cost: number
//   speed: number
//   eco: number
// }

// // Mock data
// const orders: Order[] = [
//   { id: '1', customer: 'John Doe', total: 125.99, status: 'processing', date: '2023-11-22' },
//   { id: '2', customer: 'Jane Smith', total: 89.99, status: 'shipped', date: '2023-11-21' },
//   { id: '3', customer: 'Bob Johnson', total: 199.99, status: 'delivered', date: '2023-11-20' },
// ]

// const inventoryItems: InventoryItem[] = [
//   { id: '1', name: 'Eco-friendly Water Bottle', type: 'accessories', stock: 150, reorderPoint: 50, warehouseStock: 200, lowStockThreshold: 30, defectRate: 0.5 },
//   { id: '2', name: 'Bamboo Toothbrush', type: 'accessories', stock: 75, reorderPoint: 100, warehouseStock: 150, lowStockThreshold: 50, defectRate: 0.3 },
//   { id: '3', name: 'Reusable Shopping Bag', type: 'accessories', stock: 200, reorderPoint: 75, warehouseStock: 300, lowStockThreshold: 50, defectRate: 0.2 },
//   { id: '4', name: 'Organic Cotton T-shirt', type: 'apparel', stock: 100, reorderPoint: 30, warehouseStock: 150, lowStockThreshold: 20, defectRate: 1.0 },
//   { id: '5', name: 'Solar-powered Charger', type: 'electronics', stock: 50, reorderPoint: 20, warehouseStock: 100, lowStockThreshold: 15, defectRate: 1.5 },
//   { id: '6', name: 'Recycled Plastic Chair', type: 'furniture', stock: 30, reorderPoint: 10, warehouseStock: 50, lowStockThreshold: 5, defectRate: 0.8 },
//   { id: '7', name: 'Biodegradable Pen', type: 'stationery', stock: 500, reorderPoint: 200, warehouseStock: 1000, lowStockThreshold: 100, defectRate: 0.1 },
// ]

// const fulfillmentOptions: FulfillmentOption[] = [
//   { id: '1', name: 'Amazon MCF', cost: 5.99, speed: 2, eco: 3 },
//   { id: '2', name: 'In-house Warehouse', cost: 3.99, speed: 3, eco: 4 },
//   { id: '3', name: 'Local Partner', cost: 4.99, speed: 1, eco: 5 },
// ]

// const revenueData = [
//   { name: 'Jan', value: 4000 },
//   { name: 'Feb', value: 3000 },
//   { name: 'Mar', value: 5000 },
//   { name: 'Apr', value: 4500 },
//   { name: 'May', value: 5500 },
//   { name: 'Jun', value: 6000 },
// ]

// const carbonEmissionsData = [
//   { name: 'Standard', value: 400 },
//   { name: 'Eco-Friendly', value: 300 },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// // Components
// const SidebarLink = React.memo(({ icon: Icon, label, isActive, onClick }: { icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }) => (
//   <a
//     className={`flex items-center py-2 px-6 rounded-lg transition-colors ${
//       isActive ? 'bg-primary text-primary-foreground' : 'text-slate-200 hover:bg-slate-800 hover:text-white'
//     }`}
//     href="#"
//     onClick={onClick}
//   >
//     <Icon className="h-6 w-6" />
//     <span className="mx-3">{label}</span>
//   </a>
// ))

// const LoadingSkeleton = () => (
//   <div className="space-y-4">
//     <Skeleton className="h-12 w-full" />
//     <Skeleton className="h-64 w-full" />
//   </div>
// )

// export default function Dashboard() {
//   const [selectedTab, setSelectedTab] = useState<TabType>('overview')
//   const [isLoading, setIsLoading] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useState(false)

//   const handleTabChange = useCallback((tab: TabType) => {
//     setIsLoading(true)
//     setSelectedTab(tab)
//     // Simulate data loading
//     setTimeout(() => setIsLoading(false), 500)
//   }, [])

//   const toggleDarkMode = useCallback(() => {
//     setIsDarkMode(prev => !prev)
//     document.documentElement.classList.toggle('dark')
//   }, [])

//   const sidebarLinks = useMemo(() => [
//     { icon: BarChart2, label: 'Overview', tab: 'overview' as const },
//     { icon: Package, label: 'Orders', tab: 'orders' as const },
//     { icon: Truck, label: 'Inventory', tab: 'inventory' as const },
//     { icon: BarChart2, label: 'Analytics', tab: 'analytics' as const },
//     { icon: Leaf, label: 'Sustainability', tab: 'sustainability' as const },
//     { icon: Settings, label: 'Settings', tab: 'settings' as const },
//   ], [])

//   return (
//     <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
//     <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
//       {/* Sidebar */}
//       <aside className="hidden w-64 overflow-y-auto bg-slate-900 md:block">
//         <div className="flex items-center justify-center mt-8">
//           <div className="flex items-center">
//             <Leaf className="h-8 w-8 text-green-400" />
//             <span className="ml-2 text-white text-2xl font-semibold">MCF-OmniFlux</span>
//           </div>
//         </div>

//         <nav className="mt-10 space-y-2">
//           {sidebarLinks.map(({ icon, label, tab }) => (
//             <SidebarLink
//               key={tab}
//               icon={icon}
//               label={label}
//               isActive={selectedTab === tab}
//               onClick={() => handleTabChange(tab)}
//             />
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
//         <main className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
//             <Button variant="outline" size="icon" onClick={toggleDarkMode}>
//               {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
//               <span className="sr-only">Toggle dark mode</span>
//             </Button>
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedTab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.2 }}
//             >
//               {isLoading ? (
//                 <LoadingSkeleton />
//               ) : (
//                 <>
//                   {selectedTab === 'overview' && <OverviewTab />}
//                   {selectedTab === 'orders' && <OrdersTab />}
//                   {selectedTab === 'inventory' && <InventoryTab />}
//                   {selectedTab === 'analytics' && <AnalyticsTab />}
//                   {selectedTab === 'sustainability' && <SustainabilityTab />}
//                   {selectedTab === 'settings' && <SettingsTab />}
//                 </>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//     </ErrorBoundary>
//   )
// }

// const OverviewTab = React.memo(() => (
//   <>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//       <Card className="bg-card border-border">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-foreground">Total Revenue</CardTitle>
//           <DollarSign className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-foreground">$45,231.89</div>
//           <p className="text-xs text-muted-foreground">+20.1% from last month</p>
//         </CardContent>
//       </Card>
//       <Card className="bg-card border-border">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-foreground">Orders</CardTitle>
//           <Package className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-foreground">+2350</div>
//           <p className="text-xs text-muted-foreground">+180.1% from last month</p>
//         </CardContent>
//       </Card>
//       <Card className="bg-card border-border">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-foreground">Carbon Emissions Saved</CardTitle>
//           <Leaf className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-foreground">1,234 kg</div>
//           <p className="text-xs text-muted-foreground">+15.3% from last month</p>
//         </CardContent>
//       </Card>
//     </div>
//     <div className="grid grid-cols-1 gap-6 mb-6">
//       <SmartFulfillmentRouter />
//     </div>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       <Card className="bg-card border-border">
//         <CardHeader>
//           <CardTitle className="text-foreground">Revenue Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//       <Card className="bg-card border-border">
//         <CardHeader>
//           <CardTitle className="text-foreground">Carbon Emissions</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={carbonEmissionsData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {carbonEmissionsData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   </>
// ))

// const OrdersTab = React.memo(() => (
//   <Card className="bg-card border-border">
//     <CardHeader>
//       <CardTitle className="text-foreground">Recent Orders</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <Table>
//         <TableHeader>
//           <TableRow className="border-b border-border hover:bg-muted/50">
//             <TableHead className="text-foreground font-semibold">Order ID</TableHead>
//             <TableHead className="text-foreground font-semibold">Customer</TableHead>
//             <TableHead className="text-foreground font-semibold">Total</TableHead>
//             <TableHead className="text-foreground font-semibold">Status</TableHead>
//             <TableHead className="text-foreground font-semibold">Date</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {orders.map((order) => (
//             <TableRow key={order.id} className="border-b border-border hover:bg-muted/50">
//               <TableCell className="text-foreground">{order.id}</TableCell>
//               <TableCell className="text-foreground">{order.customer}</TableCell>
//               <TableCell className="text-foreground">${order.total.toFixed(2)}</TableCell>
//               <TableCell className="text-foreground">{order.status}</TableCell>
//               <TableCell className="text-foreground">{order.date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </CardContent>
//   </Card>
// ))

// const InventoryTab = React.memo(() => {
//   const [selectedType, setSelectedType] = useState<string | null>(null)
//   const [replenishTime, setReplenishTime] = useState<number>(0)
//   const [manufacturingTime, setManufacturingTime] = useState<number>(0)

//   const filteredItems = selectedType
//     ? inventoryItems.filter(item => item.type === selectedType)
//     : inventoryItems

//   const calculateShipmentDelay = () => {
//     // Simulating AI calculation
//     const baseDelay = replenishTime + manufacturingTime
//     const variability = Math.random() * 2 - 1 // Random factor between -1 and 1
//     return Math.max(0, baseDelay + variability * 2).toFixed(1)
//   }

//   return (
//     <div className="space-y-6">
//       <Card className="bg-card border-border">
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle className="text-foreground">Inventory Status</CardTitle>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Filter className="h-4 w-4" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-56">
//               <div className="space-y-2">
//                 <h4 className="font-medium leading-none">Filter by Type</h4>
//                 <Select onValueChange={(value) => setSelectedType(value === 'all' ? null : value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Types</SelectItem>
//                     <SelectItem value="accessories">Accessories</SelectItem>
//                     <SelectItem value="apparel">Apparel</SelectItem>
//                     <SelectItem value="electronics">Electronics</SelectItem>
//                     <SelectItem value="furniture">Furniture</SelectItem>
//                     <SelectItem value="stationery">Stationery</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </PopoverContent>
//           </Popover>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow className="border-b border-border hover:bg-muted/50">
//                 <TableHead className="text-foreground font-semibold">Product</TableHead>
//                 <TableHead className="text-foreground font-semibold">Type</TableHead>
//                 <TableHead className="text-foreground font-semibold">Stock</TableHead>
//                 <TableHead className="text-foreground font-semibold">Warehouse Stock</TableHead>
//                 <TableHead className="text-foreground font-semibold">Status</TableHead>
//                 <TableHead className="text-foreground font-semibold">Defect Rate</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredItems.map((item) => (
//                 <TableRow key={item.id} className="border-b border-border hover:bg-muted/50">
//                   <TableCell className="text-foreground">{item.name}</TableCell>
//                   <TableCell className="text-foreground capitalize">{item.type}</TableCell>
//                   <TableCell className="text-foreground">{item.stock}</TableCell>
//                   <TableCell className="text-foreground">{item.warehouseStock}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Progress 
//                         value={(item.stock / item.reorderPoint) * 100} 
//                         className="w-[60px] bg-slate-200 dark:bg-slate-700"
//                       >
//                         <div 
//                           className="h-full transition-all" 
//                           style={{ 
//                             width: `${(item.stock / item.reorderPoint) * 100}%`,
//                             backgroundColor: item.stock < item.lowStockThreshold ? 'red' : 'green'
//                           }} 
//                         />
//                       </Progress>
//                       <span className="text-sm text-foreground">
//                         {item.stock < item.lowStockThreshold ? 'Low' : 'OK'}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-foreground">{item.defectRate.toFixed(1)}%</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-foreground">Check Shipment Delay Time</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="replenish-time">Avg time to replenish stocks (days)</Label>
//               <Input 
//                 id="replenish-time" 
//                 type="number" 
//                 value={replenishTime}
//                 onChange={(e) => setReplenishTime(Number(e.target.value))}
//                 className="bg-background text-foreground border-border"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="manufacturing-time">Avg time for manufacturing (days)</Label>
//               <Input 
//                 id="manufacturing-time" 
//                 type="number" 
//                 value={manufacturingTime}
//                 onChange={(e) => setManufacturingTime(Number(e.target.value))}
//                 className="bg-background text-foreground border-border"
//               />
//             </div>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="w-full">Calculate Shipment Delay</Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Estimated Shipment Delay</DialogTitle>
//                   <DialogDescription>
//                     Based on the provided information and AI analysis, the estimated total shipment delay is:
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="text-center text-2xl font-bold py-4">
//                   {calculateShipmentDelay()} days
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </CardContent>
//         </Card>

//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-foreground">Product Defect Rates</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {inventoryItems.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <span className="text-sm text-foreground">{item.name}</span>
//                   <div className="flex items-center space-x-2">
//                     <Progress 
//                       value={item.defectRate * 10} 
//                       className="w-[100px] bg-slate-200 dark:bg-slate-700"
//                     >
//                       <div 
//                         className="h-full bg-red-500 transition-all" 
//                         style={{ width: `${item.defectRate * 10}%` }} 
//                       />
//                     </Progress>
//                     <span className="text-sm text-foreground">{item.defectRate.toFixed(1)}%</span>
//                     {item.defectRate > 1 && (
//                       <AlertTriangle className="h-4 w-4 text-yellow-500" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// })

// const AnalyticsTab = React.memo(() => (
//   <Card className="bg-card border-border">
//     <CardHeader>
//       <CardTitle className="text-foreground">Fulfillment Options Analysis</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <Table>
//         <TableHeader>
//           <TableRow className="border-b border-border hover:bg-muted/50">
//             <TableHead className="text-foreground font-semibold">Option</TableHead>
//             <TableHead className="text-foreground font-semibold">Cost</TableHead>
//             <TableHead className="text-foreground font-semibold">Speed</TableHead>
//             <TableHead className="text-foreground font-semibold">Eco-Friendliness</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {fulfillmentOptions.map((option) => (
//             <TableRow key={option.id} className="border-b border-border hover:bg-muted/50">
//               <TableCell className="text-foreground">{option.name}</TableCell>
//               <TableCell className="text-foreground">${option.cost.toFixed(2)}</TableCell>
//               <TableCell>
//                 <Progress 
//                   value={option.speed * 20} 
//                   className="w-[60%] bg-slate-200 dark:bg-slate-700"
//                 >
//                   <div 
//                     className="h-full bg-emerald-500 transition-all" 
//                     style={{ width: `${option.speed * 20}%` }} 
//                   />
//                 </Progress>
//               </TableCell>
//               <TableCell>
//                 <Progress 
//                   value={option.eco * 20} 
//                   className="w-[60%] bg-slate-200 dark:bg-slate-700"
//                 >
//                   <div 
//                     className="h-full bg-emerald-500 transition-all" 
//                     style={{ width: `${option.eco * 20}%` }} 
//                   />
//                 </Progress>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </CardContent>
//   </Card>
// ))

// const SustainabilityTab = React.memo(() => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-foreground">Carbon Emissions Saved</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-4xl font-bold text-foreground mb-2">1,234 kg</div>
//         <p className="text-sm text-muted-foreground">
//           Your eco-friendly choices have made a significant impact!
//         </p>
//       </CardContent>
//     </Card>
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-foreground">Eco-Friendly Deliveries</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-4xl font-bold text-foreground mb-2">75%</div>
//         <p className="text-sm text-muted-foreground">
//           Your commitment to sustainability is commendable!
//         </p>
//       </CardContent>
//     </Card>
//   </div>
// ))

// const SettingsTab = React.memo(() => (
//   <div className="grid gap-6">
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-foreground">Account Settings</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="grid gap-2">
//           <Label htmlFor="email" className="text-foreground">Email</Label>
//           <Input 
//             id="email" 
//             placeholder="Enter your email" 
//             className="bg-background text-foreground border-border"
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="notifications" className="text-foreground">Notification Preferences</Label>
//           <Select>
//             <SelectTrigger className="bg-background text-foreground border-border">
//               <SelectValue placeholder="Select notifications" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Notifications</SelectItem>
//               <SelectItem value="important">Important Only</SelectItem>
//               <SelectItem value="none">None</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
//           Save Changes
//         </Button>
//       </CardContent>
//     </Card>
    
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-foreground">Integration Settings</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="grid gap-2">
//           <Label htmlFor="api-key" className="text-foreground">API Key</Label>
//           <Input 
//             id="api-key" 
//             type="password" 
//             placeholder="••••••••••••••••" 
//             className="bg-background text-foreground border-border"
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="webhook" className="text-foreground">Webhook URL</Label>
//           <Input 
//             id="webhook" 
//             placeholder="https://" 
//             className="bg-background text-foreground border-border"
//           />
//         </div>
//         <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
//           Update Integration
//         </Button>
//       </CardContent>
//     </Card>
//   </div>
// ))




