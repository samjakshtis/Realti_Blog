"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RealtiLogo from "@/assets/Realti.png";
import { motion } from "framer-motion";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import AuthModal from "@/components/auth/AuthModal"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { User, Settings, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"

const resourcesItems = [
    {
        title: "Questions",
        href: "/questions",
        description: "Frequently asked questions about real estate.",
    },
    {
        title: "Resources",
        href: "/resources",
        description: "Helpful resources and guides for real estate.",
    },
    {
        title: "Glossary",
        href: "/glossary",
        description: "Common real estate terms and definitions.",
    },
    {
        title: "Data",
        href: "/data",
        description: "Real estate market data and analytics.",
    },
    {
        title: "Blog",
        href: "/blog",
        description: "Real estate news and insights.",
    },
    {
        title: "Rent vs Buy",
        href: "/rentvbuy",
        description: "Compare the costs of renting vs buying a home.",
    },
    {
        title: "Quizzes",
        href: "/resources/quizzes",
        description: "Test your real estate knowledge with interactive quizzes.",
    },
    {
        title: "Support Us",
        href: "/resources/support",
        description: "Support our mission by purchasing Realti merchandise.",
    },
]


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user, setUser } = useAuth();


    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error.message)
        }
    }

    const renderAuthButton = () => {
        if (user) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#EC6227] via-[#E80458] to-[#5900B3] group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-50 flex items-center gap-2">
                                {user.user_metadata.avatar_url ? (
                                    <Image
                                        src={user.user_metadata.avatar_url}
                                        alt={user.user_metadata.username}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                {user.user_metadata.username}
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

        return (
            <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#EC6227] via-[#E80458] to-[#5900B3] group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                onClick={() => setIsAuthModalOpen(true)}
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-50">
                    Get Started
                </span>
            </button>
        );
    };

    return (
        <>
            <motion.header
                className="fixed w-full z-50 bg-transparent backdrop-blur-md"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src={RealtiLogo}
                                alt="Realti Logo"
                                width={40}
                                height={40}
                            />
                            <span className="ml-2 text-5xl font-bold text-black align-baseline">Realti</span>
                        </Link>

                        {/* Desktop Navigation - Updated positioning */}
                        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
                            <NavigationMenu>
                                <NavigationMenuList className="space-x-8">
                                    <NavigationMenuItem>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()} style={{ fontSize: '1em' }}>
                                                Home
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger style={{ fontSize: '1em' }}>Resources</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {resourcesItems.map((item) => (
                                                    <ListItem
                                                        key={item.title}
                                                        title={item.title}
                                                        href={item.href}
                                                    >
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/about" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()} style={{ fontSize: '1em' }}>
                                                About
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </nav>

                        {/* Auth Button - Moved to separate div */}
                        <div className="hidden md:block">
                            {renderAuthButton()}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-black"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <motion.nav
                            className="md:hidden mt-4 pb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link
                                href="/"
                                className="block py-2 text-black hover:text-[#FF4D00] transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/questions"
                                className="block py-2 text-black hover:text-[#FF4D00] transition-colors"
                            >
                                Questions
                            </Link>
                            <Link
                                href="/resources"
                                className="block py-2 text-black hover:text-[#FF4D00] transition-colors"
                            >
                                Resources
                            </Link>
                            <Link
                                href="/about"
                                className="block py-2 text-black hover:text-[#FF4D00] transition-colors"
                            >
                                About
                            </Link>
                            <Button
                                className="w-full mt-4 bg-gradient-to-r from-[#FF4D00] to-[#5900B3] hover:from-[#E80458] hover:to-[#4A0099] text-white"
                            >
                                Get Started
                            </Button>
                        </motion.nav>
                    )}
                </div>
            </motion.header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
};

export default Header;
