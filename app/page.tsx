import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutMCF } from "@/components/about-mcf"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutMCF />
      <FAQ />
      <Footer />
    </main>
  )
}




// import Link from 'next/link'
// import { MountainIcon } from 'lucide-react'
// import { Button } from "@/components/ui/button"

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
//       <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
//         <Link className="flex items-center justify-center" href="/">
//           <MountainIcon className="h-6 w-6 text-primary" />
//           <span className="ml-2 text-xl font-bold text-primary">MCF-OmniFlux</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
//             Features
//           </Link>
//           <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
//             Pricing
//           </Link>
//           <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
//             About
//           </Link>
//           <Link className="text-sm font-medium hover:text-primary transition-colors" href="/signin">
//             Sign In
//           </Link>
//           <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
//             Dashboard
//           </Link>
//         </nav>
//       </header>
//       <main className="flex-1 flex items-center justify-center">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
//                   MCF-OmniFlux
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
//                   Ultimate Multi-Channel Smart Fulfillment Solution with AI-Driven Routing and Sustainability Alignment
//                 </p>
//               </div>
//               <div className="space-x-4">
//                 <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
//                   <Link href="/signup">Get Started</Link>
//                 </Button>
//                 <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 transition-all duration-300">
//                   <Link href="/integration">Learn More</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="border-t bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
//         <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
//           <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 MCF-OmniFlux. All rights reserved.</p>
//           <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//             <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
//               Terms of Service
//             </Link>
//             <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
//               Privacy
//             </Link>
//           </nav>
//         </div>
//       </footer>
//     </div>
//   )
// }

