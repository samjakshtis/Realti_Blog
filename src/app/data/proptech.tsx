import React from 'react';

const PropTech = () => {
    return (
        <div className="coming-soon-container text-center mx-auto max-w-4xl py-10">
            <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#EC6227] via-[#E80458] to-[#5900B3] w-max mx-auto mb-4">PropTech</h1>
            <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
            <p className="mb-8">We're working hard to build out the best property technology database in the world. Stay tuned!</p>
            {/* <div className="subscribe-form flex flex-col items-center">
                <input type="email" placeholder="Enter your email" className="mb-4 p-2 border border-gray-300 rounded-md w-full" />
                <button
                    className="bg-gradient-to-r from-[#E80458] via-[#FF4D00] to-[#5900B3] hover:from-[#FF4D00] hover:to-[#E80458] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Notify Me
                </button>
            </div> */}
        </div>
    );
};

export default PropTech;