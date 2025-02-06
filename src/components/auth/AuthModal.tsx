"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "", // Added username field
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })
            if (error) {
                console.error('Error signing in:', error.message)
                // Add error handling UI here
            }
        } else {
            // First, sign up the user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                    },
                },
            })

            if (authError) {
                console.error('Error signing up:', authError.message)
                return
            }

            // If signup successful, create profile record
            if (authData?.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            username: formData.username,
                            email: formData.email,
                            updated_at: new Date().toISOString(),
                        }
                    ])

                if (profileError) {
                    console.error('Error creating profile:', profileError.message)
                    // Add error handling UI here
                }
            }
        }

        onClose() // Close modal after successful auth
    }

    const handleGoogleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/dashboard'
            }
        })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 m-auto w-full max-w-md h-fit z-[101] p-4"
                    >
                        <Card className="relative overflow-hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 hover:bg-gray-100 rounded-full z-10"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5" />
                            </Button>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isLogin ? "login" : "signup"}
                                    initial={{ x: isLogin ? -300 : 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: isLogin ? 300 : -300, opacity: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-center">
                                            {isLogin ? "Welcome Back" : "Create Account"}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            {!isLogin && (
                                                <div className="space-y-2">
                                                    <Input
                                                        type="text"
                                                        placeholder="Username"
                                                        value={formData.username}
                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <Input
                                                    type="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            {!isLogin && (
                                                <div className="space-y-2">
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            )}

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-[#FF4D00] to-[#5900B3] hover:from-[#E80458] hover:to-[#4A0099] text-white"
                                            >
                                                {isLogin ? "Sign In" : "Sign Up"}
                                            </Button>
                                        </form>

                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleGoogleSignIn}
                                        >
                                            <Image
                                                src="/google.svg"
                                                alt="Google"
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                            />
                                            Continue with Google
                                        </Button>

                                        <p className="mt-4 text-center text-sm text-gray-600">
                                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                            <button
                                                type="button"
                                                className="text-[#FF4D00] hover:text-[#E80458] font-semibold"
                                                onClick={() => setIsLogin(!isLogin)}
                                            >
                                                {isLogin ? "Sign up" : "Sign in"}
                                            </button>
                                        </p>
                                    </CardContent>
                                </motion.div>
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
} 