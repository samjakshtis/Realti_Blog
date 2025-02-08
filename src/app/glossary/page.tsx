'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Lottie from 'lottie-react';
import { Info, Search } from 'lucide-react';
import { ReactElement } from 'react';
import { supabase } from '@/lib/supabase';

interface GlossaryItem {
    Term: string;
    Definition: string;
    Icon: ReactElement;
}

const Glossery: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [glossaryData, setGlossaryData] = useState<GlossaryItem[]>([]);

    useEffect(() => {
        const fetchGlossary = async () => {
            const { data, error } = await supabase.from('glossary').select('*');
            if (error) console.error('Error fetching glossary:', error);
            else setGlossaryData(data);
        };
        fetchGlossary();
    }, []);


    const filteredGlossary = glossaryData.filter(item =>
        (item.Term && item.Term.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Definition && item.Definition.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const highlightMatch = (text: string, term: string) => {
        if (typeof text !== 'string') return text; // Ensure text is a string
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === term.toLowerCase() ? (
                        <span key={index} className="bg-yellow-200">{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <MainLayout>
            <section className="w-full bg-transparent py-16 shadow-lg dark:bg-gray-900 flex flex-row justify-between">
                <div className="container mx-auto px-8 flex flex-col">
                    <div className="flex items-center justify-center">
                        <motion.h1
                            className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-8 text-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            Glossary
                        </motion.h1>
                        {/* <Lottie
                            animationData={require('@/assets/lottie/animation.json')}
                            loop
                            autoplay
                            className="ml-4 w-20 h-20"
                        /> */}
                    </div>
                    <div className="flex items-center justify-center h-16 mb-5">
                        <div className="relative mx-auto w-full max-w-xl">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Search for a term..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 outline-stone-950 pl-10"
                                aria-label="Search glossary terms"
                            />
                        </div>
                    </div>
                    {filteredGlossary.length === 0 && (
                        <p className="text-center text-gray-500">No terms match your search.</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredGlossary.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md glossary-card text-center
                                relative overflow-hidden transition-all duration-300 hover:scale-105
                                hover:shadow-[0_0_15px_rgba(219,39,119,0.3)]"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    {item.Icon} {/* Displaying the unique icon for each card */}
                                </div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    {highlightMatch(item.Term, searchTerm)}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-400">
                                    {highlightMatch(item.Definition, searchTerm)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Glossery;
