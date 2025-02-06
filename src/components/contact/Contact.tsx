"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle } from "lucide-react"

interface FormData {
    name: string
    email: string
    message: string
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        setIsSubmitted(true)
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" })
            setIsSubmitted(false)
        }, 3000)
    }

    return (
        <div id="contact" className="mt-24 max-w-xl mx-auto">
            <Card className="p-6 shadow-lg border-gray-300">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold text-black text-center">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[#E80458] font-medium">
                                Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="border-[#5900B3] focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#E80458] font-medium">
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="border-[#5900B3] focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-[#E80458] font-medium">
                                Message
                            </Label>
                            <Textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                className="min-h-[120px] border-[#5900B3] focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                                placeholder="How can we help you?"
                            />
                        </div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {!isSubmitted ? (
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#E80458] via-[#FF4D00] to-[#5900B3] hover:from-[#FF4D00] hover:to-[#E80458] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                        </motion.div>
                                    ) : (
                                        <Send className="mr-2 h-4 w-4" />
                                    )}
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center justify-center text-green-500"
                                >
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    <span>Message sent successfully!</span>
                                </motion.div>
                            )}
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

