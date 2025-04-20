import React, { useState } from 'react';
import { Globe, ChevronRight, ChevronLeft, Mail, Lock, Smartphone, BarChart3, Clock, Settings, User, Menu, X, CheckCircle, Instagram, Twitter, Eye, PlusCircle, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

const OruWireframes = () => {
    const [currentScreen, setCurrentScreen] = useState('landing');

    const screens = {
        landing: <LandingPage navigate={setCurrentScreen} />,
        signup: <SignupPage navigate={setCurrentScreen} />,
        login: <LoginPage navigate={setCurrentScreen} />,
        onboarding1: <Onboarding1Page navigate={setCurrentScreen} />,
        onboarding2: <Onboarding2Page navigate={setCurrentScreen} />,
        onboarding3: <Onboarding3Page navigate={setCurrentScreen} />,
        dashboard: <DashboardPage navigate={setCurrentScreen} />,
        heatmap: <HeatmapPage navigate={setCurrentScreen} />,
        profile: <ProfilePage navigate={setCurrentScreen} />,
        dataReview: <DataReviewPage navigate={setCurrentScreen} />,
        shortcutSetup: <ShortcutSetupPage navigate={setCurrentScreen} />
    };

    // Navigation buttons for the wireframe viewer
    const NavigationFooter = () => (
        <div className="border-t border-gray-200 p-4 mt-4 flex justify-between">
            <div className="flex space-x-2">
                <button
                    className="px-3 py-1 bg-gray-200 text-black text-xs rounded"
                    onClick={() => setCurrentScreen('landing')}>
                    Landing
                </button>
                <button
                    className="px-3 py-1 bg-gray-200 text-black text-xs rounded"
                    onClick={() => setCurrentScreen('signup')}>
                    Signup
                </button>
                <button
                    className="px-3 py-1 bg-gray-200 text-black text-xs rounded"
                    onClick={() => setCurrentScreen('onboarding1')}>
                    Onboarding
                </button>
                <button
                    className="px-3 py-1 bg-gray-200 text-black text-xs rounded"
                    onClick={() => setCurrentScreen('dashboard')}>
                    Dashboard
                </button>
            </div>
            <div>
                <span className="text-xs text-gray-500">Current: {currentScreen}</span>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Phone Status Bar */}
                <div className="bg-gray-900 text-white p-2 flex justify-between text-xs">
                    <span>9:41 AM</span>
                    <div className="flex space-x-2">
                        <span>5G</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Current Screen */}
                <div className="h-[600px] overflow-y-auto relative">
                    {screens[currentScreen]}
                </div>

                <NavigationFooter />
            </div>
        </div>
    );
};

// Individual screen components
const LandingPage = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">🎯 Oru</h1>
            <button onClick={() => navigate('login')} className="text-sm font-medium">Log In</button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Take control of your digital life</h2>
                <p className="text-gray-600 mb-6">Track when you get distracted to build better habits one tap at a time.</p>

                <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-sm">App Usage Graphic</p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('signup')}
                className="w-full bg-teal-600 text-white rounded-lg py-3 mb-3 font-medium">
                Get Started
            </button>
            <button
                onClick={() => navigate('login')}
                className="w-full border border-gray-300 rounded-lg py-3 text-gray-700 font-medium">
                Already have an account?
            </button>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Eye size={20} className="text-teal-600" />
                    </div>
                    <p className="text-xs">Awareness</p>
                </div>
                <div className="text-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BarChart3 size={20} className="text-teal-600" />
                    </div>
                    <p className="text-xs">Insights</p>
                </div>
                <div className="text-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <TrendingUp size={20} className="text-teal-600" />
                    </div>
                    <p className="text-xs">Progress</p>
                </div>
            </div>
        </div>
    </div>
);

