import { FaTrophy, FaPlay, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const HeroS = () => {
    const navigate = useNavigate();

    return (
        <div>
        <section className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 opacity-20 rounded-full blur-2xl -z-10 animate-pulse"></div>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 w-full">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-tight md:text-6xl xl:text-7xl bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:text-white transition-all duration-300">
                        <span className="inline-flex items-center gap-2">
                            <FaTrophy className="text-yellow-400 animate-bounce" />
                            Ultimate Quiz Application!
                        </span>
                    </h1>
                    <p className="max-w-2xl mb-8 font-light text-gray-700 lg:mb-10 md:text-xl lg:text-2xl dark:text-gray-300 transition-all duration-300">
                        Test your knowledge, challenge your friends, and climb the leaderboard.<br />
                        <span className="font-semibold text-blue-700 dark:text-blue-300">Are you ready to become the quiz master?</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/quiz')}
                            className="inline-flex items-center justify-center px-7 py-4 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-blue-700 to-purple-600 shadow-lg hover:scale-105 hover:from-blue-800 hover:to-purple-700 transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                        >
                            <FaPlay className="mr-2" />
                            Start Quiz
                        </button>
                        <a
                            href="/leaderboard"
                            className="inline-flex items-center justify-center px-7 py-4 text-lg font-bold text-blue-700 border-2 border-blue-400 rounded-xl bg-white hover:bg-blue-50 dark:text-white dark:border-blue-700 dark:bg-gray-800 dark:hover:bg-blue-700 dark:hover:text-white transition-all duration-200"
                        >
                            <FaUsers className="mr-2" />
                            View Leaderboard
                        </a>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
                    <div className="relative">
                        <img
                            src="/view-3d-button.jpg"
                            
                            alt="Quiz Illustration"
                            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-blue-200 dark:border-blue-900"
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-blue-700 dark:text-blue-200 font-semibold text-lg">
                            <FaTrophy />
                            Top Score Awaits!
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}
export default HeroS;