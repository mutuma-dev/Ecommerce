"use client"

import { useState } from "react"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Trash2, X, Check, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import data from "@/app/data.json"

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(data.admin.customers)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<any>(null)
  const [search, setSearch] = useState("")

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleEdit = (customer: any) => {
    setEditingId(customer.id)
    setEditForm({ ...customer })
  }

  const handleSave = () => {
    setCustomers(customers.map((c) => (c.id === editingId ? editForm : c)))
    setEditingId(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search customers..."
              className="pl-10 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((customer) => (
              <motion.div layout key={customer.id}>
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardContent className="p-4 md:p-6">
                    {editingId === customer.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Name"
                        />
                        <Input
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          placeholder="Email"
                        />
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-green-500" onClick={handleSave}>
                            <Check className="w-4 h-4 mr-2" /> Save
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setEditingId(null)}
                          >
                            <X className="w-4 h-4 mr-2" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold truncate">{customer.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                          <p className="text-sm font-medium text-primary mt-1">{customer.phone}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(customer)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
