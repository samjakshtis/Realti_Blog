"use client"

import MainLayout from '@/components/layout/MainLayout'
import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/contact/Contact'
import Image from 'next/image'
import logo from '@/assets/Realti.png'

export default function About() {
    const contactFormRef = useRef<HTMLDivElement>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleInputChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // Add logic to send the form data to a backend service or email
        console.log(formData)
    }

    const scrollToContactForm = () => {
        if (contactFormRef.current) {
            const elementPosition = contactFormRef.current.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    return (
        <MainLayout>
            <section className="w-full bg-transparent py-16">
                <div className="container mx-auto px-8">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                        <Image src={logo} alt="Realti Logo" width={100} height={100} />
                        <h1 className="text-4xl sm:text-5xl font-bold text-black">
                            About Realti
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            At Realti, we are on a mission to empower individuals with the knowledge and tools they need to navigate the real estate industry confidently.
                        </p>
                        <Button onClick={scrollToContactForm}>Contact Us</Button>
                    </div>

                    {/* Our Mission Section */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-semibold text-center text-gradient">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-700 mt-4 text-center">
                            We aim to become the leading educational resource for real estate, equipping our users with everything from home-buying tips to advanced investment strategies.
                        </p>
                    </div>

                    {/* Our Values Section */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-semibold text-center text-gradient">Our Core Values</h2>
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-[#E80458]">Empowerment</h3>
                                <p className="text-gray-700 mt-2">
                                    We empower our users with knowledge and tools to make informed real estate decisions.
                                </p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-[#E80458]">Transparency</h3>
                                <p className="text-gray-700 mt-2">
                                    We believe in transparency, offering clear, unbiased information.
                                </p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-[#E80458]">Community</h3>
                                <p className="text-gray-700 mt-2">
                                    Building a supportive community where people can share knowledge and seek advice.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div ref={contactFormRef}>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}