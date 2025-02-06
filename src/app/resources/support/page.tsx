"use client"

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    sizes?: string[]
    colors?: string[]
    category: 'clothing' | 'accessories' | 'other'
}

const products: Product[] = [
    {
        id: '1',
        name: 'Realti Classic T-Shirt',
        description: 'Comfortable cotton t-shirt with the Realti logo',
        price: 24.99,
        image: '/merchandise/tshirt.jpg', // You'll need to add these images
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Navy'],
        category: 'clothing'
    },
    {
        id: '2',
        name: 'Realti Hoodie',
        description: 'Warm and cozy hoodie perfect for any season',
        price: 49.99,
        image: '/merchandise/hoodie.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Gray', 'Black', 'Navy'],
        category: 'clothing'
    },
    {
        id: '3',
        name: 'Realti Coffee Mug',
        description: 'Start your day right with our premium coffee mug',
        price: 14.99,
        image: '/merchandise/mug.jpg',
        category: 'accessories'
    },
    {
        id: '4',
        name: 'Realti Notebook',
        description: 'High-quality notebook for your real estate notes',
        price: 12.99,
        image: '/merchandise/notebook.jpg',
        category: 'accessories'
    }
]

export default function SupportPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory)

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Show your support for real estate education by wearing our merchandise.
                        All proceeds help us create more educational content and resources.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-4 mb-8">
                    <Button
                        onClick={() => setSelectedCategory('all')}
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white"
                    >
                        All
                    </Button>
                    <Button
                        onClick={() => setSelectedCategory('clothing')}
                        variant={selectedCategory === 'clothing' ? 'default' : 'outline'}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white"
                    >
                        Clothing
                    </Button>
                    <Button
                        onClick={() => setSelectedCategory('accessories')}
                        variant={selectedCategory === 'accessories' ? 'default' : 'outline'}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white"
                    >
                        Accessories
                    </Button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-4">
                                    <div className="relative h-48 mb-4">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">${product.price}</span>
                                        <Button
                                            onClick={() => setSelectedProduct(product)}
                                            className="bg-gradient-to-r from-[#FF4D00] to-[#5900B3] hover:from-[#E80458] hover:to-[#4A0099]"
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Mission Impact Section */}
                <div className="mt-16 opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
                    <h2 className="text-3xl font-bold mb-6 text-center">Your Support Makes a Difference</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Educational Content</h3>
                            <p className="text-gray-600">Help us create more free educational resources for the community</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Community Growth</h3>
                            <p className="text-gray-600">Support the expansion of our real estate education community</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Platform Development</h3>
                            <p className="text-gray-600">Enable us to build better tools and features for learners</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
} 