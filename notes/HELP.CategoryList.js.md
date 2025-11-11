# category list
## 🧭 תוכן העניינים

- [category list](#category-list)
  - [🧭 תוכן העניינים](#-תוכן-העניינים)
  - [הקוד הבסיסי](#הקוד-הבסיסי)
  - [פונקציה לשליחת הטופס](#פונקציה-לשליחת-הטופס)


---
## הקוד הבסיסי

// src/components/CategoryList.js<br>
import React, { useState } from "react";<br>

function CategoryList({ categories, onSelect }) {<br>
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);<br>
  const [step, setStep] = useState(1); // שלב 1: פרטים אישיים, שלב 2: המשוב עצמו<br>
  const [formData, setFormData] = useState({<br>
    firstName: "",<br>
    lastName: "",<br>
    email: "",<br>
    message: "",<br>
  });<br>
  const [submitted, setSubmitted] = useState(false);<br>
  const [error, setError] = useState("");<br>

  const handleChange = (e) => {<br>
    setFormData({ ...formData, [e.target.name]: e.target.value });<br>
  };<br>


  const validateEmail = (email) => {<br>  // פונקציה לבדיקת אימייל
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;<br>
    return pattern.test(email);<br>
  };<br>

  const handleContinue = () => {<br>
    const { firstName, lastName, email } = formData;<br>

    if (!firstName || !lastName || !email) { 
      setError("🛑 אנא מלא את כל השדות לפני המעבר לשלב הבא.");<br>
      return;
    }
   

    if (!validateEmail(email)) {
      setError("📭 כתובת האימייל אינה תקינה.");
      return;
    }


    setError("");
    setStep(2);
    };

  const handleSubmit = () => {<br>
    if (!formData.message) {<br>
      setError("אנא מלא את שדה המשוב לפני השליחה.");<br>
      return;<br>
    }<br>

    setError("");
    console.log("📝 Feedback submitted:", formData);
    setSubmitted(true);
    alert("תודה! המשוב שלך התקבל.")
<br>
    // איפוס שדות<br>
    setFormData({<br>
      firstName: "",<br>
      lastName: "",<br>
      email: "",<br>
      message: "",<br>
    });<br>
  };<br>

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

  
      {!showFeedbackForm && !submitted && (
        <button onClick={() => setShowFeedbackForm(true)}>📩 שלח משוב</button>
      )}

    
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


#########################################################################################################

* #### בimport React, { useState } from "react"; - import hook usestate 
* usestate - נותן לנו דרך לשמור מצב קבוע בתוך רכיב - גם כשריאקט מציירת אותו שוב 

## פונקציה לשליחת הטופס
<div dir="ltr">
<div style="color: purple;">
function CategoryList({ categories, onSelect }) { <br>
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);  <br>
  const [step, setStep] = useState(1);   // שלב 1: פרטים אישיים, שלב 2: המשוב עצמו  <br>
  const [formData, setFormData] = useState({   <br>
    firstName: "",   <br>
    lastName: "",    <br>
    email: "",       <br>
    message: "",     <br>
  })
  };
  </div>
  </div>
 <div style="color: purple;">
 <div dir="ltr">
* function CategoryList({ categories, onSelect }): 
  </div>
  
        CategoryList - (JSX) :שם קומפוננטת פונקציה שמחזירה קוד 
        { categories, onSelect } - ומוציאים מתוכו רק את השדות שאנחנו צריכים props פותחים את האובייקט 
                                categories - רשימת הקטגוריות - מערך
                                onSelect - הפונקציה שנקראת במידה והמשתמש בוחר בקטגוריה
 </div>

<div dir="ltr">
<div style="color: purple;">
* const [showFeedbackForm, setShowFeedbackForm] = useState(false);<br>
</div>
  
       showFeedbackForm - בשם (state) כאן אנחנו יוצרים משתנה מצב<br>
                          והוא אחראי לשמור על טופס המשוב גלוי או מוסתר<br>

  useState(false) - כלומר הטופס מוסתר בתחילת הדרך false אומר שברירת המחדל שלו היא   

  setShowFeedbackForm - true/false זו הפונקציה שאחראית לשנות את הערך הזה ל   
                            זה יפתח את הטופס setShowFeedbackForm(true) אם נקרא      
                           זה יסגור את הטופס setShowFeedbackForm(false) אם נקרא
</div>
  
<div dir="ltr">
<div style="color: purple;">
* const [step, setStep] = useState(1); // שלב 1: פרטים אישיים, שלב 2: המשוב עצמו
</div>  
        step - שמיצג את השלב הנוכחי בטופס step זה עוד משתנה מצב בשם
                בהתחלה הוא שווה 1 כלומר שלב פרטים אישיים 
        שלב 1 → המשתמש ממלא את שמו, אימייל ...ו  
              שלב 2 → המשתמש ממלא את תוכן המשוב 
              זה אומר שאנחנו עוברים לשלב השני setStep(2) אם נעשה   
</div>                
<div dir="ltr">
<div style="color: purple;">
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
</div> 
     משתנה מצב שמכיל אובייקט עם כל השדות בטופס<br>
       ("") ברירת המחדל היא שכל השדות ריקים <br>
      משמשת לעדכן את אחד או יותר מהשדות האלו כשהמשתמש מקליד משהו setFormData הפונקציה<br>
</div>    
<br>
<div dir="ltr">
<div style="color: purple;">
*const [submitted, setSubmitted] = useState(false);<br>
</div>
* (state) יוצר משתנה מצב <br>
* שמציין אם המשתמש כבר שלח את הטופס submitted : בשם<br>
* כאשר המשתמש עדיין לא שלח את הטופס false הערך ההתחלתי<br>
* setSubmitted - זו הפונקציה שמשנה את הערך - ברגע שנרצה לסמן שהטופס נשלח נשנה אותה <br>
* setSubmitted(true);
</div>
 <br>
<div dir="ltr">
<div style="color: purple;">
*const [error, setError] = useState("");<br>
</div>
* (error messages) עוד משתנה מצב, הפעם לטיפול בהודעות שגיאה <br>
* הערך ההתחלתי:מחרוזת ריקה ("") - כלומר, אין שגיאה בהתחלה.<br>
* השגיאות הן שגיאות של אימייל לא תקין או שדה חסר..
</div>
<br>
<div dir="ltr">
<div style="color: purple;">
const handleChange = (e) => {  <br>
    setFormData({ ...formData, [e.target.name]: e.target.value });   <br>
  };   <br>
</div>
פונקציה קטנה אבל גאונית <br>
* handleChange - (event handler) זאת פונקצית אירוע <br>
* (input, textarea..). היא מופעלת בכל פעם שמשהו משתנה בתוך שדה הטופס<br>
* בכל פעם שהמשתמש מקליד משהו - הפונקציה הזו מופעלת<br>
* (event) e ומקבלת אוביקט בשם <br>
  <br>
* e.target - זהו האלמנט שגרם לאירוע להתרחש במקרה שלנו זה השדה שבו המשתמש מקליד <br>
* e.target.name  - "firstName" <br>
* e.target.value - "Moshe"  <br>
<br> 
* formData - הוא אובייקט שמכיל  כל השדות של הטופס 
* firstName: "", lastName: "", email: "".. <br>
* formData נקרא spread operator <br>
* הוא אומר - תשמור את כל הערכים הקיימים באובייקט כמו שהם <br>
* זהו מפתח דינמי והמשמעות שלו - תשנה את השדה ותן לו את הערך החדש <br>
* בלי לגעת בשדות האחרים<br>
  בקצרה <br>
* <div style="color: green;">handleChange - פונקציה שמופעלת כשמשתמש משנה ערך בשדה  </div> <br>
* <div style="color: green;">e - (input) האירוע שנשלח מהאלמנט </div> <br>
* <div style="color: green;">e.target.name - שם השדה שהשתנה </div> <br>
* <div style="color: green;">e.target.value - הערך החדש שהוקלד </div> <br>
* <div style="color: green;">setFormData(...) - מעדכן את מצב הטופס  בצורה חכמה, בלי למחוק את הערכים האחרים </div> <br>
</div>
<div dir="ltr">
<div style="color: purple;">
const validateEmail = (email) => {  <br>
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  <br>
    return pattern.test(email);  <br>
  };  <br>
</div>
* פונקציה שנועדה לבדוק את כתובת האימייל שהמשתמש הזין האם המבנה תקין <br>
* /^ - תחילת המחרוזת <br>
* [^\s@]+ - קבוצה של תווים שאינם רווח או סימן "שטרודל" כלומר השם לפני השטרודל <br>
* @ - חייב להופיע סימן שטרודל אחד <br>
* [^\s@]+ -  שוב, קבוצה של תווים אחרי השטרודל (שם הדומיין) <br>
* \. - חייבת להופיע נקודה אחת לפחות <br>
* [^\s@]+ - (.com, .net) תווים אחרי הנקודה <br>
* $ - סוף המחרוזת <br>
  <br>
* test() - בודקת אם המחרוזת תואמת את התבנית <br>
* true אם כן מחזירה <br>
* false אם לא  <br>
  <br>
** return pattern.test(email); <br>
true or false  הפונקציה מחזירה <br>
כך שהקוד יוכל לבצע את התנאי   <br>
** if (!validateEmail(formData.email)) {   <br>
  setError("Please enter a valid email address.");  <br>
}  <br>
   </div>

<div dir="ltr">
<div style="color: purple;">
    const handleContinue = () => {  <br>
  const { firstName, lastName, email } = formData;<br>

  if (!firstName || !lastName || !email) {  <br>
    setError("🛑 אנא מלא את כל השדות לפני המעבר לשלב הבא.");  <br>
    return;  <br>
  }   <br>

  if (!validateEmail(email)) {  <br>
    setError("📭 כתובת האימייל אינה תקינה.");  <br>
    return;  <br>
  }  <br>

  setError("");  <br>
  setStep(2);   <br>
};  <br>

</div>

</div>






