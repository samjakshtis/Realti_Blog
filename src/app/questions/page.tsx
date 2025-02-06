"use client"

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, MessageCircle, Tag, Search } from 'lucide-react';
import Link from 'next/link';
import QuestionForm from './question_form'

interface Question {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    votes: number;
    answers: number;
    tags: string[];
}

const dummyQuestions: Question[] = [
    {
        id: 1,
        title: "How do I calculate the cap rate for a multi-family property?",
        content: "I'm looking at a 12-unit apartment building and need help understanding how to properly calculate the capitalization rate...",
        author: "JohnDoe",
        date: "2024-03-15",
        votes: 25,
        answers: 8,
        tags: ["Investment", "Multi-Family", "Calculations"]
    },
    {
        id: 2,
        title: "What are the key factors to consider in a home inspection?",
        content: "First-time homebuyer here. What should I be particularly careful about during the home inspection process?",
        author: "HomeSeeker",
        date: "2024-03-14",
        votes: 42,
        answers: 12,
        tags: ["Home Inspection", "First Time Buyer", "Due Diligence"]
    },
    // Add more dummy questions as needed
];

export default function Questions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

    const filteredQuestions = dummyQuestions.filter(question => {
        const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? question.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    const allTags = Array.from(new Set(dummyQuestions.flatMap(q => q.tags)));

    return (
        <MainLayout>
            <QuestionForm
                isOpen={isQuestionFormOpen}
                onClose={() => setIsQuestionFormOpen(false)}
            />
            <section className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Real Estate Questions</h1>
                        <p className="text-gray-600">Get answers from experienced real estate professionals</p>
                    </div>
                    <Button
                        className="mt-4 md:mt-0 bg-gradient-to-r from-[#EC6227] via-[#E80458] to-[#5900B3] hover:from-[#E80458] hover:to-[#4A0099]"
                        onClick={() => setIsQuestionFormOpen(true)}
                    >
                        Ask a Question
                    </Button>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Search questions..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className="flex items-center gap-1"
                                >
                                    <Tag className="h-4 w-4" />
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                        <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="hover:shadow-lg transition-shadow">
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
                                            <Link href={`/questions/${question.id}`} className="block">
                                                <h2 className="text-xl font-semibold mb-2 hover:text-[#FF4D00]">
                                                    {question.title}
                                                </h2>
                                            </Link>
                                            <p className="text-gray-600 mb-4">{question.content}</p>

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

                                            {/* Metadata */}
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center gap-4">
                                                    <span>Asked by {question.author}</span>
                                                    <span>{question.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MessageCircle className="h-5 w-5" />
                                                    <span>{question.answers} answers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}