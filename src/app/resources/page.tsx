"use client"

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

// Add interface for Card props
interface CardProps {
    title: string;
    description: string;
}

export default function Resources() {
    const [activeTab, setActiveTab] = useState('articles');

    const articlesData = [
        { title: "Article 1", description: "Description of Article 1" },
        { title: "Article 2", description: "Description of Article 2" },
        { title: "Article 3", description: "Description of Article 3" },
    ];

    const booksData = [
        { title: "Book 1", description: "Description of Book 1" },
        { title: "Book 2", description: "Description of Book 2" },
        { title: "Book 3", description: "Description of Book 3" },
    ];

    const moviesData = [
        { title: "Movie 1", description: "Description of Movie 1" },
        { title: "Movie 2", description: "Description of Movie 2" },
        { title: "Movie 3", description: "Description of Movie 3" },
    ];

    const past_newsletters = [
        { title: "Newsletter 1", description: "Description of Newsletter 1" },
        { title: "Newsletter 2", description: "Description of Newsletter 2" },
        { title: "Newsletter 3", description: "Description of Newsletter 3" },
    ];

    const renderTabContent = () => {
        const commonGridClass = "grid grid-cols-1 md:grid-cols-3 gap-4";

        switch (activeTab) {
            case 'past_newsletters':
                return (
                    <div className={commonGridClass}>
                        {past_newsletters.map((newsletter, index) => (
                            <Card key={index} className="p-4">
                                <h3 className="font-bold">{newsletter.title}</h3>
                                <p>{newsletter.description}</p>
                            </Card>
                        ))}
                    </div>
                );
            case 'articles':
                return (
                    <div className={commonGridClass}>
                        {articlesData.map((article, index) => (
                            <Card key={index} className="p-4">
                                <h3 className="font-bold">{article.title}</h3>
                                <p>{article.description}</p>
                            </Card>
                        ))}
                    </div>
                );
            case 'books':
                return (
                    <div className={commonGridClass}>
                        {booksData.map((book, index) => (
                            <Card key={index} className="p-4">
                                <h3 className="font-bold">{book.title}</h3>
                                <p>{book.description}</p>
                            </Card>
                        ))}
                    </div>
                );
            case 'movies':
                return (
                    <div className={commonGridClass}>
                        {moviesData.map((movie, index) => (
                            <Card key={index} className="p-4">
                                <h3 className="font-bold">{movie.title}</h3>
                                <p>{movie.description}</p>
                            </Card>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Resources</h1>

                {/* Tab Navigation */}
                <div className="flex space-x-4 border-b mb-4">
                    <button
                        className={`pb-2 px-4 ${activeTab === 'past_newsletters' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                        onClick={() => setActiveTab('past_newsletters')}
                    >
                        Past Newsletters
                    </button>
                    <button
                        className={`pb-2 px-4 ${activeTab === 'articles' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        Articles
                    </button>
                    {/* <button
                        className={`pb-2 px-4 ${activeTab === 'books' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                        onClick={() => setActiveTab('books')}
                    >
                        Books
                    </button>
                    <button
                        className={`pb-2 px-4 ${activeTab === 'movies' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                        onClick={() => setActiveTab('movies')}
                    >
                        Movies
                    </button> */}
                </div>

                {/* Tab Content */}
                <div className="mt-4">
                    {renderTabContent()}
                </div>
            </div>
        </MainLayout>
    );
}