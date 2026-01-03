"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useShop } from "@/hooks/use-shop"
import { useToast } from "@/hooks/use-toast"

interface AuthModalsProps {
  onAuthSuccess?: () => void
}

export function AuthModals({ onAuthSuccess }: AuthModalsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<"login" | "register">("login")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" })
  const { login } = useShop()
  const { toast } = useToast()
  const router = useRouter()

  // <CHANGE> Added login/register simulation logic
  const handleSubmit = () => {
    if (view === "login") {
      if (!formData.email || !formData.password) {
        toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" })
        return
      }
      login({ name: "Guest User", email: formData.email, phone: "+254712345678" })
      toast({ title: "Success", description: "Logged in successfully!" })
      setIsOpen(false)
      onAuthSuccess?.()
      router.push("/")
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" })
        return
      }
      login({ name: formData.name, email: formData.email, phone: formData.phone })
      toast({ title: "Success", description: "Account created successfully!" })
      setIsOpen(false)
      onAuthSuccess?.()
      router.push("/")
    }
    setFormData({ name: "", email: "", phone: "", password: "" })
  }

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
            onClick={() => setView("login")}
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
            onClick={() => setView("register")}
          >
            Register
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {view === "login" ? "Sign in" : "Create an account"}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {view === "login"
                ? "Enter your email and password to login"
                : "Enter your details to create your account"}
            </p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {view === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            {view === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+254712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            {view === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            )}
            {/* <CHANGE> Added onClick handler for simulation */}
            <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
              {view === "login" ? "Sign in" : "Create account"}
            </Button>
          </div>
          <div className="text-center text-sm">
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setView("register")} className="text-primary font-medium hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setView("login")} className="text-primary font-medium hover:underline">
                  Sign in
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
