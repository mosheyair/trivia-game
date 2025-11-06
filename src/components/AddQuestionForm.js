import { useState } from "react";

function AddQuestionForm({ categories }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      question,
      answer,
      explanation,
      category: { id: Number(categoryId) },
    };

    fetch("https://api.mokafullstack.com/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("✅ שאלה נוספה בהצלחה!");
          // איפוס שדות
          setQuestion("");
          setAnswer("");
          setExplanation("");
          setCategoryId("");
        } else {
          throw new Error("Failed to add question");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ שגיאה בהוספת השאלה.");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>הוספת שאלה חדשה</h2>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">בחר קטגוריה</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <br />
      <input
        type="text"
        placeholder="שאלה"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="תשובה"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="הרחבה (לא חובה)"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <br />
      <button type="submit">➕ הוסף שאלה</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </form>
  );
}

export default AddQuestionForm;
