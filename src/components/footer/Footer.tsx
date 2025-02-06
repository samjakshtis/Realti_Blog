import React from "react"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const Footer = () => {
    return (
        <footer className="bg-[#1F1F1F] text-white py-12 mt-10">
            <div className="container mx-auto px-8">
                {/* Footer Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {/* Column 1: About Section */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-xl font-semibold">About Realti</h3>
                        <p className="text-gray-400 text-sm">
                            Realti is a leading platform dedicated to empowering individuals with knowledge and tools for real estate success. We provide courses, guides, and resources for first-time homebuyers and experienced investors alike.
                        </p>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/features">Features</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Contact Info */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p className="text-gray-400 text-sm">
                            Have any questions? We're here to help! Reach out to us via the channels below.
                        </p>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Email: <a href="mailto:info@realti.com" className="hover:text-[#FF4D00]">info@realti.com</a></li>
                            <li>Phone: <a href="tel:+1234567890" className="hover:text-[#FF4D00]">+1 234 567 890</a></li>
                        </ul>
                    </motion.div>

                    {/* Column 4: Social Media Links */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Facebook className="text-2xl hover:text-[#FF4D00]" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter className="text-2xl hover:text-[#FF4D00]" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="text-2xl hover:text-[#FF4D00]" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram className="text-2xl hover:text-[#FF4D00]" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 border-t border-gray-600 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Realti. All Rights Reserved.
                    </p>
                    <Button
                        size="sm"
                        className="mt-4  bg-gradient-to-r from-[#EC6227] via-[#E80458] to-[#5900B3] hover:from-[#E80458] hover:to-[#4A0099] px-6 py-3 rounded-lg"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Back to Top
                    </Button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
