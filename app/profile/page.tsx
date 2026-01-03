"use client"

import { Navbar } from "@/components/navbar"
import { useShop } from "@/hooks/use-shop"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { User, Save, Shield } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, updateProfile } = useShop()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const handleSave = () => {
    updateProfile(formData)
    toast({
      title: "Profile Updated",
      description: "Your information has been successfully saved.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-primary/20">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <h1 className="text-4xl font-black text-secondary">My Profile</h1>
                <p className="text-gray-500 text-lg font-medium">Manage your personal information and preferences.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" /> Personal Information
                  </h2>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 text-lg"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 text-lg"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12 text-lg"
                      />
                    </div>
                  </div>
                </section>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    className="h-14 px-10 bg-primary hover:bg-primary/90 text-lg font-bold rounded-xl gap-2 shadow-lg shadow-primary/20"
                  >
                    <Save className="w-5 h-5" /> Save Changes
                  </Button>
                </div>
              </div>

              <div className="space-y-8">
                <section className="bg-secondary text-white p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> Account Status
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Membership</p>
                      <p className="text-lg font-bold">Stride Silver</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Member Since</p>
                      <p className="text-lg font-bold">Jan 2025</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
