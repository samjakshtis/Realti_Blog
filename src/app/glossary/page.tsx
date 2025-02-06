'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Lottie from 'lottie-react';
import { Info, Search } from 'lucide-react';
import { ReactElement } from 'react';
interface GlossaryItem {
    term: string;
    definition: string;
    icon: ReactElement;
}

const Glossery: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const glossaryData: GlossaryItem[] = [
        { term: "Appraisal", definition: "An estimate of the value of a property.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Assessment", definition: "The value of a property for taxation purposes.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Closing", definition: "The final step in the home buying process where ownership is transferred.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Deed", definition: "A legal document that transfers ownership of a property.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Equity", definition: "The difference between the market value of a property and the amount owed on it.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Escrow", definition: "A third-party account that holds funds until a transaction is complete.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Foreclosure", definition: "The process of taking possession of a property due to loan default.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Mortgage", definition: "A loan to purchase a property, using the property as collateral.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Title", definition: "A document that proves ownership of a property.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Zoning", definition: "Local laws that regulate how a property can be used.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Amortization", definition: "The process of gradually paying off a debt, such as a mortgage.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Broker", definition: "A licensed professional who represents buyers or sellers in a real estate transaction.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Commission", definition: "A fee paid to a broker or agent for their services in a real estate transaction.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Contingency", definition: "A condition that must be met before a real estate contract is binding.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Earnest Money", definition: "A deposit made by a buyer to show their commitment to purchasing a property.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Inspection", definition: "An examination of a property to identify any potential issues or defects.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Lien", definition: "A legal claim on a property for an unpaid debt or obligation.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Refinance", definition: "The process of replacing an existing mortgage with a new one, often to secure a better interest rate.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Survey", definition: "A detailed measurement of a property's boundaries and features.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Adjustable-Rate Mortgage", definition: "A mortgage with an interest rate that can change over time.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Annual Percentage Rate (APR)", definition: "The total cost of a loan, including interest and fees, expressed as a yearly rate.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Appraisal Fee", definition: "A fee paid for an appraisal of a property's value.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Closing Costs", definition: "Fees associated with the closing of a real estate transaction.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Credit Score", definition: "A numerical score that represents an individual's creditworthiness.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Down Payment", definition: "A portion of the purchase price paid upfront.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Fixed-Rate Mortgage", definition: "A mortgage with an interest rate that remains the same for the entire term.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Home Inspection", definition: "A thorough examination of a property's condition before purchase.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Interest Rate", definition: "The percentage of the loan amount charged as interest over a year.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Loan-to-Value (LTV) Ratio", definition: "The percentage of the property's value borrowed through a mortgage.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Mortgage Insurance", definition: "Insurance that protects the lender in case of borrower default.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Pre-Approval", definition: "A lender's estimate of how much a borrower can afford to spend on a property.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Pre-Qualification", definition: "An estimate of how much a borrower can afford to spend on a property, based on a brief review of their finances.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Private Mortgage Insurance (PMI)", definition: "Insurance that protects the lender in case of borrower default, typically required for mortgages with a high LTV ratio.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Property Tax", definition: "A tax levied on real estate by local governments.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Real Estate Agent", definition: "A licensed professional who represents buyers or sellers in a real estate transaction.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
        { term: "Title Insurance", definition: "Insurance that protects against losses due to defects in the title of a property.", icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-200" /> },
    ];

    const filteredGlossary = glossaryData.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const highlightMatch = (text: string, term: string) => {
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
                                    {item.icon} {/* Displaying the unique icon for each card */}
                                </div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    {highlightMatch(item.term, searchTerm)}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-400">
                                    {item.definition}
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
