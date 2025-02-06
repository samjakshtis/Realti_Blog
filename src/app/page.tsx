"use client"

import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/landingpage/Hero'
import { FeaturesSection } from '@/components/landingpage/features'
import Newsletter from '@/components/landingpage/newsletter'
import ContactForm from '@/components/contact/Contact'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <FeaturesSection />
      <Newsletter />
      <ContactForm />
    </MainLayout>
  )
}

