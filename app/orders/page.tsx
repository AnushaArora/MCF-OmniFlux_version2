import { SmartFulfillmentRouter } from '@/components/smart-fulfillment-router'
import { CostProfitAnalyzer } from '@/components/cost-profit-analyzer'

export default function Orders() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmartFulfillmentRouter />
        <CostProfitAnalyzer />
      </div>
    </div>
  )
}

