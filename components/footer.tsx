import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'



export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MCF-OmniFlux</h3>
            <p className="text-sm text-gray-400">
              Empowering businesses with Amazon's world-class fulfillment network.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#benefits" className="text-sm text-gray-400 hover:text-white transition-colors">Benefits</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Documentation</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Support Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MCF-OmniFlux. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

