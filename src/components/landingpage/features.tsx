import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HelpCircle, Calculator, FileText, GraduationCap, Users } from "lucide-react";
import { motion } from 'framer-motion';
import Link from 'next/link';

export function FeaturesSection() {
    const features = [
        {
            icon: BookOpen,
            title: "Comprehensive Glossary",
            content: "Access our extensive real estate glossary with detailed explanations of industry terms and concepts.",
            link: "/glossary"
        },
        {
            icon: HelpCircle,
            title: "Q&A Platform",
            content: "Get answers to your real estate questions from experienced professionals and community members.",
            link: "/questions"
        },
        {
            icon: Calculator,
            title: "Rent vs Buy Calculator",
            content: "Make informed decisions with our interactive calculator that helps compare the costs of renting versus buying.",
            link: "/rentvbuy"
        },
        {
            icon: FileText,
            title: "Resource Library",
            content: "Access articles, books, movies, and newsletters covering various aspects of real estate investment and ownership.",
            link: "/resources"
        },
        {
            icon: GraduationCap,
            title: "Interactive Quizzes",
            content: "Test and improve your real estate knowledge through engaging quizzes covering different topics.",
            link: "/quizzes"
        },
        {
            icon: Users,
            title: "Community Support",
            content: "Join a community of like-minded individuals to share experiences and learn from each other's real estate journeys.",
            link: "/blog"
        },
    ];

    return (
        <section id="features" className="w-full py-8 md:py-16 lg:py-24 flex justify-center items-center">
            <div className="container px-4 md:px-6">
                <motion.h2
                    className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-center mb-8 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, margin: '-50px' }}
                >
                    Our Features
                </motion.h2>
                <div className={`grid gap-8 md:grid-cols-3 justify-items-center`}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                                ease: 'easeOut'
                            }}
                            viewport={{ once: true, margin: '-50px' }}
                            className="w-full p-2"
                        >
                            <Link href={feature.link}>

                                <Card className="group bg-white/50 backdrop-blur-sm h-full p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                                    <CardHeader className="space-y-2 md:space-y-3">
                                        <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-[#FF4D00]" />
                                        <CardTitle className="text-base md:text-lg font-semibold transition-all duration-300 ease-in-out group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#E80458] via-[#FF4D00] to-[#5900B3]">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs md:text-sm text-gray-600">
                                        {feature.content}
                                    </CardContent>
                                </Card>

                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// columnsCountBreakPoints={{ 280: 1, 768: 2, 1024: 3 }}