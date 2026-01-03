"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Package, ShoppingCart, Users, MessageSquare, Settings, Sun, Moon, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    router.push("/admin")
  }

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-bold">Stride Admin</h1>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50 hover:text-secondary",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="w-full justify-start gap-3 h-12"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span>Toggle Theme</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-red-500 hover:text-red-600 hover:bg-red-50 group"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Logout</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="default"
          size="icon"
          className="bg-secondary text-white rounded-full shadow-lg"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-white z-[70] shadow-2xl lg:hidden"
            >
              <SidebarContent isMobile={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
