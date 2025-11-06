import { useState, useEffect } from "react";
import CategoryList from "./components/CategoryList";
import QuestionCard from "./components/QuestionCard";
import AddQuestionForm from "./components/AddQuestionForm";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch("https://api.mokafullstack.com/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetch(
      `https://api.mokafullstack.com/api/questions?categoryId=${category.id}`
    )
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Error fetching questions:", err));
  };

  const handleAnswer = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("🎉 You've finished the category!");
      setSelectedCategory(null);
      setQuestions([]);
      setCurrentIndex(0);
    }
  };

  const handleAdminLogin = (password) => {
    if (password === "moka1234") {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("Incorrect admin code 🤐");
    }
  };

  // 🔹 ראש עמוד - כפתור ניהול וסיסמה
  if (!selectedCategory && !isAdmin) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Trivia Game 🎯</h1>
        <h2>Available Categories</h2>
        <CategoryList categories={categories} onSelect={handleCategorySelect} />
        <button onClick={() => setShowLogin(!showLogin)}>🔐 Admin</button>

        {showLogin && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="password"
              placeholder="Enter admin code"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdminLogin(e.target.value);
                }
              }}
            />
          </div>
        )}
      </div>
    );
  }

  if (isAdmin && !selectedCategory) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🔧 Admin Panel</h1>
        <AddQuestionForm categories={categories} />
        <button onClick={() => setIsAdmin(false)}>🔙 Back to Game</button>
      </div>
    );
  }

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
