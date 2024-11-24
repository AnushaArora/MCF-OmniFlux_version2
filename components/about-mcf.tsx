"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Benefits data
const benefits = [
  {
    title: "Boost Productivity",
    description: "Streamline operations with minimal effort.",
    icon: "/images/graphics-software_17122619.gif",
    
  },
  {
    title: "Customizable Solutions",
    description: "Tailored to your unique needs.",
    icon: "/images/file_11677471.gif",
  },
  {
    title: "Time-Saving Integration",
    description: "Get up and running in no time",
    icon: "/images/1-hour_12146046.gif",
  },
  {
    title: "Enhanced Accuracy",
    description: "Reduce errors and improve outcomes.",
    icon: "/images/direct-selection_17097935.gif",
  },
  {
    title: "Dedicated Support",
    description: "Backed by expert assistance 24/7.",
    icon: "/images/virtual-assistant_17569417.gif",
  },
]
//gif (icons):: (page includes benefits)
// Features data
const features = [
  {
    title: "One inventory for all sales channels",
    description: "You can use existing FBA listings and inventory to fulfill all your off-Amazon orders",
    icon: "/images/box.png",
  },
  {
    title: "All in one fulfilment solution",
    description: "We take care of everything- from doorstep inventory pickup, storage, placement, packaging, invoicing and fulfilment",
    icon: "/images/delivery-day.png",
  },
  {
    title: "Automated fulfilment and real time tracking",
    description: "Seamlessly connect MCF with your back-end systems and automate the entire order fulfilment process",
    icon: "/images/global-distribution.png",
  },
  {
    title: "Multiple payment options for customers",
    description: "Provide multiple payment options like prepaid while order placement or through credit card, debit card, UPI or cash",
    icon: "/images/shipped.png",
  },
]

// How it works steps
const steps = [
  {
    title: "Step 1",
    description: "Send inventory to Amazon fulfillment centers (FC)",
    icon: "/images/supermarket_10606405.gif",
  },
  {
    title: "Step 2",
    description: "Amazon receives and stores your inventory",
    icon: "/images/menu_13896588.gif",
  },
  {
    title: "Step 3",
    description: "Customers order products on your website or other sales channels",
    icon: "/images/doubts_10967600.gif",
  },
  {
    title: "Step 4",
    description: "Amazon packs and ships your order with invoice",
    icon: "/images/star_17643236.gif",
  },
  {
    title: "Step 5",
    description: "Amazon delivers your product",
    icon: "/images/world-location_17569486.gif",
  },
]

export function AboutMCF() {
  return (
    <div className="w-full">
      {/* What is MCF Section */}
      <section id="about" className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-blue-400">What is Multi-Channel Fulfillment (MCF)?</h2>
            <p className="text-xl mb-8">Leverage Amazon's best in class fulfillment network for all your off-Amazon orders</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/images/about.png"
                alt="Amazon Fulfillment Center"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg">
                MCF is a nationwide integrated fulfillment solution for all your sales channels, including D2C (ecommerce), spanning across selling needs such as warehousing, inventory management, invoicing, logistics and customer delivery.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-400">•</span>
                  <span>Directly through your own website</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-400">•</span>
                  <span>Online channel like social media store fronts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-400">•</span>
                  <span>Or any other sales channels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Benefits of MCF</h2>
            <p className="text-xl text-gray-600">
              Delight your customers with end to end fulfillment network that powers Amazon
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={64}
                      height={64}
                      className="mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Features on MCF</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur">
                  <CardContent className="p-6">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                      className="mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How MCF works?</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200" />
            <div className="grid md:grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center relative"
                >
                  <div className="bg-white p-4 rounded-full inline-block mb-4 relative z-10">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="font-semibold mb-2 text-blue-600">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to get started with MCF?</h2>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">Start Selling</Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white hover:text-blue-600">
              Sign Up
            </Button>
</div>
        </div>
      </section>
    </div>
  )
}

