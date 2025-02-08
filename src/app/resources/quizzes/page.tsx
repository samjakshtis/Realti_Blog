"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface Question {
    id: number;
    question: string;
    options: { id: number; option_text: string }[];
    correct_option_id: number;
}

export default function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Fetch quizzes on page load
    useEffect(() => {
        const fetchQuizzes = async () => {
            const { data, error } = await supabase.from("quizzes").select("*");
            if (error) console.error("Error fetching quizzes:", error);
            else setQuizzes(data);
        };
        fetchQuizzes();
    }, []);

    // Fetch questions & options when a quiz is selected
    useEffect(() => {
        if (selectedQuiz !== null) {
            console.log(selectedQuiz);
            const fetchQuestions = async () => {
                const { data: questionsData, error: questionsError } = await supabase
                    .from("questions")
                    .select("*")
                    .eq("quiz_id", selectedQuiz);

                console.log("questionsData", questionsData);

                if (questionsError) {
                    console.error("Error fetching questions:", questionsError);
                    return;
                }

                // Fetch options for all questions
                const questionIds = questionsData.map((q) => q.id);
                const { data: optionsData, error: optionsError } = await supabase
                    .from("options")
                    .select("*")
                    .in("question_id", questionIds);

                console.log("optionsData", optionsData);

                const { data: correctAnswersData, error: correctAnswersError } =
                    await supabase.from("correct_answers").select("*");

                if (optionsError || correctAnswersError) {
                    console.error("Error fetching options or correct answers");
                    return;
                }

                // Merge questions with options and correct answers
                const enrichedQuestions = questionsData.map((q) => ({
                    id: q.id,
                    question: q.question,
                    options: optionsData.filter((opt) => opt.question_id === q.id),
                    correct_option_id: correctAnswersData.find(
                        (ca) => ca.question_id === q.id
                    )?.correct_option_id,
                }));

                setQuestions(enrichedQuestions);
                setCurrentQuestionIndex(0);
                setQuizCompleted(false);
                setScore(0);
            };

            fetchQuestions();
        }
    }, [selectedQuiz]);

    const handleAnswerSelect = (optionId: number) => {
        setSelectedAnswer(optionId);
        setIsCorrect(null);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            // Check if the answer is correct
            const correct = selectedAnswer === questions[currentQuestionIndex].correct_option_id;
            setIsCorrect(correct);

            if (correct) {
                setScore((prev) => prev + 1);
            }

            // Move to next question or finish quiz
            if (currentQuestionIndex + 1 < questions.length) {
                setTimeout(() => {
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                }, 1000);
            } else {
                setTimeout(() => {
                    setQuizCompleted(true);
                }, 1000);
            }
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Real Estate Quizzes</h1>

                {/* Quiz Selection */}
                {!selectedQuiz ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="p-6 border rounded-lg shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
                                <p className="mb-4">{quiz.description}</p>
                                <Button
                                    onClick={() => setSelectedQuiz(quiz.id)}
                                    className="w-full bg-gradient-to-r from-[#FF4D00] to-[#5900B3]"
                                >
                                    Start Quiz
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <Button onClick={() => setSelectedQuiz(null)} className="mb-8" variant="outline">
                            Back to Quizzes
                        </Button>

                        {/* Show quiz results */}
                        {quizCompleted ? (
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                                <p className="text-xl">Your Score: {score} / {questions.length}</p>
                                <Button onClick={() => setSelectedQuiz(null)} className="mt-4">
                                    Try Another Quiz
                                </Button>
                            </div>
                        ) : (
                            // Show current question
                            <div className="p-6 border rounded-lg shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">
                                    Question {currentQuestionIndex + 1}/{questions.length}
                                </h2>
                                {questions.length > 0 && currentQuestionIndex < questions.length ? (
                                    <p className="mb-4">{questions[currentQuestionIndex].question}</p>
                                ) : (
                                    <p className="mb-4">Loading question...</p>
                                )}

                                {/* Options */}
                                <div className="grid gap-3">
                                    {questions.length > 0 && questions[currentQuestionIndex] ? (
                                        questions[currentQuestionIndex].options.map((option) => (
                                            <Button
                                                key={option.id}
                                                onClick={() => handleAnswerSelect(option.id)}
                                                className={`w-full transition-colors duration-500 ${selectedAnswer === option.id
                                                        ? isCorrect === null
                                                            ? "bg-blue-500 text-white"
                                                            : isCorrect
                                                                ? "bg-green-500 text-white"
                                                                : "bg-red-500 text-white"
                                                        : ""
                                                    }`}
                                            >
                                                {option.option_text}
                                            </Button>
                                        ))
                                    ) : (
                                        <p>Loading options...</p>
                                    )}
                                </div>

                                {/* Next Question */}
                                <Button
                                    onClick={handleNextQuestion}
                                    disabled={selectedAnswer === null}
                                    className="mt-6 w-full bg-purple-500 text-white"
                                >
                                    {currentQuestionIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
