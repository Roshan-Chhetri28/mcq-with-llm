import React, { useState } from 'react';
import axios from 'axios';
import QuestionDisplay from './components/QuestionDisplay';
import ResponseRenderer from './components/ResponseRenderer';
import AiResponse from './components/AiResponse';

const questions = [
  {
    "question": "How does a Pretrained transformer work?",
    "options": {
      "A": "Training from Scratch",
      "B": "Transfer Learning using large datasets",
      "C": "Without any data",
      "D": "Using rule-based methods"
    },
    "correct": "B",
    "explanation": "Pretrained transformers are first trained on large corpora, then fine-tuned on specific tasks—this is transfer learning."
  },
  {
    "question": "What is the derivative of \\(f(x) = x^4\\)?",
    "options": {
      "A": "4x^3",
      "B": "x^3",
      "C": "x^4",
      "D": "None of the above"
    },
    "correct": "A",
    "explanation": "Using the power rule: \\(\\frac{d}{dx}[x^n] = nx^{n-1}\\), so \\(\\frac{d}{dx}[x^4] = 4x^3\\)"
  },
  {
    "question": "What is Newton's Second Law of Motion?",
    "options": {
      "A": "F = ma",
      "B": "E = mc^2",
      "C": "F = mv",
      "D": "P = mv^2"
    },
    "correct": "A",
    "explanation": "Newton’s Second Law states that Force is equal to mass times acceleration: \\(F = ma\\)."
  },
  {
    "question": "Which SQL keyword is used to sort the result-set?",
    "options": {
      "A": "SORT",
      "B": "ORDER BY",
      "C": "GROUP BY",
      "D": "ARRANGE"
    },
    "correct": "B",
    "explanation": "ORDER BY is used in SQL to sort the result-set by one or more columns."
  },
  {
    "question": "What does the continue statement do in a loop?",
    "options": {
      "A": "Stops the loop entirely",
      "B": "Skips the rest of the loop and jumps to the next iteration",
      "C": "Pauses the loop",
      "D": "Restarts the loop from the beginning"
    },
    "correct": "B",
    "explanation": "The 'continue' statement skips the current iteration and proceeds to the next one."
  }
]



const App = () => {

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Question Section */}
      <h1 className="text-2xl font-bold text-gray-800">Question</h1>
      {
        questions.map((question, index) => (
          <>
            <QuestionDisplay key={index} questionData={question} />
            <AiResponse questionData={question}/>
          </>
        ))
      }


    </div>
  );
}
export default App