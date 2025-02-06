"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check current auth status
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 