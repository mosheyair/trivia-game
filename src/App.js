import { useState, useEffect } from "react";
import CategoryList from "./components/CategoryList";
import QuestionCard from "./components/QuestionCard";
import AddQuestionForm from "./components/AddQuestionForm";
import "./App.css";

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

 const handleAnswer = (action) => {
  // אם המשתמש בחר לחזור למסך הראשי
  if (action === "backHome") {
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentIndex(0);
    return;
  }

  // המשך רגיל
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

  // 🔹 מסך פתיחה (עיצוב חדש)
  if (!selectedCategory && !isAdmin) {
    return (
      <>
        <div className="card title-card">
          <h1>Trivia - Game</h1>
        </div>

        <div className="card subtitle-card">
          <h2>Available Categories:</h2>
        </div>

        <div className="card categories-card">
          <CategoryList
            categories={categories}
            onSelect={handleCategorySelect}
          />
        </div>

        <div className="card buttons-card">
          <button
            className="big-button"
            onClick={() => setShowLogin(!showLogin)}
          >
            🔐 Admin
          </button>

          {showLogin && (
            <div style={{ marginTop: "-130px" }}>
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
      </>
    );
  }

  // 🔹 מסך ניהול (כמו בקובץ הישן)
  if (isAdmin && !selectedCategory) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🔧 Admin Panel</h1>
        <AddQuestionForm categories={categories} />
        <button onClick={() => setIsAdmin(false)}>🔙 Back to Game</button>
      </div>
    );
  }

  // 🔹 מסך שאלות
  const question = questions[currentIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{selectedCategory?.name}</h1>

      {question ? (
        <QuestionCard question={question} onAnswer={handleAnswer} />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default App;
