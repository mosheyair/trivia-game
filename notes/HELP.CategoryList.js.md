# category list
## 🧭 תוכן העניינים

- [category list](#category-list)
  - [🧭 תוכן העניינים](#-תוכן-העניינים)
  - [הקוד הבסיסי](#הקוד-הבסיסי)
  - [פונקציה לשליחת הטופס](#פונקציה-לשליחת-הטופס)


---
## הקוד הבסיסי

// src/components/CategoryList.js
import React, { useState } from "react";

function CategoryList({ categories, onSelect }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [step, setStep] = useState(1); // שלב 1: פרטים אישיים, שלב 2: המשוב עצמו
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ פונקציה לבדיקת אימייל
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleContinue = () => {
    const { firstName, lastName, email } = formData;

    if (!firstName || !lastName || !email) {
      setError("🛑 אנא מלא את כל השדות לפני המעבר לשלב הבא.");
      return;
    }

    if (!validateEmail(email)) {
      setError("📭 כתובת האימייל אינה תקינה.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmit = () => {
    if (!formData.message) {
      setError("אנא מלא את שדה המשוב לפני השליחה.");
      return;
    }

    setError("");
    console.log("📝 Feedback submitted:", formData);
    setSubmitted(true);
    alert("תודה! המשוב שלך התקבל.");

    // איפוס שדות
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat)}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              margin: "10px 0",
              color: "#333",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#333")}
          >
            {cat.name}
          </li>
        ))}
      </ul>

      {/* 🔘 כפתור פתיחת המשוב */}
      {!showFeedbackForm && !submitted && (
        <button onClick={() => setShowFeedbackForm(true)}>📩 שלח משוב</button>
      )}

      {/* 🧾 טופס משוב */}
      {showFeedbackForm && !submitted && (
        <div style={{ marginTop: "20px", maxWidth: "400px", margin: "auto" }}>
          {step === 1 && (
            <>
              <h3>פרטים אישיים</h3>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input
                name="firstName"
                placeholder="שם פרטי"
                value={formData.firstName}
                onChange={handleChange}
                style={{ display: "block", width: "100%", margin: "10px 0" }}
              />
              <input
                name="lastName"
                placeholder="שם משפחה"
                value={formData.lastName}
                onChange={handleChange}
                style={{ display: "block", width: "100%", margin: "10px 0" }}
              />
              <input
                name="email"
                type="email"
                placeholder="אימייל"
                value={formData.email}
                onChange={handleChange}
                style={{ display: "block", width: "100%", margin: "10px 0" }}
              />
              <button onClick={handleContinue}>המשך</button>
            </>
          )}

          {step === 2 && (
            <>
              <h3>כתבו לנו</h3>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <textarea
                name="message"
                placeholder="הערות, שאלות, באגים..."
                value={formData.message}
                onChange={handleChange}
                style={{ width: "100%", height: "100px", margin: "10px 0" }}
              />
              <button onClick={handleSubmit}>שלח משוב</button>
            </>
          )}
        </div>
      )}

      {/* ✔️ לאחר שליחה */}
      {submitted && (
        <div style={{ marginTop: "20px", color: "green" }}>
          ✅ תודה על המשוב! נשתדל לשפר בהתאם.
        </div>
      )}
    </div>
  );
}

export default CategoryList;

###################################################################################################################

** import React, { useState } from "react"; - import hook usestate 
      usestate - נותן לנו דרך לשמור מצב קבוע בתוך רכיב - גם כשריאקט מציירת אותו שוב 

## פונקציה לשליחת הטופס

function CategoryList({ categories, onSelect }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [step, setStep] = useState(1); // שלב 1: פרטים אישיים, שלב 2: המשוב עצמו
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

     function CategoryList({ categories, onSelect }):
        CategoryList - JSX :שם קומפוננטת פונקציה שמחזירה קוד 
        { categories, onSelect } - ומוציאים מתוכו רק את השדות שאנחנו צריכים props פותחים את האובייקט 
                                categories - רשימת הקטגוריות - מערך
                                onSelect - הפונקציה שנקראת במידה והמשתמש בוחר בקטגוריה

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
       showFeedbackForm - בשם (state) כאן אנחנו יוצרים משתנה מצב
                          והוא אחראי לשמור על טופס המשוב גלוי או מוסתר

  useState(false) - כלומר הטופס מוסתר בתחילת הדרך false אומר שברירת המחדל שלו היא   

  setShowFeedbackForm - true/false זו הפונקציה שאחראית לשנות את הערך הזה ל   
                            זה יפתח את הטופס setShowFeedbackForm(true) אם נקרא      
                           זה יסגור את הטופס setShowFeedbackForm(false) אם נקרא

  const [step, setStep] = useState(1); // שלב 1: פרטים אישיים, שלב 2: המשוב עצמו
        step - שמיצג את השלב הנוכחי בטופס step זה עוד משתנה מצב בשם
                בהתחלה הוא שווה 1 כלומר שלב פרטים אישיים 
        שלב 1 → המשתמש ממלא את שמו, אימייל ...ו  
              שלב 2 → המשתמש ממלא את תוכן המשוב 
              זה אומר שאנחנו עוברים לשלב השני setStep(2) אם נעשה     

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
 
     משתנה מצב שמכיל אובייקט עם כל השדות בטופס
       ("") ברירת המחדל היא שכל השדות ריקים 
      משמשת לעדכן את אחד או יותר מהשדות האלו כשהמשתמש מקליד משהו setFormData הפונקציה
      










