"use client"

import Link from "next/link"

import { Navbar } from "@/components/navbar"
import { FeaturedProducts } from "@/components/featured-products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react"
import data from "./data.json"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={data.hero.image || "/placeholder.svg"}
              alt="Sneakers Hero"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{data.hero.title}</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">{data.hero.description}</p>
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-xl font-bold rounded-xl shadow-lg shadow-primary/20"
                >
                  {data.hero.cta}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">{data.about.title}</h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  {data.about.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <Button variant="default" className="mt-10 bg-primary hover:bg-primary/90 h-14 px-8 text-lg font-bold">
                  {data.about.cta}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl group-hover:bg-primary/20 transition-colors" />
                <img
                  src={data.about.image || "/placeholder.svg"}
                  alt="Sneaker Lifestyle"
                  className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Component */}
        <FeaturedProducts />

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold text-center mb-16">
              Contact Us
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
              >
                <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Mail className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">{data.footer.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Phone className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">{data.footer.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">{data.footer.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Clock className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">{data.footer.contact.hours}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.4 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
              >
                <h3 className="text-3xl font-bold mb-8">Connect With Us</h3>
                <div className="space-y-8">
                  <button className="flex items-center gap-5 w-full hover:text-primary transition-colors group">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Facebook className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">Facebook</span>
                  </button>
                  <button className="flex items-center gap-5 w-full hover:text-primary transition-colors group">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Instagram className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">Instagram</span>
                  </button>
                  <button className="flex items-center gap-5 w-full hover:text-primary transition-colors group">
                    <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Twitter className="w-7 h-7" />
                    </div>
                    <span className="text-xl font-medium">Twitter</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{data.newsletter.title}</h2>
              <p className="text-gray-400 text-xl mb-10">{data.newsletter.description}</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  placeholder={data.newsletter.placeholder}
                  className="h-14 bg-white border-none text-lg px-6 rounded-xl"
                />
                <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl">
                  {data.newsletter.button}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary pt-20 pb-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{data.site.name}</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">{data.footer.description}</p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Mail].map((Icon, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-full text-gray-400 hover:text-primary hover:bg-white/5"
                  >
                    <Icon className="w-6 h-6" />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {data.footer.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-lg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-8">Customer Service</h4>
              <ul className="space-y-4">
                {data.footer.customerService.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-lg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-8">Contact Us</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{data.footer.contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{data.footer.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{data.footer.contact.email}</span>
                </li>
              </ul>
              <div className="mt-8">
                <h4 className="text-white font-bold mb-4">{data.footer.payment.title}</h4>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center text-[10px] font-black text-white">
                    M-PESA
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>{data.footer.payment.method}</p>
                    <p>{data.footer.payment.account}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800 text-gray-500">
            <p>{data.site.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
