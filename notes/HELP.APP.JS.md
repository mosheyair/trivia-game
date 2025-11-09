# app.js
## 🧭 תוכן העניינים

1. [ייבוא ספריות ורכיבים](#ייבוא-ספריות-ורכיבים)
2. [הרחבת useState useEffect](#הרחבת-usestate-useeffect)
3. [משתני מצב (state variables)](#משתני-מצב-state-variables)
4. [שליפת קטגוריות מהשרת (useeffect)](#שליפת-קטגוריות-מהשרת-useeffect)
5. [בחירת קטגוריה – handlecategoryselect](#בחירת-קטגוריה--handlecategoryselect)
6. [טיפול בתשובה – handleanswer](#טיפול-בתשובה--handleanswer)
7. [כניסת מנהל – handleadminLogin](#כניסת-מנהל--handleadminlogin)
8. [הזרימה של הלוגיקה הכללית](#הזרימה-של-ההלוגיקה-הכללית)
9. [מבנה ה־ui (תצוגות)](#מבנה-ה־ui-תצוגות)
10. [תרשים זרימה של כל התהליך](#תרשים-זרימה-של-כל-התהליך)

################################################################################################################### 
## הקוד
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

#############################################################################################################
 

---



**App.js - //  זה הרכיב הראשי של כל אפליקצית הריאקט שלנו והוא הקובץ 
           // ממנו יוצאים כל מה שרואים על המסך: טפסים, שאלות, קטגוריות וכו
 
## ייבוא-ספריות-ורכיבים
   import { useState, useEffect } from "react";// - ייבוא הוקים של ריאקט לניהול מצב וטעינה בזמן פעולות
   import CategoryList from "./components/CategoryList";// -רכיב להצגת רשימת קטגוריות
   import QuestionCard from "./components/QuestionCard";// -רכיב להצגת שאלה
   import AddQuestionForm from "./components/AddQuestionForm";// -רכיב לטופס הוספת שאלה

------------------------------------------------------------------------------------------------------- 

## הרחבת-usestate-useeffect

usestate  and useeffect//react hooks  טעינה בזמן פעולות ולביצוע מצב לניהול
      what is Hooks?
//Hooks are functions that let you "hook into" React state and lifecycle features from function components.
//They allow you to use state and other React features without writing a class. 
//הוקים הם פונקציות מיוחדות של ריאקט שמאפשרות לרכיבי פונקציה להתנהג כמו רכיבי מחלקה
//כלומר לשמור מצב להגיב לשינויים ולשלוט במחזור החיים של הרכיב
//  useState ו- useEffect :שתי הוקים חשובים שאנחנו משתמשים כאן הם 

            what is useState?
      //usestate - נותן לנו דרך לשמור מצב קבוע בתוך רכיב - גם כשריאקט מציירת אותו שוב 
      //תחביר בסיסי:
      const [value, setValue] = useState(initialValue);
       //value - המשתנה שבו נשמר המידע.
      //setValue - פונקציה שמשנה את המידע.
      //initialValue - הערך הראשוני עם טעינת הרכיב.
                 **דוגמא**
          const [count, setCount] = useState(0);
          <button onClick={() => setCount(count + 1)}>לחץ עליי ({count})</button>
       //count כל לחיצה על הכפתור משנה את
          // השתנה stateריאקט רואה שה - 
         //מציירת מחדש רק את מה שצריך (לא את כל הדף).

     // count = 0 push -> count = 1 -> ריאקט מציירת מחדש את הכפתור עם הערך החדש 
      
            what is useEffect?
    //if usestate - שומר את הנתונים
    //useEffect - שולט מתי להריץ קוד מסוים בהתאם לשינויים במצב או באלמנטים אחרים.
    // ישירות בגוף הפונקציה setTimeout, fetch ,console.log בריאקט אסור להריץ פעולות כמו 
    //בגלל שהן צריכות לקרוא אחרי שהרכיב מוצג למסך
    // לעזרה useEffect אז באה
         useEffect(() => {
               // קוד שרוצים להריץ
         }, [dependencies]); //רשימת התלויות - מתי להריץ את הקוד שוב
                            //אם ריק - מריץ פעם אחת כשנטען הרכיב
                           //אם יש משתנה - מריץ כל פעם שהמשתנה משתנה    
    //הפונקציה הראשונה - מה שצריך לקרות ... המערך בסוף - מתי זה יקרה

        **העיקריים המצבים שלושת**
        
        //useEffect(() => {...}, [] -    מריץ פעם אחת כשנטען הרכיב
        //useEffect(() => {...}, [x]) -  משתנה X בכל פעם ש  
        //useEffect(() => {...}) -       מריץ אחרי כל רינדור של הרכיב

          שלנו מהקוד דוגמה:
      useEffect(() => {
        fetch("https://api.mokafullstack.com/api/categories")   
            .then((res) => res.json())
            .then(setCategories)
            .catch((err) => console.error("Error fetching categories:", err));
        }, []); // []  מריץ פעם אחת בלבד כשנטען המסך - בגלל שרשימת התלויות ריקה 
                //categories  שולף נתונים מהשרת ושומר אותם ב

                  :לסיכום
              //useState - שומר את ה-מה
              //useEffect - קובע מתי להריץ את ה-מתי    
   ------------------------------------------------------------------------------------------------------           

## משתני מצב (state variables)


  function App() {
    const [categories, setCategories] = useState([]);// - ריק בהתחלה קטגוריות - מערך
    const [selectedCategory, setSelectedCategory] = useState(null);// - קטגוריה נבחרת - 
    const [questions, setQuestions] = useState([]);// ריק בהתחלה - שאלות - מערך
    const [currentIndex, setCurrentIndex] = useState(0);// - אינדקס נוכחי של השאלה
    const [isAdmin, setIsAdmin] = useState(false);// - מצב אדמין -לא בהתחלה 
    const [showLogin, setShowLogin] = useState(false);// - להראות טופס כניסה - בהתחלה לא 
categories -// - רשימת הקטגוריות שמגיעה מהשרת
selectedCategory -// - הקטגוריה הנבחרת על ידי המשתמש
questions -// - רשימת השאלות של הקטגוריה הנבחרת
currentIndex -// - האינדקס הנוכחי של השאלה שמוצגת
isAdmin -// - בוליאני שמציין אם המשתמש במצב אדמין
showLogin -// - האם להציג את שדה הסיסמה     
    
## שליפת-קטגוריות-מהשרת-useeffect

    useEffect(() => { //[]  מריץ קוד פעם אחת בלבד כשנטען המסך - בגלל שרשימת התלויות ריקה 
      fetch("https://api.mokafullstack.com/api/categories") //שולח בקשת פי'ץ לשרת כדי לקבל את הקטגוריות
                    //כשהתשובה מגיעה היא נשמרת "בקטגוריה" ואם יש שגיאה היא מודפסת לקונסול
        .then((res) => res.json()) // JSON המרת התשובה לפורמט 
        .then(setCategories) //  שמירת הקטגוריות במצב
        .catch((err) => console.error("Error fetching categories:", err)); //הדפסה של שגיאות לקונסול תוך כדי הגנה מקריסת האפליקציה
      }, []);

    // לשרת HTTP שולח בקשת fitch()
    // ומעבדים את התשובה then() אם הכל תקין עוברים ל
    // catch() אם משהוא משתבש בדרך - קופצים ל

    //⚠️  ?תופס  catch()  אילו סוגי שגיאות ה־.

    //שגיאות רשת - בעיות חיבור לאינטרנט, שרת לא זמין וכו'.
    //שגיאות בפורמט הנתונים - אם התשובה מהשרת לא בפורמט הצפוי.
    //שגיאות לוגיות - אם התשובה מהשרת מכילה שגיאה לוגית (למשל, קוד שגיאה).

          //🚫 לא תופס fitch אלו שגיאות ה  

    // עם שגיאה (404, 500 וכו') HTTP תגובות  
    //שגיאות סינטקס בקוד ג'אווה סקריפט - כמו שגיאות כתיב או טעויות תחביר בקוד .
    // fetch שגיאות אסינכרוניות שלא קשורות ישירות לבקשת ה .

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  : גרסה מורחבת של טיפול גם בשגיאות 404 ,500 וגם בשגיאות תקשורת
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://api.mokafullstack.com/api/categories");

      // ✅ בדיקה אם השרת החזיר קוד תקין (200–299)
      if (!response.ok) {
        throw new Error(`שרת החזיר שגיאה (${response.status} ${response.statusText})`);
      }

      // ✅ ניסיון להמיר ל־JSON
      const data = await response.json();

      // ✅ שמירה ב־state
      setCategories(data);
    } catch (err) {
      console.error("❌ בעיה בשליפת קטגוריות:", err);

      // ✅ הודעה יפה למשתמש (במקום alert)
      const errorMessage =
        err.message.includes("Failed to fetch") || err.message.includes("NetworkError")
          ? "נראה שאין חיבור לשרת כרגע. נסה שוב בעוד רגע 🔄"
          : `אירעה שגיאה בעת טעינת הנתונים: ${err.message}`;

      // מציג על המסך הודעה ידידותית (לא popup)
      setCategories([{ id: -1, name: errorMessage }]);
    }
  };

  fetchCategories();
}, []);

//  מה חדש כאן
//try { ... } catch { ... } -  מבנה לטיפול בשגיאות אסינכרוניות עוטף את הפעולה ומוודא שכל חריגה תתפס
//if (!response.ok) { ... } -  בודק אם השרת החזיר שגיאת 404 או 500 וכ'ו, 
//throw new Error(...) - catch מייצר שגיאה ידנית כדי שתיכנס ל־       
//err.message.includes("Failed to fetch") - מזהה אם אין חיבור אינטרנט.
//setCategories([{ id: -1, name: errorMessage }]); - מציג הודעת שגיאה ידידותית במקום רשימת הקטגוריות במקום לקרוס.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## בחירת-קטגוריה--handlecategoryselect

    ## קטגוריה בחירת ##
//כשמשתמש לוחץ על קטגוריה, הפונקציה הזו מופעלת
//שומרת את הקטגוריה שנבחרה.
//מביאה מהשרת את כל השאלות ששייכות לאותה קטגוריה
//שומרת אותן במצב שאלות
     const handleCategorySelect = (category) => {// - פונקציה שמטפלת בבחירת קטגוריה
      setSelectedCategory(category);// - שמירת הקטגוריה הנבחרת במצב
       fetch(
      `https://api.mokafullstack.com/api/questions?categoryId=${category.id}`// - שליפת שאלות מהשרת לפי מזהה הקטגוריה
  )
    .then((res) => res.json())// -JSON המרת התשובה לפורמט 
    .then(setQuestions)//שמירת התשובה בשאלות
    .catch((err) => console.error("Error fetching questions:", err));//הדפסה של שגיאות לקונסול
};

## טיפול-בתשובה--handleanswer
   
// כל פעם שהשחקן עונה – הפונקציה הזו בודקת אם יש עוד שאלות.
//אם כן → מעבירה לשאלה הבאה.
//אם לא → מציגה הודעת סיום ומחזירה את המשתמש למסך הקטגוריות.

const handleAnswer = () => {// - פונקציה שמטפלת בתשובה לשאלה
  if (currentIndex + 1 < questions.length) {// - בדיקה אם יש עוד שאלות
    setCurrentIndex(currentIndex + 1);// - מעבר לשאלה הבאה על ידי הגדלת האינדקס הנוכחי
  } else {// - אם אין עוד שאלות
    alert("🎉 You've finished the category!");//פתיחת תיבת סיום
    setSelectedCategory(null);// - איפוס הקטגוריה הנבחרת
    setQuestions([]);// - איפוס רשימת השאלות
    setCurrentIndex(0);// - איפוס האינדקס הנוכחי
  }
};
      
## כניסת-מנהל--handleadminlogin

//פונקציה פשוטה לבדיקה אם הקוד שהוקלד תואם לסיסמת הניהול.

const handleAdminLogin = (password) => {// - פונקציה שמטפלת בכניסת אדמין
  if (password === "moka1234") {// - בדיקה אם הסיסמה נכונה
    setIsAdmin(true);// - הגדרת מצב אדמין כנכון'
    setShowLogin(false);// - הסתרת שדה הסיסמה
  } else {// - אם הסיסמה שגויה
    alert("Incorrect admin code 🤐");// תיבת הודעה לקוד לא תקין
  }
};

## הזרימה-של-ההלוגיקה-הכללית  

//1. כשהעמוד נטען:

     //useEffect מושך קטגוריות מהשרת.

    //מציג את המסך הראשי עם רשימת קטגוריות.

//2. כשהמשתמש בוחר קטגוריה:

    //handleCategorySelect מושך שאלות מהשרת עבור הקטגוריה הנבחרת.

//3. כשהמשתמש עונה על שאלה:

     //handleAnswer מעדכן את האינדקס הנוכחי או מסיים את הקטגוריה.

//4. כשהמשתמש מנסה להיכנס למצב אדמין:

     //handleAdminLogin בודק את הסיסמה ומעדכן את מצב האדמין.

## מבנה-ה־ui-תצוגות

// יש שלוש תצוגות עיקריות בהתאם למצב
//1. תצוגת פתיחה - רשימת קטגוריות וכפתור אדמין
//2. תצוגת אדמין - טופס הוספת שאלה וכפתור חזרה
//3.תצוגת משחק - מציגה שאלה אחת בכל פעם

## תרשים-זרימה-של-כל-התהליך

//flowchart TD
//A[טעינת App.js] --> B[useEffect - שליפת קטגוריות]
//B --> C[מציג רשימת קטגוריות]
//C -->|בחירת קטגוריה| D[handleCategorySelect]
//D --> E[שליפת שאלות מהשרת]
//E --> F[QuestionCard מציג שאלה]
//F -->|שחקן עונה| G[handleAnswer]
//G -->|יש עוד שאלות| F
//G -->|אין שאלות| C

//C -->|מנהל לוחץ Admin| H[הצגת שדה סיסמה]
//H -->|הזין moka1234| I[מצב מנהל = true]
//I --> J[הצגת AddQuestionForm]
//J -->|Back| C
          




