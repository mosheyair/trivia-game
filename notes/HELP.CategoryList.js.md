# category list
## 🧭 תוכן העניינים

- [category list](#category-list)
  - [🧭 תוכן העניינים](#-תוכן-העניינים)
  - [הקוד הבסיסי](#הקוד-הבסיסי)
  - [פונקציה לשליחת הטופס](#פונקציה-לשליחת-הטופס)
  - [1. הצגת רשימת קטגוריות ](#1-הצגת-רשימת-קטגוריות-)
  - [2. כפתור שלח משוב ](#2-כפתור-שלח-משוב-)
  - [3. הצגת טופס המשוב   ](#3-הצגת-טופס-המשוב---)
  - [3.1 פרטים אישיים  ](#31-פרטים-אישיים--)
  - [3.2 כתבו תגובה      ](#32-כתבו-תגובה------)
  - [4. submitted לאחר שליחה מצב ](#4-submitted-לאחר-שליחה-מצב-)
  - [סיכום ותרשימים  ](#סיכום-ותרשימים--)


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
setError("") - מוחקים כל שגיאה קודמת   <br>
setStep(2)  -  ל2 state משנים את
</div>

<div style="color: blue;">
1. בודקים אם יש שדות ריקים - אם כן מציגים שגיאה  <br>
2. בודקים אם תבנית האימייל תקינה  - אם לא מציגים שגיאה  <br>
3. אם הכל תקין - מנקים שגיאה ומתקדמים לשלב הבא  <br>
</div> <br><br>


<div style="color: purple;">
<div dir="ltr">
const handleSubmit = () => {  <br>
    if (!formData.message) {  <br>
      setError("אנא מלא את שדה המשוב לפני השליחה."); <br>
      return; <br>
    } <br>

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
</div>
** handleSubmit - היא הפונקציה שמופעלת כאשר המשתמש לוחץ על כפתור שלח משוב המטרה שלה  <br>

לבדוק אם המשתמש כתב הודעה.  <br>

להציג הודעת תודה.  <br>

לשמור או להציג את הנתונים.  <br>

לאפס את הטופס כדי שאפשר יהיה לשלוח שוב.  <br>
<br>
<br>
אם המשתמש מנסה לשלוח טופס ריק זו הפונקציה שמחזירה לו שגיאה <br>
if (!formData.message) {
  setError("אנא מלא את שדה המשוב לפני השליחה.");
  return;
}
<br>
<br>
setError("") - אם הגענו לכאן סימן שהכל תקין ואז אנחנו מוחקים שגיאות קודמות  <br>
console.log("📝 Feedback submitted:", formData); - רישום התוצאה לקונסול  <br>
setSubmitted(true); - מעדכן את הסטטוס ואז ריאקט תדע להציג למשתמש הודעה מתאימה  <br><br>
לאחר הצגת ההודעה מגיע שלב איפוס הטופס
setFormData({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

</div>

<br><br>
<div style="color: purple;">   
<div dir="ltr">  

 return (           <br>
    <div style={{ textAlign: "center" }}>     <br>
      <ul style={{ listStyleType: "none", padding: 0 }}>    <br>
        {categories.map((cat) => (      <br>
          <li>               <br>
            key={cat.id}            <br>
            onClick={() => onSelect(cat)}             <br>
            style={{                            <br>
              cursor: "pointer",            <br>
              fontSize: "20px",             <br>
              margin: "10px 0",                   <br>
              color: "#333",             <br>
              transition: "color 0.2s",       <br>
            }}                                 <br>
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}      <br>
            onMouseLeave={(e) => (e.target.style.color = "#333")}        <br>
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
<br>
** state  ריאקט מסתכלת על כל ה
* showFeedbackForm
* submitted
* step
* error
* formData
  <br>
** ועל פי הערכים מחליטה מה להציג על המסך קוראים לזה  <br>
conditional rendering (הצגה מותנית)  
<br>  
<div dir="ltr">  
<div style="color: blue;">
<h3>
## 1. הצגת רשימת קטגוריות </h3>
מציג קטגוריות ואם לוחצים מפעיל את הקטגוריה
<ul>
  {categories.map((cat) => (
    <li onClick={() => onSelect(cat)}>{cat.name}</li>
  ))}
</ul>
</div>
<br>
<div style="color: purple;">
<h3>
## 2. כפתור שלח משוב </h3>
<br>
מוצג רק במקרה ש   <br>
* showFeedbackForm === false AND    <br>
* submitted === false   <br>
{!showFeedbackForm && !submitted && (    <br>
  <button onClick={() => setShowFeedbackForm(true)}>📩 שלח משוב</button>   <br>
)}
<br>
</div>
<div style="color: blue;">
<h3>
## 3. הצגת טופס המשוב   </h3>
<br>
הטופס מוצג רק כאשר 
* showFeedbackForm === true AND  <br>
* submitted === false
<br>
<h3>
## 3.1 פרטים אישיים  </h3>
step === 1 מוצג רק כאשר    <br>
{step === 1 && (    <br>
  <div dir="ltr">
    פרטים אישיים    <br>
    {error && <p style={{ color: "red" }}>{error}</p>}   <br>
    ...    <br>
    <button onClick={handleContinue}>המשך</button>   <br>
  </>
)}    <br>
* מקלידים שם פרטי, משפחה, אימייל        <br>
* formData ריאקט שולטת בכל השדות דרך    <br>
* handleContinue לחיצה על המשך מפעילה   <br>
*** step ריאקט מציגה את השלב בהתאם לערך של <br>
## 3.2 כתבו תגובה      <br>
** step === 2 מוצג רק כאשר     <br>
{step === 2 && (      <br>
<div dir="ltr"> 
כתבו לנו    <br>
{error &&  style={{ color: "red" }}>{error}}      <br>                                       
<button onClick={handleSubmit}>שלח משוב</button>       <br>
  )}
  </div>
<br>  
* handleSubmit לאחר שהמשתמש כותב את ההודעה, לחיצה על הכפתור תפעיל את הפונקציה 
<br>
</div>
<div style="color: purple;">
<h3>
## 4. submitted לאחר שליחה מצב </h3>
* עושה handleSubmit ברגע ש <br>
  setSubmitted(true)    <br>
* כל מה שהיה למעלה נעלם וריאקט מציגה מסך תודה   <br>
  {submitted && (     <br>
  <div style={{ color: "green" }}>    <br>
    ✅ תודה על המשוב! נשתדל לשפר בהתאם.    <br>
  </div>
)}      <br>
** כל הממשק משתנה אוטומטית state רק על פי שינוי ב
<br>
<div style="color: blue;">
<h2>
## סיכום ותרשימים  </h2>
 state רייאקט מציגה מצב בהתאם ל   <br>
* submitted === false → טופס    <br>
* submitted === true  → הודעת תודה    <br>
* step === 1          → שדות אישיים    <br>
* step === 2          → שדה הודעה      <br>
* showFeedbackForm === false → כפתור פתיחת טופס  <br>
* showFeedbackForm === true → הטופס עצמו    <br>
  ** state הכל לפי ה   <br>

<div style="color: red;">
<h3>state</h3>
<h4>?state מהו</h4>
* המסך היה נשאר קפוא ריאקט לא הייתה יודעת לשנות את מה שרואים על המסך בזמן אמת state בלי   <br>
* כל הקומפוננטה מצוירת מחדש state כל פעם שיש שינוי ב    <br>
* הוא כמו המוח של הקומפוננטה, הוא זוכר מה קרה עד עכשיו state ה    <br>
* בעצמנו DOM בריאקט אנחנו לא משנים את ה    <br>
* היא הדרך היחידה להגיד לריאקט משהו השתנה תעדכני את הממשק state     <br>

</div>
</div>







