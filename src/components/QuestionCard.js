import React, { useState } from "react";

function QuestionCard({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!question) return <p>Loading question...</p>;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsCorrect(selectedAnswer === question.answer);
    setHasAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(false);
    onAnswer();
  };

  return (
    <div style={{ textAlign: "center", direction: "rtl" }}>
      <h2>{question.question}</h2>

      {!hasAnswered ? (
        <>
          <div>
            <label>
              <input
                type="radio"
                name="answer"
                value="כן"
                onChange={() => setSelectedAnswer("כן")}
              />
              כן
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="answer"
                value="לא"
                onChange={() => setSelectedAnswer("לא")}
              />
              לא
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="answer"
                value="לא מדויק"
                onChange={() => setSelectedAnswer("לא מדויק")}
              />
              לא מדויק
            </label>
          </div>

          <button onClick={handleSubmit} disabled={selectedAnswer === null}>
            שלח תשובה
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>התשובה שלך:</strong> {selectedAnswer}
          </p>
          <p style={{ color: isCorrect ? "green" : "red" }}>
            {isCorrect ? "✔ תשובה נכונה!" : "✖ תשובה שגויה"}
          </p>
          <p>
            <strong>תשובה נכונה:</strong> {question.answer}
          </p>
          <p>
            <em>{question.explanation}</em>
          </p>
          <button onClick={handleNext}>שאלה הבאה</button>
        </>
      )}
    </div>
  );
}

export default QuestionCard;

