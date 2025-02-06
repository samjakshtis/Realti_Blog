"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpCircle, ArrowDownCircle, MessageCircle, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface Answer {
    id: number
    content: string
    author: string
    date: string
    votes: number
    isAccepted: boolean
}

// This would come from your database in a real application
const dummyQuestions = {
    1: {
        id: 1,
        title: "How do I calculate the cap rate for a multi-family property?",
        content: "I'm looking at a 12-unit apartment building and need help understanding how to properly calculate the capitalization rate. The property is listed at $2.5M with a NOI of $180,000. I've heard different methods of calculation and would appreciate some clarity on the best approach. Additionally, what would be considered a good cap rate for this type of property in today's market?",
        author: "JohnDoe",
        date: "2024-03-15",
        votes: 25,
        tags: ["Investment", "Multi-Family", "Calculations"],
        answers: [
            {
                id: 1,
                content: "The cap rate is calculated by dividing the Net Operating Income (NOI) by the property's market value or acquisition cost. In your case:\n\nCap Rate = $180,000 / $2,500,000 = 0.072 or 7.2%\n\nFor multi-family properties in most markets, a cap rate between 4-10% is typical. 7.2% is generally considered good in many markets.",
                author: "RealEstateExpert",
                date: "2024-03-15",
                votes: 15,
                isAccepted: true
            },
            {
                id: 2,
                content: "Make sure your NOI calculation includes all operating expenses: property management, maintenance, property taxes, insurance, utilities, etc. The accuracy of the cap rate depends on having accurate NOI figures.",
                author: "PropertyManager",
                date: "2024-03-16",
                votes: 8,
                isAccepted: false
            }
        ]
    },
    2: {
        id: 2,
        title: "What are the key factors to consider in a home inspection?",
        content: "First-time homebuyer here. What should I be particularly careful about during the home inspection process? Are there any red flags I should be especially aware of?",
        author: "HomeSeeker",
        date: "2024-03-14",
        votes: 42,
        tags: ["Home Inspection", "First Time Buyer", "Due Diligence"],
        answers: [
            {
                id: 3,
                content: "Key areas to focus on during a home inspection:\n\n1. Foundation issues\n2. Roof condition and age\n3. Electrical system\n4. Plumbing system\n5. HVAC system\n6. Signs of water damage\n7. Pest infestations\n\nMake sure to attend the inspection and ask questions!",
                author: "HomeInspector",
                date: "2024-03-14",
                votes: 20,
                isAccepted: true
            }
        ]
    }
}

export default function QuestionDetail() {
    const params = useParams()
    const questionId = Number(params?.id)
    const question = dummyQuestions[questionId as keyof typeof dummyQuestions]
    const [newAnswer, setNewAnswer] = useState('')

    const handleSubmitAnswer = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement answer submission
        console.log('Answer submitted:', newAnswer)
        setNewAnswer('')
    }

    if (!question) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold">Question not found</h1>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-4 flex items-center gap-2 hover:bg-gray-100"
                    onClick={() => window.location.href = '/questions'}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Questions
                </Button>

                {/* Question Section */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            {/* Voting */}
                            <div className="flex flex-col items-center gap-2">
                                <Button variant="ghost" size="sm">
                                    <ArrowUpCircle className="h-6 w-6 text-gray-500 hover:text-[#FF4D00]" />
                                </Button>
                                <span className="font-bold">{question.votes}</span>
                                <Button variant="ghost" size="sm">
                                    <ArrowDownCircle className="h-6 w-6 text-gray-500 hover:text-[#5900B3]" />
                                </Button>
                            </div>

                            {/* Question Content */}
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
                                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{question.content}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {question.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Question Metadata */}
                                <div className="flex items-center justify-end text-sm text-gray-500">
                                    <span>Asked by {question.author} on {question.date}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Answers Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        {question.answers.length} Answers
                    </h2>

                    {question.answers.map((answer) => (
                        <motion.div
                            key={answer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className={`${answer.isAccepted ? 'border-2 border-green-500' : ''}`}>
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        {/* Answer Voting */}
                                        <div className="flex flex-col items-center gap-2">
                                            <Button variant="ghost" size="sm">
                                                <ArrowUpCircle className="h-6 w-6 text-gray-500 hover:text-[#FF4D00]" />
                                            </Button>
                                            <span className="font-bold">{answer.votes}</span>
                                            <Button variant="ghost" size="sm">
                                                <ArrowDownCircle className="h-6 w-6 text-gray-500 hover:text-[#5900B3]" />
                                            </Button>
                                        </div>

                                        {/* Answer Content */}
                                        <div className="flex-1">
                                            <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>

                                            {/* Answer Metadata */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="text-sm text-gray-500">
                                                    Answered by {answer.author} on {answer.date}
                                                </div>
                                                {answer.isAccepted && (
                                                    <span className="text-green-500 font-semibold flex items-center gap-1">
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Accepted Answer
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Add Answer Form */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
                    <form onSubmit={handleSubmitAnswer}>
                        <Textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            placeholder="Write your answer here..."
                            className="min-h-[200px] mb-4"
                            required
                        />
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#FF4D00] to-[#5900B3] text-white"
                        >
                            Post Your Answer
                        </Button>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
} 