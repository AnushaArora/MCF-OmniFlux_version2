import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MCF-OmniFlux',
  description: 'Ultimate Multi-Channel Smart Fulfillment Solution with AI-Driven Routing and Sustainability Alignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}




