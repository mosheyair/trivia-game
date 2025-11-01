import React from "react";

function QuestionCard({ question, onAnswer }) {
  if (!question) return <p>Loading question...</p>;

  return (
    <div>
      <h2>{question.question}</h2>
      <p>
        <strong>Answer:</strong> {question.answer}
      </p>
      <p>
        <em>{question.explanation}</em>
      </p>
      <button onClick={() => onAnswer(question.answer)}>Next Question</button>
    </div>
  );
}

export default QuestionCard;
