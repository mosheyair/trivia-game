import React, { useState } from "react";
import "./QuestionCard.css";

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
    <div className="question-card">
      <h2 className="question-title">{question.question}</h2>

      {!hasAnswered ? (
        <>
          <div className="answers-container">
            <label className="answer-option">
              <input
                type="radio"
                name="answer"
                value="כן"
                onChange={() => setSelectedAnswer("כן")}
              />
              <span>כן</span>
            </label>

            <label className="answer-option">
              <input
                type="radio"
                name="answer"
                value="לא"
                onChange={() => setSelectedAnswer("לא")}
              />
              <span>לא</span>
            </label>

            <label className="answer-option">
              <input
                type="radio"
                name="answer"
                value="לא מדויק"
                onChange={() => setSelectedAnswer("לא מדויק")}
              />
              <span>לא מדויק</span>
            </label>
          </div>

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            שלח תשובה
          </button>
        </>
      ) : (
        <>
          <p className="your-answer">
            <strong>התשובה שלך:</strong> {selectedAnswer}
          </p>

          <p className={isCorrect ? "correct" : "wrong"}>
            {isCorrect ? "✔ תשובה נכונה!" : "✖ תשובה שגויה"}
          </p>

          <p>
            <strong>התשובה הנכונה:</strong> {question.answer}
          </p>

          <p className="explanation">{question.explanation}</p>

          <button className="next-button" onClick={handleNext}>
            שאלה הבאה ➜
          </button>
          <button 
  className="home-button"
  onClick={() => {
    // מאפס הכל וחוזר למסך הראשי
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(false);
    onAnswer("backHome");
  }}
>
  ↩ חזרה למסך הראשי
</button>

        </>
      )}
    </div>
  );
  
}

export default QuestionCard;