const SignupPage = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="mb-8">
            <button onClick={() => navigate('landing')} className="flex items-center text-gray-500">
                <ChevronLeft size={20} />
                <span>Back</span>
            </button>
        </div>

        <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-4">Create your account</h1>
            <p className="text-gray-600 mb-6">Start tracking your digital habits and gain insights.</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg"
                            placeholder="••••••••"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            </form>
        </div>

        <div className="mt-6">
            <button
                onClick={() => navigate('onboarding1')}
                className="w-full bg-teal-600 text-white rounded-lg py-3 font-medium">
                Create Account
            </button>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Already have an account? <a onClick={() => navigate('login')} className="text-teal-600 font-medium cursor-pointer">Log in</a>
                </p>
            </div>
        </div>
    </div>
);

const LoginPage = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="mb-8">
            <button onClick={() => navigate('landing')} className="flex items-center text-gray-500">
                <ChevronLeft size={20} />
                <span>Back</span>
            </button>
        </div>

        <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
            <p className="text-gray-600 mb-6">Log in to continue your digital wellbeing journey.</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex justify-end mt-1">
                        <a className="text-xs text-teal-600">Forgot password?</a>
                    </div>
                </div>
            </form>
        </div>

        <div className="mt-6">
            <button
                onClick={() => navigate('dashboard')}
                className="w-full bg-teal-600 text-white rounded-lg py-3 font-medium">
                Log In
            </button>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account? <a onClick={() => navigate('signup')} className="text-teal-600 font-medium cursor-pointer">Sign up</a>
                </p>
            </div>
        </div>
    </div>
);

const Onboarding1Page = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <button onClick={() => navigate('dashboard')} className="text-sm text-gray-500">Skip</button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mb-8">
                <Eye size={48} className="text-teal-600" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Track Your Distractions</h2>
            <p className="text-gray-600 mb-6">Oru helps you become aware of when you're getting distracted by apps like Instagram, TikTok, and more.</p>
        </div>

        <div className="mt-6">
            <button
                onClick={() => navigate('onboarding2')}
                className="w-full bg-teal-600 text-white rounded-lg py-3 font-medium">
                Next
            </button>
        </div>
    </div>
);

const Onboarding2Page = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <button onClick={() => navigate('dashboard')} className="text-sm text-gray-500">Skip</button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mb-8">
                <BarChart3 size={48} className="text-teal-600" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Discover Your Patterns</h2>
            <p className="text-gray-600 mb-6">See which apps distract you most and what times of day you're most vulnerable to distraction.</p>
        </div>

        <div className="mt-6 flex space-x-3">
            <button
                onClick={() => navigate('onboarding1')}
                className="w-1/3 border border-gray-300 rounded-lg py-3 font-medium">
                Back
            </button>
            <button
                onClick={() => navigate('onboarding3')}
                className="w-2/3 bg-teal-600 text-white rounded-lg py-3 font-medium">
                Next
            </button>
        </div>
    </div>
);

const Onboarding3Page = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
            </div>
            <button onClick={() => navigate('dashboard')} className="text-sm text-gray-500">Skip</button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mb-8">
                <Smartphone size={48} className="text-teal-600" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Set Up Your Shortcut</h2>
            <p className="text-gray-600 mb-6">Let's set up an iOS shortcut to make logging distractions simple with just one tap.</p>
        </div>

        <div className="mt-6 flex space-x-3">
            <button
                onClick={() => navigate('onboarding2')}
                className="w-1/3 border border-gray-300 rounded-lg py-3 font-medium">
                Back
            </button>
            <button
                onClick={() => navigate('shortcutSetup')}
                className="w-2/3 bg-teal-600 text-white rounded-lg py-3 font-medium">
                Set Up Shortcut
            </button>
        </div>
    </div>
);

