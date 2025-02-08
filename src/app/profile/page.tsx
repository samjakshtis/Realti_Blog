'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import MainLayout from '@/components/layout/MainLayout';

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<{ name: string; email: string; location: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase.from('profiles').select('*');
            console.log(data);
            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data[0]);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        } else {
            // Redirect to login page or handle logout success
            console.log('Logged out successfully');
            window.location.href = '/';
        }
    };

    return (
        <MainLayout>
            <div className="max-w-md mx-auto p-6 text-center bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Page</h1>
                {profile ? (
                    <div>
                        <h2 className="text-xl text-gray-700">{profile.name}</h2>
                        <p className="text-gray-600">Email: {profile.email}</p>
                        {/* <p className="text-gray-600">Location: {profile.location}</p> */}
                    </div>
                ) : (
                    <p className="text-gray-500">Loading profile...</p>
                )}
                <button onClick={handleLogout} className="mt-6 px-4 py-2 bg-gradient-to-r from-[#FF4D00] to-[#5900B3] text-white rounded hover:bg-gray-500 transition duration-200">
                    Logout
                </button>
            </div>
        </MainLayout>
    );
};

export default ProfilePage;
