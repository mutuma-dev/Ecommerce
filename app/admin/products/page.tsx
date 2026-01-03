"use client"

import type React from "react"

import { useState, useRef } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Camera, Edit2, Trash2, X, Check, Search, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import data from "@/app/data.json"

export default function AdminProductsPage() {
  const [products, setProducts] = useState(data.products)
  const [newProduct, setNewProduct] = useState({ name: "", brand: "", size: "", price: "", image: "" })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const editCameraInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  const handleEditCapture = () => {
    if (editCameraInputRef.current) {
      editCameraInputRef.current.click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (isEditing) {
        setEditForm({ ...editForm, image: imageUrl })
      } else {
        setNewProduct({ ...newProduct, image: imageUrl })
      }
      toast({ title: "Image updated", description: "Product image successfully selected" })
    }
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.price) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" })
      return
    }
    toast({ title: "Success", description: "Product added successfully!" })
    setNewProduct({ name: "", brand: "", size: "", price: "", image: "" })
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
    toast({ title: "Success", description: "Product deleted successfully!" })
  }

  const startEditing = (product: any) => {
    setEditingId(product.id)
    setEditForm({ ...product })
  }

  const saveEdit = () => {
    setProducts(products.map((p) => (p.id === editingId ? editForm : p)))
    setEditingId(null)
    setEditForm(null)
    toast({ title: "Success", description: "Product updated successfully!" })
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Product Management</h1>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 h-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Add Product Form */}
          <Card className="p-4 md:p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div>
                <Label className="mb-2 block font-medium">Name</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label className="mb-2 block font-medium">Brand</Label>
                <Input
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label className="mb-2 block font-medium">Size</Label>
                <Input
                  value={newProduct.size}
                  onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label className="mb-2 block font-medium">Price</Label>
                <Input
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="mb-2 block font-medium">Image</Label>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none h-12 px-6 bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none h-12 px-6 gap-2 bg-transparent"
                  onClick={handleCapture}
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            <Button
              onClick={handleAddProduct}
              className="w-full md:w-auto h-12 md:h-14 px-8 bg-primary hover:bg-primary/90 text-lg font-bold"
            >
              Add Product
            </Button>
          </Card>

          {/* Product List - Mobile Optimized */}
          <div className="grid grid-cols-1 gap-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Product List</h2>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="p-4 overflow-hidden">
                    {editingId === product.id ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative group w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={editForm.image || "/placeholder.svg?height=100&width=100"}
                              alt="Edit product"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                onClick={() => editFileInputRef.current?.click()}
                                className="p-1 bg-white rounded-full"
                              >
                                <Upload className="w-4 h-4 text-gray-700" />
                              </button>
                              <button onClick={handleEditCapture} className="p-1 bg-white rounded-full">
                                <Camera className="w-4 h-4 text-gray-700" />
                              </button>
                            </div>
                            <input
                              ref={editFileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageChange(e, true)}
                            />
                            <input
                              ref={editCameraInputRef}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={(e) => handleImageChange(e, true)}
                            />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm text-gray-500">Edit Product Image</Label>
                            <p className="text-xs text-gray-400">Hover image to upload or take photo</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="Product Name"
                          />
                          <Input
                            value={editForm.brand}
                            onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                            placeholder="Brand"
                          />
                          <Input
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                            placeholder="Price"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={saveEdit} className="flex-1 bg-green-500 hover:bg-green-600 gap-2">
                            <Check className="w-4 h-4" /> Save
                          </Button>
                          <Button variant="outline" onClick={() => setEditingId(null)} className="flex-1 gap-2">
                            <X className="w-4 h-4" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode - Mobile Responsive Table-like Card
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                          {product.image && (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                          <p className="font-semibold text-primary">KES {product.price.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                          <Button variant="outline" size="icon" onClick={() => startEditing(product)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