const ShortcutSetupPage = ({ navigate }) => (
    <div className="p-4 h-full flex flex-col">
        <div className="mb-6">
            <button onClick={() => navigate('onboarding3')} className="flex items-center text-gray-500">
                <ChevronLeft size={20} />
                <span>Back</span>
            </button>
        </div>

        <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-4">Configure Your Shortcut</h1>
            <p className="text-gray-600 mb-6">Select which apps you want to track.</p>

            <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Apps to Track</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">Instagram</div>
                    <div className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">TikTok</div>
                    <div className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">Twitter</div>
                    <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium">Facebook</div>
                    <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium">YouTube</div>
                    <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium">LinkedIn</div>
                    <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium">Reddit</div>
                    <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-center flex items-center">
                        <PlusCircle size={14} className="mr-1" />
                        <span>Add Custom</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Delay Between Logs</h2>
                <p className="text-sm text-gray-600 mb-2">We'll wait this long before allowing another distraction to be logged for the same app.</p>
                <div className="flex items-center space-x-2">
                    <input type="range" className="w-full" />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 min</span>
                    <span>3 min</span>
                    <span>5 min</span>
                    <span>10 min</span>
                </div>
            </div>
        </div>

        <div className="mt-6">
            <button
                onClick={() => navigate('dashboard')}
                className="w-full bg-teal-600 text-white rounded-lg py-3 font-medium">
                Generate Shortcut
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
                This will download an iOS shortcut file that you'll need to add to your home screen.
            </p>
        </div>
    </div>
);

const DashboardPage = ({ navigate }) => (
    <div className="h-full flex flex-col">
        <div className="bg-teal-600 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">🎯 Dashboard</h1>
                <div className="flex space-x-3">
                    <button>
                        <Calendar size={20} />
                    </button>
                    <button onClick={() => navigate('profile')}>
                        <User size={20} />
                    </button>
                </div>
            </div>

            <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3 flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium">Today's Distractions</p>
                    <h2 className="text-2xl font-bold">4</h2>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium">Weekly Average</p>
                    <h2 className="text-xl font-bold">6.2</h2>
                </div>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
            <h2 className="text-lg font-medium mb-3">Most Distracting Apps</h2>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="h-40 bg-gray-100 rounded flex items-center justify-center mb-2">
                    <p className="text-gray-500 text-sm">Bar Chart Visualization</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-teal-600 rounded-sm mr-1"></div>
                        <span>Instagram (42%)</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-teal-400 rounded-sm mr-1"></div>
                        <span>TikTok (28%)</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-teal-200 rounded-sm mr-1"></div>
                        <span>Twitter (18%)</span>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-medium mb-3">Daily Trends</h2>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="h-40 bg-gray-100 rounded flex items-center justify-center mb-2">
                    <p className="text-gray-500 text-sm">Line Chart Visualization</p>
                </div>
                <p className="text-sm text-gray-600">Your distractions have decreased by 24% this week.</p>
            </div>

            <h2 className="text-lg font-medium mb-3 flex justify-between items-center">
                <span>Distraction Heatmap</span>
                <button onClick={() => navigate('heatmap')} className="text-sm text-teal-600 font-medium">View Full</button>
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="h-40 bg-gray-100 rounded flex items-center justify-center mb-2">
                    <p className="text-gray-500 text-sm">Heatmap Visualization</p>
                </div>
                <p className="text-sm text-gray-600">You're most distracted on weekdays between 8-10 AM.</p>
            </div>

            <h2 className="text-lg font-medium mb-3">Recent Distractions</h2>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                <Instagram size={16} className="text-pink-600" />
                            </div>
                            <span className="font-medium">Instagram</span>
                        </div>
                        <span className="text-sm text-gray-500">10:32 AM</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <Twitter size={16} className="text-blue-500" />
                            </div>
                            <span className="font-medium">Twitter</span>
                        </div>
                        <span className="text-sm text-gray-500">9:15 AM</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                <Instagram size={16} className="text-pink-600" />
                            </div>
                            <span className="font-medium">Instagram</span>
                        </div>
                        <span className="text-sm text-gray-500">Yesterday, 8:47 PM</span>
                    </div>
                </div>

                <button onClick={() => navigate('dataReview')} className="w-full text-center text-teal-600 font-medium text-sm mt-4">
                    View All
                </button>
            </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
            <button className="w-full bg-teal-600 text-white rounded-lg py-3 font-medium flex items-center justify-center">
                <AlertCircle size={16} className="mr-2" />
                <span>Log Distraction</span>
            </button>
        </div>
    </div>
);

