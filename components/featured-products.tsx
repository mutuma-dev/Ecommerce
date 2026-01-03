"use client"

import { useState, useMemo } from "react"
import { Search, Filter, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import data from "@/app/data.json"
import { useShop } from "@/hooks/use-shop"
import { useToast } from "@/hooks/use-toast"
import { AuthModals } from "./auth-modals"

export function FeaturedProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [filters, setFilters] = useState({
    brand: "All Brands",
    size: "all",
    price: [0, 25000],
  })

  const { user, addToCart } = useShop()
  const { toast } = useToast()

  const filteredProducts = useMemo(() => {
    return data.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = filters.brand === "All Brands" || product.brand === filters.brand
      const matchesSize = filters.size === "all" || product.size.includes(Number.parseInt(filters.size))
      const matchesPrice = product.price >= filters.price[0] && product.price <= filters.price[1]
      return matchesSearch && matchesBrand && matchesSize && matchesPrice
    })
  }, [searchTerm, filters])

  const handleAddToCart = (product: any) => {
    if (!user) {
      setShowAuthModal(true)
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      })
      return
    }
    addToCart(product)
    toast({ title: "Success", description: `${product.name} added to cart!` })
  }

  const brands = ["All Brands", ...new Set(data.products.map((p) => p.brand))]
  const sizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-5xl mx-auto">
          <div className="relative flex-1">
            <Input
              placeholder="Search products..."
              className="h-12 pl-4 pr-12 text-lg border-gray-200 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button size="icon" className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary/90">
              <Search className="w-5 h-5" />
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="h-12 px-8 flex gap-2 text-lg border-gray-200 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filter
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1 text-secondary">{product.name}</h3>
                  <p className="text-gray-500 mb-6 font-medium">
                    {product.currency} {product.price.toLocaleString()}
                  </p>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-auto bg-primary hover:bg-primary/90 h-12 text-lg gap-2 rounded-xl"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[500px] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Filter Products</DialogTitle>
          </DialogHeader>
          <div className="grid gap-8 py-4">
            <div className="grid gap-3">
              <label className="font-bold text-lg">Brand</label>
              <Select value={filters.brand} onValueChange={(val) => setFilters({ ...filters, brand: val })}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand} className="text-lg">
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <label className="font-bold text-lg">Size</label>
              <Select value={filters.size} onValueChange={(val) => setFilters({ ...filters, size: val })}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6">
              <label className="font-bold text-lg">Price Range</label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={filters.price[0]}
                  onChange={(e) =>
                    setFilters({ ...filters, price: [Number.parseInt(e.target.value), filters.price[1]] })
                  }
                  className="h-12 text-center text-lg"
                />
                <span className="text-gray-400 font-bold">-</span>
                <Input
                  type="number"
                  value={filters.price[1]}
                  onChange={(e) =>
                    setFilters({ ...filters, price: [filters.price[0], Number.parseInt(e.target.value)] })
                  }
                  className="h-12 text-center text-lg"
                />
              </div>
              <Slider
                min={0}
                max={25000}
                step={500}
                value={filters.price}
                onValueChange={(val) => setFilters({ ...filters, price: val })}
                className="mt-2"
              />
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg" onClick={() => setIsFilterOpen(false)}>
            Apply Filters
          </Button>
        </DialogContent>
      </Dialog>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Login Required</DialogTitle>
          </DialogHeader>
          <p className="mb-6 text-gray-600">Please login to add items to your cart and complete your purchase.</p>
          <AuthModals onAuthSuccess={() => setShowAuthModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
