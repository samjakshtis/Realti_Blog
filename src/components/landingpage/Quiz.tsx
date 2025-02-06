'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Question {
    id: number
    text: string
    options: string[]
    correctAnswer: number
}

const questions: Question[] = [
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
    {
        id: 2,
        text: "What does 'ROI' stand for in real estate?",
        options: [
            "Rate of Interest",
            "Return on Investment",
            "Rent or Inhabit",
            "Real Owner Income"
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        text: "What is a 'fixer-upper'?",
        options: [
            "A type of loan",
            "A real estate agent specializing in renovations",
            "A property needing repairs or renovation",
            "A tool used in home inspections"
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        text: "What is 'escrow' in real estate?",
        options: [
            "A type of property tax",
            "A method of painting houses",
            "A third party holding funds during a transaction",
            "A type of real estate license"
        ],
        correctAnswer: 2
    },
    {
        id: 5,
        text: "What is a 'contingency' in a real estate contract?",
        options: [
            "A type of mortgage",
            "A condition that must be met for the contract to be binding",
            "A real estate commission",
            "A type of property ownership"
        ],
        correctAnswer: 1
    }
]

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showAnimation, setShowAnimation] = useState(false)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [incorrectAnswers, setIncorrectAnswers] = useState(0)

    const handleAnswer = (selectedAnswer: number) => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1)
            setCorrectAnswers(correctAnswers + 1)
            setShowAnimation(true)
            setTimeout(() => {
                setShowAnimation(false)
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1)
                } else {
                    setQuizCompleted(true)
                }
            }, 1000)
        } else {
            setIncorrectAnswers(incorrectAnswers + 1)
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
            } else {
                setQuizCompleted(true)
            }
        }
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <section className="bg-transparent py-12">
            <div className="max-w-2xl mx-auto p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Unlock Your Real Estate Knowledge</h1>
                    <p className="text-lg mb-4">Test your understanding of the real estate industry and learn more about the market.</p>
                </div>
                <div className="mb-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative overflow-hidden">
                    <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-[#E80458] via-[#FF4D00] to-[#5900B3]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                {quizCompleted ? (
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">
                                Quiz Completed!
                            </h2>
                            <p className="text-lg mb-4">You got <span className="font-bold text-[#E80458]">{correctAnswers}</span> correct answers out of <span className="font-bold text-[#E80458]">{questions.length}</span> total questions.</p>
                            <Button className="w-full" onClick={() => {
                                setCurrentQuestion(0)
                                setScore(0)
                                setShowAnimation(false)
                                setQuizCompleted(false)
                                setCorrectAnswers(0)
                                setIncorrectAnswers(0)
                            }}>
                                Start Quiz Again
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">
                                Question {currentQuestion + 1} of {questions.length}
                            </h2>
                            <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
                            <div className="space-y-2 rounded-lg p-4">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <Button
                                        key={index}
                                        className="w-full text-left justify-start h-auto py-3 px-4 bg-white text-black outline-2 hover:bg-gray-200 shadow-md hover:shadow-lg rounded-lg"
                                        onClick={() => handleAnswer(index)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
                {showAnimation && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center translate-y-32 bg-transparent bg-opacity-50 z-50"
                    >
                        <div className="bg-white rounded-full p-4">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
