"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

// FAQ data
const faqs = [
  {
    question: "How do I get started with MCF?",
    answer: "To get started with Amazon Multi-Channel Fulfillment, you need to have an active seller account on Amazon. Once you have that, you can enable MCF in your account settings and start creating fulfillment orders for your off-Amazon sales channels.",
  },
  {
    question: "What are the fees associated with MCF?",
    answer: "MCF fees include pick and pack fees, weight handling fees, and storage fees. The exact costs depend on the size and weight of your items, as well as the shipping speed selected. You can find detailed pricing information in your seller account or on the Amazon MCF pricing page.",
  },
  {
    question: "Can I use MCF for international orders?",
    answer: "Yes, MCF supports international shipping to many countries. However, availability and fees may vary depending on the destination. Check the MCF international shipping guidelines for more information on supported countries and associated costs.",
  },
  {
    question: "How does MCF handle returns?",
    answer: "MCF offers a returns processing service where Amazon can receive and process returns on your behalf. You can set up specific rules for handling returns, such as inspecting items before restocking or disposing of certain products. Fees apply for this service.",
  },
  {
    question: "What shipping speeds are available with MCF?",
    answer: "MCF offers multiple shipping speed options, including Standard (3-5 business days), Expedited (2 business days), and Priority (1 business day). The availability of these options may depend on the destination and the items being shipped.",
  },
  {
    question: "Can I use my own packaging with MCF?",
    answer: "In most cases, Amazon uses its own packaging for MCF orders to ensure efficient processing and maintain quality standards. However, for certain product categories or special requirements, you may be able to use custom packaging. Contact MCF support for more information on custom packaging options.",
  },
  {
    question: "How do I integrate MCF with my e-commerce platform?",
    answer: "Amazon provides APIs and integration tools to connect MCF with various e-commerce platforms and order management systems. You can find documentation and resources for integration in the Amazon Marketplace Web Service (MWS) developer portal.",
  },
  {
    question: "What happens if an item is lost or damaged in the fulfillment process?",
    answer: "Amazon has a reimbursement policy for items lost or damaged in their fulfillment centers or during the shipping process. If an item is lost or damaged, you can file a claim, and Amazon will reimburse you based on the item's value and the circumstances of the loss or damage.",
  },
]

export function FAQ() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleAll = () => {
    if (expandedItems.length === faqs.length) {
      setExpandedItems([])
    } else {
      setExpandedItems(faqs.map((_, index) => `item-${index}`))
    }
  }

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions about Multi-Channel Fulfillment
          </p>
          <Button onClick={toggleAll}>
            {expandedItems.length === faqs.length ? "Collapse All" : "Expand All"}
          </Button>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion
            type="multiple"
            value={expandedItems}
            onValueChange={setExpandedItems}
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

