"use client"

import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card } from '@/components/ui/card';
import MapWithGraphs from './map';
import PropTech from './proptech';
import RealEstateDevelopers from './redevelopers';
import Apis from './apis';
interface DataItem {
    title: string;
    description: string;
}

export default function Data() {
    const [activeCategory, setActiveCategory] = useState('Insights');

    const renderContent = () => {
        const dataMap: Record<string, JSX.Element | DataItem[]> = {
            Insights: <MapWithGraphs />,
            proptech: <PropTech />,
            developers: <RealEstateDevelopers />,
            api: <Apis />,
        };

        const currentData = dataMap[activeCategory];

        if (activeCategory === 'Insights' || activeCategory === 'developers' || activeCategory === 'api' || activeCategory === 'proptech') {
            return currentData;
        }


        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(currentData as DataItem[]).map((item, index) => (
                    <Card key={index} className="p-4">
                        <h3 className="font-bold">{item.title}</h3>
                        <p>{item.description}</p>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <MainLayout>
            <div className="flex min-h-screen">
                {/* Updated Floating Sidebar */}
                <div className="w-64 opacity-90 backdrop-blur-sm p-4 shadow-lg fixed rounded-lg m-4 border border-gray-800">
                    <h2 className="text-xl font-bold mb-4">Data Categories</h2>
                    <div className="flex flex-col space-y-2">
                        <button
                            className={`p-2 text-left rounded-lg transition-colors ${activeCategory === 'Insights'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200/80'
                                }`}
                            onClick={() => setActiveCategory('Insights')}
                        >
                            Data Insights
                        </button>
                        <button
                            className={`p-2 text-left rounded-lg transition-colors ${activeCategory === 'proptech'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200/80'
                                }`}
                            onClick={() => setActiveCategory('proptech')}
                        >
                            Property Technology Companies
                        </button>
                        <button
                            className={`p-2 text-left rounded-lg transition-colors ${activeCategory === 'developers'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200/80'
                                }`}
                            onClick={() => setActiveCategory('developers')}
                        >
                            Real Estate Developers
                        </button>
                        <button
                            className={`p-2 text-left rounded-lg transition-colors ${activeCategory === 'api'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200/80'
                                }`}
                            onClick={() => setActiveCategory('api')}
                        >
                            APIs
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="ml-72 flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-6">
                        {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                    </h1>
                    {renderContent()}
                </div>
            </div>
        </MainLayout>
    );
}