"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface QuestionFormProps {
    isOpen: boolean
    onClose: () => void
}

const predefinedTags = [
    "Investment",
    "Multi-Family",
    "Single Family",
    "First Time Buyer",
    "Home Inspection",
    "Mortgage",
    "Market Analysis",
    "Property Management",
    "Commercial",
    "Legal",
    "Tax",
    "Insurance",
    "Renovation",
    "Due Diligence",
    "Calculations"
]

export default function QuestionForm({ isOpen, onClose }: QuestionFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: [] as string[]
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData)
        onClose()
    }

    const handleTagChange = (tag: string) => {
        setFormData(prev => {
            const newTags = prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
            return { ...prev, tags: newTags }
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
                        className="fixed inset-0 m-auto w-full max-w-2xl z-[101] p-4"
                    >
                        <div className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="text-2xl font-semibold">Ask a Question</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="hover:bg-gray-100 rounded-full"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        placeholder="What's your real estate question?"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                        className="border-2 border-gradient-to-r from-[#FF4D00] to-[#5900B3] text-black p-2 rounded-lg bg-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Details
                                    </label>
                                    <Textarea
                                        id="content"
                                        placeholder="Provide more details about your question..."
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        required
                                        className="min-h-[200px] border-2 border-gradient-to-r from-[#FF4D00] to-[#5900B3] text-black p-2 rounded-lg bg-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tags (select up to 3)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {predefinedTags.map((tag) => (
                                            <Button
                                                key={tag}
                                                type="button"
                                                variant={formData.tags.includes(tag) ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleTagChange(tag)}
                                                disabled={formData.tags.length >= 3 && !formData.tags.includes(tag)}
                                                className="rounded-full"
                                            >
                                                {tag}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#FF4D00] to-[#5900B3] text-white"
                                    >
                                        Post Question
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
