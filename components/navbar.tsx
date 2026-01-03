"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModals } from "./auth-modals"
import { CartDrawer } from "./cart-drawer"
import data from "@/app/data.json"
import { motion, AnimatePresence } from "framer-motion"
import { useShop } from "@/hooks/use-shop"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, cart } = useShop()

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            {data.site.logo}
          </div>
          <span className="text-2xl font-bold tracking-tight text-secondary">{data.site.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {data.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <CartDrawer />
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <AuthModals />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          {user && <CartDrawer />}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white z-[70] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold text-secondary">{data.site.name}</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                {data.navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-medium text-gray-800 hover:text-primary border-b border-gray-100 pb-2"
                  >
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-medium text-gray-800 hover:text-primary border-b border-gray-100 pb-2 flex items-center gap-2"
                  >
                    <User className="w-5 h-5" /> Profile
                  </Link>
                )}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                {user ? (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full h-12 text-lg"
                  >
                    Logout
                  </Button>
                ) : (
                  <AuthModals onAuthSuccess={() => setIsMenuOpen(false)} />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
