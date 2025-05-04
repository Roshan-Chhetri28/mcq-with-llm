import React from 'react';

export default function QuestionDisplay({ questionData }) {
  return (
    <div className="mx-3 space-y-4">
        
        <p className="text-lg text-gray-700">{questionData.question}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(questionData.options).map(([key, value]) => (
            <div key={key} className="p-3 border rounded-lg bg-gray-50">
              <span className="font-semibold text-blue-600">{key}:</span>
              <span className="ml-2 text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-green-50">
          <span className="font-semibold text-green-700">Correct Answer:</span>
          <span className="ml-2 text-green-800">{questionData.correct}</span>
        </div>

        <div className="p-3 rounded-lg bg-blue-50">
          <span className="font-semibold text-blue-700">Explanation:</span>
          <span className="ml-2 text-blue-800">{questionData.explanation}</span>
        </div>
      </div>
  );
}
