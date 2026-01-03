"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminMessages() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-12">No messages yet.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
