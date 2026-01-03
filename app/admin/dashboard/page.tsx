"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { useShop } from "@/hooks/use-shop"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import data from "@/app/data.json"

export default function AdminDashboard() {
  const [chartType, setChartType] = useState("bar")
  const { admin } = useShop()
  const router = useRouter()

  useEffect(() => {
    if (!admin) router.push("/admin")
  }, [admin, router])

  if (!admin) return null

  const stats = [
    { label: "Total Sales", value: `KES ${data.admin.dashboard.stats.totalSales.toLocaleString()}` },
    { label: "Average Order Value", value: `KES ${data.admin.dashboard.stats.averageOrderValue.toLocaleString()}` },
    { label: "Total Orders", value: data.admin.dashboard.stats.totalOrders.toLocaleString() },
    { label: "Total Customers", value: data.admin.dashboard.stats.totalCustomers.toLocaleString() },
  ]

  const COLORS = ["#f97316", "#0f172a", "#64748b", "#94a3b8"]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-xl font-bold">Sales Overview</CardTitle>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={data.admin.dashboard.salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} animationDuration={500} />
                </BarChart>
              ) : chartType === "line" ? (
                <LineChart data={data.admin.dashboard.salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} animationDuration={500} />
                </LineChart>
              ) : chartType === "pie" ? (
                <PieChart>
                  <Pie
                    data={data.admin.dashboard.salesData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="sales"
                    animationDuration={500}
                  >
                    {data.admin.dashboard.salesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <AreaChart data={data.admin.dashboard.salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    fill="#f97316"
                    fillOpacity={0.2}
                    stroke="#f97316"
                    animationDuration={500}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
