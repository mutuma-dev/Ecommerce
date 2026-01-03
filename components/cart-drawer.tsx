"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useShop } from "@/hooks/use-shop"
import Link from "next/link"

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity } = useShop()
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full animate-in zoom-in">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" /> Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <p className="text-xl font-medium text-gray-500">Your cart is empty</p>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-lg text-secondary line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">KES {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-primary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-primary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="p-6 border-t bg-gray-50">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-600 font-medium">Subtotal</span>
                <span className="text-2xl font-black text-secondary">KES {total.toLocaleString()}</span>
              </div>
              <Button
                asChild
                className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
              >
                <Link href="/checkout">Checkout Now</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
