"use client"

import { Navbar } from "@/components/navbar"
import { useShop } from "@/hooks/use-shop"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { CreditCard, Smartphone, CheckCircle2, ChevronRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, user } = useShop()
  const [method, setMethod] = useState("mpesa")
  const [isSuccess, setIsSuccess] = useState(false)
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-black mb-4">Order Placed!</h1>
          <p className="text-gray-500 text-lg mb-8">
            Your sneakers are being prepared for delivery. We'll send you a confirmation email shortly.
          </p>
          <Button asChild className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold">
            <Link href="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Payment & Details */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">
                    1
                  </span>
                  Delivery Details
                </h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Full Name</Label>
                    <Input defaultValue={user?.name} className="h-12 text-lg" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Delivery Address</Label>
                    <Input placeholder="Stall No, Building, Road" className="h-12 text-lg" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Phone Number</Label>
                    <Input defaultValue={user?.phone} className="h-12 text-lg" />
                  </div>
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">
                    2
                  </span>
                  Payment Method
                </h2>
                <RadioGroup value={method} onValueChange={setMethod} className="grid gap-4">
                  <Label
                    htmlFor="mpesa"
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 [&:has(:checked)]:border-primary cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-bold text-lg">M-PESA</p>
                          <p className="text-sm text-gray-500">Fast & Secure Mobile Payment</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center text-[10px] font-black text-white">
                      M-PESA
                    </div>
                  </Label>
                  <Label
                    htmlFor="card"
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 [&:has(:checked)]:border-primary cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-primary" />
                        <div>
                          <p className="font-bold text-lg">Card Payment</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-10 h-6 bg-blue-600 rounded" />
                      <div className="w-10 h-6 bg-orange-600 rounded" />
                    </div>
                  </Label>
                </RadioGroup>
              </section>
            </motion.div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-32">
                <h2 className="text-2xl font-black mb-8">Order Summary</h2>
                <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image || "/placeholder.svg"} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x KES {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-bold">KES {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-dashed pt-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-black text-primary">KES {total.toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => setIsSuccess(true)}
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-xl font-black mt-4 shadow-xl shadow-primary/20 group"
                  >
                    Place Order <ChevronRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
