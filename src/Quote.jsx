import { useEffect, useState } from 'react';

const Quote = () => {
    const [quoteText, setQuoteText] = useState("");
    const [author, setAuthor] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

    const getQuote = async () => {
        try {
            const response = await fetch("https://quotes.rest/");
            // https://api.quotable.io/random
            const data = await response.json();

            const { content, author } = data;
            setQuoteText(`"${content}"`);
            setAuthor(author);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getQuote();
    }, []);

    // Toggle dark and light mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        // You can also store the preference in localStorage for persistence across sessions
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    return (
        <div
            className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
        >
            <div
                className={`w-96 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105`}
            >
                <h1 className={`text-4xl text-center font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                    Quote of the Day
                </h1>

                <p
                    className={`text-xl text-center font-serif italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}
                >
                    {quoteText}
                </p>

                <p className={`text-lg text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-700'}`}>
                    - {author}
                </p>

                <div className='mt-8 flex justify-center gap-4'>
                    <button
                        className={`text-white ${isDarkMode ? 'bg-blue-600' : 'bg-blue-400'} p-4 rounded-full font-semibold shadow-md transform transition-all duration-300 ease-in-out hover:scale-105`}
                        onClick={getQuote}
                    >
                        Get New Quote
                    </button>
                    <button
                        className={`text-white ${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-400'} p-4 rounded-full font-semibold shadow-md transform transition-all duration-300 ease-in-out hover:scale-105`}
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quote;
