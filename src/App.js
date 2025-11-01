import { useState, useEffect } from "react";
import CategoryList from "./components/CategoryList";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3308/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetch(`http://localhost:3308/api/questions?categoryId=${category.id}`)
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Error fetching questions:", err));
  };

  const handleAnswer = (answer) => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("🎉 You've finished the category!");
      setSelectedCategory(null);
      setQuestions([]);
      setCurrentIndex(0);
    }
  };

  // 🔹 רק כאן מחליטים מה להחזיר:
  if (!selectedCategory) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Trivia Game 🎯</h1>
        <h2>Available Categories</h2>
        <CategoryList categories={categories} onSelect={handleCategorySelect} />
      </div>
    );
  }

  // 🔹 רק return אחד נוסף, כשהקטגוריה נבחרה:
  const question = questions[currentIndex];
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{selectedCategory.name}</h1>
      {question ? (
        <QuestionCard question={question} onAnswer={handleAnswer} />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default App;
