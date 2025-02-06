"use client"

import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    FileQuestion,
    BookOpen,
    MessageSquare,
    Settings,
    BarChart,
    AlertCircle,
    Database
} from 'lucide-react';

interface DashboardItem {
    title: string;
    description: string;
    status?: string;
    date?: string;
    action?: string;
}

export default function AdminDashboard() {
    const [activeCategory, setActiveCategory] = useState('users');

    const usersData: DashboardItem[] = [
        { title: "New Users Today", description: "24 new registrations", status: "Increasing" },
        { title: "Total Active Users", description: "1,234 active users", status: "Stable" },
        { title: "Premium Users", description: "156 premium subscribers", status: "Growing" },
    ];

    const questionsData: DashboardItem[] = [
        { title: "Unanswered Questions", description: "12 questions need attention", status: "Urgent" },
        { title: "Reported Content", description: "3 questions flagged", status: "Pending Review" },
        { title: "Popular Topics", description: "Investment, Mortgages, Market Analysis", status: "Trending" },
    ];

    const contentData: DashboardItem[] = [
        { title: "Recent Articles", description: "8 drafts pending review", date: "Last updated: 2 hours ago" },
        { title: "Resource Updates", description: "4 resources need updating", date: "Last updated: 1 day ago" },
        { title: "New Quiz Submissions", description: "15 new quiz results", date: "Last updated: 30 minutes ago" },
    ];

    const analyticsData: DashboardItem[] = [
        { title: "Page Views", description: "45,678 views this month", status: "↑ 12% increase" },
        { title: "Average Session", description: "4.5 minutes", status: "↓ 3% decrease" },
        { title: "Conversion Rate", description: "2.3% conversion to signup", status: "↑ 5% increase" },
    ];

    const renderContent = () => {
        const dataMap = {
            users: usersData,
            questions: questionsData,
            content: contentData,
            analytics: analyticsData,
        };

        const currentData = dataMap[activeCategory as keyof typeof dataMap];

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentData.map((item, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        {item.status && (
                            <div className={`text-sm ${item.status.includes('↑') ? 'text-green-600' :
                                    item.status.includes('↓') ? 'text-red-600' :
                                        'text-blue-600'
                                }`}>
                                {item.status}
                            </div>
                        )}
                        {item.date && (
                            <div className="text-sm text-gray-500 mt-2">
                                {item.date}
                            </div>
                        )}
                        {item.action && (
                            <Button className="mt-4 w-full" variant="outline">
                                {item.action}
                            </Button>
                        )}
                    </Card>
                ))}
            </div>
        );
    };

    const menuItems = [
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'questions', label: 'Questions & Reports', icon: FileQuestion },
        { id: 'content', label: 'Content Management', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: BarChart },
    ];

    return (
        <MainLayout>
            <div className="flex min-h-screen">
                {/* Admin Sidebar */}
                <div className="w-64 opacity-90 backdrop-blur-sm p-4 shadow-lg fixed rounded-lg m-4 border border-gray-800">
                    <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
                    <div className="flex flex-col space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                className={`p-2 text-left rounded-lg transition-colors flex items-center gap-2
                                    ${activeCategory === item.id
                                        ? 'bg-gradient-to-r from-[#FF4D00] to-[#5900B3] text-white'
                                        : 'hover:bg-gray-200/80'
                                    }`}
                                onClick={() => setActiveCategory(item.id)}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="ml-72 flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Overview
                        </h1>
                        <Button
                            className="bg-gradient-to-r from-[#FF4D00] to-[#5900B3] text-white"
                            onClick={() => console.log("Export data")}
                        >
                            Export Data
                        </Button>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </MainLayout>
    );
} 