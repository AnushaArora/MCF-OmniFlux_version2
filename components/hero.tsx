import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to Amazon{" "}
              <span className="text-blue-600">MCF OmniFlux</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                The Ultimate Multi-Channel Smart Fulfillment Solution with AI-Driven Routing and Sustainability Alignment

            </p>
            <div className="flex space-x-4">
              <Button size="lg">About</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <Image
              src="/Screenshot 2024-11-24 160228.png"
              alt="Multi-Channel Fulfillment"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-blue-600">20k+</p>
              <p className="text-sm text-gray-600">Pin codes covered</p>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-blue-600">43M+</p>
              <p className="text-sm text-gray-600">Cu ft space</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

