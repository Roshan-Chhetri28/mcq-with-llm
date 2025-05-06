import React, { useState } from 'react'
import ResponseRenderer from './ResponseRenderer';
import axios from 'axios';
const AiResponse = ({ questionData }) => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');


    const handleSubmit = async () => {
        if (!query.trim()) return;
        setLoading(true);

        try {
            const { data } = await axios.post('api/question', {
                question: questionData,
                query
            });

            setResponse(data.answer);
        } catch (err) {
            setResponse('**Error**: Failed to get response. Please try again.');
            console.error(err);

        }

        setLoading(false);
    };
    return (
        <div className="p-3 space-y-4">
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                rows="4"
                placeholder="Ask for clarification..."
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
                {loading ? 'Processing...' : 'Ask AI'}
            </button>

            {response && (
                <div className="mt-4 p-6 bg-white rounded-lg shadow-sm border">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">AI Response</h2>
                    <ResponseRenderer content={response} />
                </div>
            )}
        </div>
    )
}

export default AiResponse