const HeatmapPage = ({ navigate }) => (
    <div className="h-full flex flex-col">
        <div className="bg-teal-600 text-white p-4">
            <div className="flex items-center">
                <button onClick={() => navigate('dashboard')} className="mr-2">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Distraction Heatmap</h1>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
            <p className="text-gray-600 mb-4">See when you're most likely to get distracted throughout the week.</p>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                        <div className="grid grid-cols-[auto_repeat(24,1fr)]">
                            {/* Header row */}
                            <div className="font-medium p-2"></div>
                            {Array.from({ length: 24 }, (_, i) => (
                                <div key={i} className="text-xs p-1 text-center bg-gray-50 border-b">
                                    {i === 0 ? '12a' : i === 12 ? '12p' : i > 12 ? `${i - 12}p` : `${i}a`}
                                </div>
                            ))}

                            {/* Data rows */}
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <React.Fragment key={day}>
                                    <div className="font-medium p-2 border-b">{day}</div>
                                    {Array.from({ length: 24 }, (_, hour) => {
                                        // Apply different color intensities based on mock data
                                        let bgColor = 'bg-gray-100';
                                        if (day === 'Mon' && hour === 9) bgColor = 'bg-teal-800 text-white';
                                        if (day === 'Mon' && hour === 8) bgColor = 'bg-teal-700 text-white';
                                        if (day === 'Tue' && hour === 9) bgColor = 'bg-teal-700 text-white';
                                        if (day === 'Wed' && hour === 19) bgColor = 'bg-teal-600 text-white';
                                        if (day === 'Thu' && hour === 20) bgColor = 'bg-teal-600 text-white';
                                        if (day === 'Fri' && hour === 16) bgColor = 'bg-teal-500 text-white';
                                        if (day === 'Sat' && hour === 11) bgColor = 'bg-teal-400';
                                        if (day === 'Sun' && hour === 15) bgColor = 'bg-teal-300';

                                        // Add more common distraction times with less intensity
                                        if ((day === 'Mon' || day === 'Tue' || day === 'Wed' || day === 'Thu' || day === 'Fri') && (hour === 7 || hour === 10)) {
                                            bgColor = 'bg-teal-300';
                                        }
                                        if ((day === 'Sat' || day === 'Sun') && (hour === 14 || hour === 16)) {
                                            bgColor = 'bg-teal-200';
                                        }

                                        return (
                                            <div
                                                key={hour}
                                                className={`border border-white text-xs text-center p-1 ${bgColor}`}
                                            >
                                                {bgColor.includes('teal-7') || bgColor.includes('teal-8') ? '3' :
                                                    bgColor.includes('teal-6') ? '2' :
                                                        bgColor.includes('teal-5') ? '2' :
                                                            bgColor.includes('teal-4') || bgColor.includes('teal-3') ? '1' : ''}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-100 mr-1"></div>
                            <span className="text-xs">0</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-teal-300 mr-1"></div>
                            <span className="text-xs">1</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-teal-500 text-white mr-1 flex items-center justify-center"><span className="text-xs">2</span></div>
                            <span className="text-xs">2</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-teal-700 text-white mr-1 flex items-center justify-center"><span className="text-xs">3</span></div>
                            <span className="text-xs">3+</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="font-medium mb-2">Top Patterns</h2>
                <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                        <div className="w-4 h-4 bg-teal-700 rounded-full mt-0.5 mr-2"></div>
                        <div>
                            <p className="font-medium">Morning Scroll (8-10 AM on weekdays)</p>
                            <p className="text-gray-600">Your most common distraction pattern, typically with Instagram</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="w-4 h-4 bg-teal-600 rounded-full mt-0.5 mr-2"></div>
                        <div>
                            <p className="font-medium">Evening Check-ins (7-9 PM on weekdays)</p>
                            <p className="text-gray-600">Common distraction times with Twitter and TikTok</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="w-4 h-4 bg-teal-400 rounded-full mt-0.5 mr-2"></div>
                        <div>
                            <p className="font-medium">Weekend Browsing (Midday on weekends)</p>
                            <p className="text-gray-600">Scattered pattern across multiple social apps</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

const ProfilePage = ({ navigate }) => (
    <div className="h-full flex flex-col">
        <div className="bg-teal-600 text-white p-4">
            <div className="flex items-center">
                <button onClick={() => navigate('dashboard')} className="mr-2">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Profile</h1>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
            <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                    <User size={32} className="text-gray-400" />
                </div>
                <div>
                    <h2 className="font-bold text-lg">Alex Chen</h2>
                    <p className="text-gray-600">alex@example.com</p>
                    <p className="text-sm text-gray-500">Member since Apr 2025</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="font-medium mb-4">Account Settings</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <input
                            type="text"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                            value="Alex Chen"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                            value="alex@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                            rows={3}
                            placeholder="Tell us a bit about yourself..."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="font-medium mb-4">Tracking Preferences</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Daily Notification</p>
                            <p className="text-sm text-gray-600">Remind you to check your dashboard</p>
                        </div>
                        <div className="w-12 h-6 bg-teal-600 rounded-full relative flex items-center p-1">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Weekly Summary</p>
                            <p className="text-sm text-gray-600">Get a weekly email with your progress</p>
                        </div>
                        <div className="w-12 h-6 bg-teal-600 rounded-full relative flex items-center p-1">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Data Collection</p>
                            <p className="text-sm text-gray-600">Allow anonymous data for research</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-300 rounded-full relative flex items-center p-1">
                            <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <button className="w-full border border-gray-300 py-2 rounded-lg font-medium">
                    Log Out
                </button>
            </div>
        </div>
    </div>
);

const DataReviewPage = ({ navigate }) => (
    <div className="h-full flex flex-col">
        <div className="bg-teal-600 text-white p-4">
            <div className="flex items-center">
                <button onClick={() => navigate('dashboard')} className="mr-2">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Distraction Log</h1>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="font-medium mb-4">April 20, 2025</h2>

                <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                <Instagram size={16} className="text-pink-600" />
                            </div>
                            <span className="font-medium">Instagram</span>
                        </div>
                        <span className="text-sm text-gray-500">10:32 AM</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <Twitter size={16} className="text-blue-500" />
                            </div>
                            <span className="font-medium">Twitter</span>
                        </div>
                        <span className="text-sm text-gray-500">9:15 AM</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="font-medium mb-4">April 19, 2025</h2>

                <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                <Instagram size={16} className="text-pink-600" />
                            </div>
                            <span className="font-medium">Instagram</span>
                        </div>
                        <span className="text-sm text-gray-500">8:47 PM</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                <Instagram size={16} className="text-pink-600" />
                            </div>
                            <span className="font-medium">Instagram</span>
                        </div>
                        <span className="text-sm text-gray-500">5:23 PM</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <Twitter size={16} className="text-blue-500" />
                            </div>
                            <span className="font-medium">Twitter</span>
                        </div>
                        <span className="text-sm text-gray-500">1:04 PM</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                <div className="text-red-500 text-xs font-bold">TT</div>
                            </div>
                            <span className="font-medium">TikTok</span>
                        </div>
                        <span className="text-sm text-gray-500">9:18 AM</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Insights</h2>
                    <button className="text-sm text-teal-600">Filter</button>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <TrendingUp size={16} className="text-teal-600" />
                        </div>
                        <div>
                            <p className="font-medium">Morning Instagram Check</p>
                            <p className="text-gray-600">You're consistently checking Instagram in the morning between 8-10 AM.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <TrendingUp size={16} className="text-teal-600" />
                        </div>
                        <div>
                            <p className="font-medium">Consistent Progress</p>
                            <p className="text-gray-600">Your total distractions have decreased by 18% compared to last week.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default OruWireframes;