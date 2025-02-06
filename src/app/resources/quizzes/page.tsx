"use client"

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Quiz, { Question } from '@/components/quiz/Quiz'
import { Button } from '@/components/ui/button'

const quizzes = {
    realEstate: {
        title: "Real Estate Fundamentals Quiz",
        description: "Test your understanding of basic real estate concepts",
        questions: [
            {
                id: 1,
                text: "What is a mortgage?",
                options: [
                    "A type of house",
                    "A loan to buy a property",
                    "A real estate agent",
                    "A type of insurance"
                ],
                correctAnswer: 1
            },
            // ... other questions
        ]
    },
    investment: {
        title: "Real Estate Investment Quiz",
        description: "Test your knowledge about real estate investment strategies",
        questions: [
            {
                id: 1,
                text: "What does 'ROI' stand for in real estate?",
                options: [
                    "Rate of Interest",
                    "Return on Investment",
                    "Rent or Inhabit",
                    "Real Owner Income"
                ],
                correctAnswer: 1
            },
            // ... other questions
        ]
    },
    // Add more quizzes as needed
}

export default function QuizzesPage() {
    const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Real Estate Quizzes</h1>

                {!selectedQuiz ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(quizzes).map(([key, quiz]) => (
                            <div key={key} className="p-6 border rounded-lg shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
                                <p className="mb-4">{quiz.description}</p>
                                <Button
                                    onClick={() => setSelectedQuiz(key)}
                                    className="w-full bg-gradient-to-r from-[#FF4D00] to-[#5900B3]"
                                >
                                    Start Quiz
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <Button
                            onClick={() => setSelectedQuiz(null)}
                            className="mb-8"
                            variant="outline"
                        >
                            Back to Quizzes
                        </Button>
                        <Quiz {...quizzes[selectedQuiz as keyof typeof quizzes]} />
                    </div>
                )}
            </div>
        </MainLayout>
    )
} 