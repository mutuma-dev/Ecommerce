"use client"

import { Navbar } from "@/components/navbar"
import { FeaturedProducts } from "@/components/featured-products"
import { motion } from "framer-motion"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
            <p className="text-xl text-gray-600">Find your perfect pair from our exclusive range of 14+ sneakers.</p>
          </motion.div>
          <FeaturedProducts title="All Sneakers" />
        </div>
      </main>
    </div>
  )
}
