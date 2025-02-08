import React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import RealtiLogo from "@/assets/Realti.png"
import HouseImage from "@/assets/House.svg"
import { StaticImageData } from "next/image"

interface HeroContentProps {
    logo?: StaticImageData;
    headline?: string;
    motto?: string;
    description_title?: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

const HeroSection = ({
    logo = RealtiLogo,
    headline = "Welcome to Realti",
    motto = "A friendly and accessible platform dedicated to empowering you with real estate knowledge.",
    description_title = "Unlock the Tools, Knowledge, and Community You Need",
    description = "Whether you're buying your first home or expanding your investment portfolio, Realti provides courses, tools, and expert insights to help you make confident real estate decisions.",
    ctaText = "Start Learning Now",
    onCtaClick = () => console.log("CTA clicked"),
}: HeroContentProps) => {

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="w-full min-h-[70vh] bg-transparent relative py-16">
            <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between">
                {/* Left Column - Content */}
                <motion.div
                    className="flex flex-col space-y-6 text-center lg:text-left lg:w-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={logo}
                            alt="Realti Logo"
                            width={144}
                            height={144}
                        />
                    </motion.div>
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {headline}
                    </motion.h1>
                    <motion.h2
                        className="text-xl sm:text-2xl text-gray-100 max-w-xl leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4D00] to-[#5900B3]">{motto}</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {description}
                    </motion.p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-gradient-to-r from-[#FF4D00] to-[#5900B3] hover:from-[#E80458] hover:to-[#4A0099] text-white px-8 py-4 rounded-lg text-lg font-bold"
                            onClick={scrollToFeatures}
                        >
                            {ctaText}
                        </Button>
                        <Button
                            size="lg"
                            className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-8 py-4 rounded-lg bg-black text-white text-lg font-bold"
                            onClick={scrollToContact}
                        >
                            Contact Us
                        </Button>
                    </div>
                </motion.div>

                {/* Right Column - Image */}
                <motion.div
                    className="relative mt-8 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src={HouseImage}
                        alt="Real Estate Learning"
                        width={600}
                        height={600}
                        className="max-w-full h-auto"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
