"use client"

import { GradientBackground } from '@/components/ui/background'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <GradientBackground />
            <Header />
            <main className="min-h-screen pt-24">
                {children}
            </main>
            <Footer />
        </div>
    )
} 