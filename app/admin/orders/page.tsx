"use client"

import { useState } from "react"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Edit2, Search, X, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import data from "@/app/data.json"

export default function AdminOrders() {
  const [orders, setOrders] = useState(data.admin.orders)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState("")
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter(
    (o) => o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search),
  )

  const handleUpdateStatus = (id: number) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: editStatus } : o)))
    setEditingId(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Order #{order.id}</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{order.customer}</h3>
                    <p className="text-xl font-black text-secondary">KES {order.total.toLocaleString()}</p>
                  </div>

                  {editingId === order.id ? (
                    <div className="flex flex-wrap gap-2 pt-4 border-t md:border-none md:pt-0">
                      <Select defaultValue={order.status} onValueChange={setEditStatus}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="icon" className="bg-green-500" onClick={() => handleUpdateStatus(order.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => setEditingId(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="gap-2 bg-transparent"
                      onClick={() => {
                        setEditingId(order.id)
                        setEditStatus(order.status)
                      }}
                    >
                      <Edit2 className="w-4 h-4" /> Manage Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
