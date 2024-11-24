import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Sustainability() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sustainability Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Emissions Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">500 kg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Eco-Friendly Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">75%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recycled Packaging Used</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">90%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

