"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // Check if email already exists
            const { data: existingUser } = await supabase
                .from('profiles')
                .select('email')
                .eq('email', email)
                .single()

            if (existingUser) {
                setError('This email is already registered!')
                setIsSubmitting(false)
                return
            }

            // Insert new profile
            const { data, error: insertError } = await supabase
                .from('profiles')
                .insert([
                    {
                        email
                    }
                ])
                .select()
                .single()

            if (insertError) {
                console.error("Supabase error:", insertError)
                setError('Failed to subscribe. Please try again.')
                throw insertError
            }

            console.log("Subscription successful:", data)
            setIsSubmitted(true)

            // Reset form after delay
            setTimeout(() => {
                setEmail("")
                setIsSubmitted(false)
            }, 3000)
        } catch (error) {
            console.error("Submission error:", error)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="py-16 bg-transparent">
            <div className="container mx-auto px-4">
                <Card className="overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 p-6 flex items-center justify-center bg-transparent">
                            {/* <Image
                                src="/placeholder.svg?height=300&width=400"
                                alt="Real Estate Newsletter"
                                width={400}
                                height={300}
                                className="rounded-lg shadow-md"
                            /> */}
                            <iframe
                                src='https://flo.uri.sh/visualisation/14478217/embed'
                                title='Interactive or visual content'
                                className='flourish-embed-iframe'
                                style={{ width: '100%', height: '600px' }}
                                sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                            ></iframe>
                        </div>
                        <CardContent className="md:w-1/2 p-6 flex flex-col justify-center">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold mb-4">
                                    <span className="bg-gradient-to-r from-[#FF4D00] to-[#5900B3] text-transparent bg-clip-text">
                                        Subscribe to Our Newsletter
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <p className="text-gray-600 mb-6">
                                Stay ahead in the real estate game with Realti's exclusive newsletter. Curated insights, market trends,
                                and expert advice delivered straight to your inbox. It's not just a newsletter; it's your key to real
                                estate success!
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-3/4 sm:w-full mr-6"
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#E80458] via-[#FF4D00] to-[#5900B3] hover:from-[#FF4D00] hover:to-[#E80458] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                            >
                                                <Mail className="mr-2 h-4 w-4" />
                                            </motion.div>
                                        ) : (
                                            <Mail className="mr-2 h-4 w-4" />
                                        )}
                                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                                    </Button>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-red-600 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </form>

                            {/* Success Message */}
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-4 flex items-center text-green-600"
                                >
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    <span>Thank you for subscribing!</span>
                                </motion.div>
                            )}
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    )
}

