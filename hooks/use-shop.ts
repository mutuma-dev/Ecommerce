"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Product {
  id: number
  name: string
  brand: string
  price: number
  currency: string
  image: string
}

interface CartItem extends Product {
  quantity: number
}

interface User {
  name: string
  email: string
  phone: string
}

interface Admin {
  name: string
  email: string
}

interface ShopState {
  user: User | null
  admin: Admin | null
  cart: CartItem[]
  login: (user: User) => void
  logout: () => void
  updateProfile: (user: Partial<User>) => void
  adminLogin: (admin: Admin) => void
  adminLogout: () => void
  updateAdminProfile: (admin: Partial<Admin>) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      user: null,
      admin: null,
      cart: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null, cart: [] }),
      updateProfile: (updates) => set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
      adminLogin: (admin) => set({ admin }),
      adminLogout: () => set({ admin: null }),
      updateAdminProfile: (updates) =>
        set((state) => ({ admin: state.admin ? { ...state.admin, ...updates } : null })),
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id)
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item)),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "stride-by-marlow-storage" },
  ),
)
