# דף כללי

- [דף כללי](#דף-כללי)
  - [יצירת תוכן עניינים באופן אוטומטי](#יצירת-תוכן-עניינים-באופן-אוטומטי)
  - [.md קבצי](#md-קבצי)
  - [תקציר](#תקציר)
  - [מבנה תיקיות עיקרי](#מבנה-תיקיות-עיקרי)
  - [הסבר קצר](#הסבר-קצר)
  - [מושגים בריאקט](#מושגים-בריאקט)
  - [תהליך הורשה בריאקט](#תהליך-הורשה-בריאקט)



## יצירת תוכן עניינים באופן אוטומטי
   
      Markdown All in One  :הורדת הרחבה
      Yu Zhang                :שם היוצר 
      לפתוח קובץ .md
      לעמוד על המקום שרוצים לשים את תוכן העניניים 
      להקיש Ctrl + Shift + P
      להקליד Create Table of Contents
      לבחור את הפקודה Markdown All in One: Create Table of Contents

## .md קבצי

   Ctrl + Shift + v
   קובץ להכנת הערות באופן מקצועי ומסודר

  
## תקציר
זהו הפרויקט של צד הלקוח למשחק הטריוויה.  
API הוא בנוי בעזרת ריאקט ומתקשר עם השרת של ספרינג-בוט דרך קריאות    

## מבנה תיקיות עיקרי
- **src/** – קבצי הקוד של המשחק (רכיבים, לוגיקה, עיצוב)
- **public/** – קבצים סטטיים (index.html, תמונות וכו')
- **notes/** – קובצי הסבר ותיעוד אישי (לא משפיעים על הקוד)
- **build/** – תיקייה שנוצרת לאחר הפקודה `npm run build`  
- **package.json** – מגדיר את כל הספריות והתלויות של הפרויקט

## הסבר קצר
`src/App.js` האפליקציה מתחילה מ־  
ומשם טוענת רכיבים שונים בהתאם לבחירות המשתמש.

📘 
`HELP.Components.md` ראה גם: הסבר על רכיבי המשחק ב.

## מושגים בריאקט

**props - (מאפיינים) properties קיצור של
        המידע שהקומפוננטה מקבלת מקומפונת "ההורה" שלה
        כלומר, כשקומפוננטה אחת "מכניסה" קומפוננטה אחרת בתוך הקוד שלה
        (טקסט, מספרים, מערכים, פונקציות וכו’) היא יכולה לשלוח לה נתונים 
        props והקומפוננטה שמקבלת אותם - מקבלת את כולם דרך פרמטר אחד בשם
         : דוגמא ע"י קוד
            function Greeting(props) {     //  Greeting קומפוננטה בשם 
              return <h1>Hello {props.name}!</h1>; 
            }

            <Greeting name="Moshe" />   // ככה אנחנו קוראים לה מתוך קומפוננטה אחרת
                       Hello Moshe!  : התוצאה על המסך 
      אצלנו בקוד, במקום לכתוב 
   function CategoryList(props) {
    console.log(props.categories);
     console.log(props.onSelect);
   }
        אנחנו כותבים בצורה אחרת יותר קצרה
   function CategoryList({ categories, onSelect }) {
    }   

        פרוק אוביקטים לנתונים בודדים destructuring זה נקרא 
        props-ריאקט אוטומטית שולחת את כל מה שההורה העביר כ
---------------------
        
                      
## תהליך הורשה בריאקט

  יש לנו מערכת היררכית מסודרת extends בג'אווה יש לנו מחלקות יורשות שניבנות מראש ומציינים אותן בשם
  לא ככה זה בריאקט, ריאקט עובדת על פונקציות שנקראות קומפוננטות שמרכיבות זו את זו
  והמטרה שלהן ליצור ממשק גמיש ומודולרי (Composition) לתלויות האלו קוראים הרכבה 
  ושיתוף הלוגיקה מתבצע דרך props and hooks

* #### כיוון הזרימה של המידע
* ##### מהאב לילד
  *  props נתונים יורדים דרך 
  *  App שולח ל־CategoryList את הקטגוריות והפונקציה
* ##### מהילד לאב
  * המידע חוזר למעלה דרך קריאה לפונקציה שהאב נתן 
  *  CategoryList מפעיל את onSelect() שהגיע מ־App   

flowchart TD

    A[App Component 🧠] -->|שולח props| B[CategoryList Component 🗂️]

    B -->|משתמש לוחץ על קטגוריה<br>ומפעיל onSelect(category)| A

    subgraph A_details[בתוך App]
        A1[useState: categories]:::state
        A2[useEffect - fetch categories<br>מ-API של mokafullstack.com]:::effect
        A3[handleCategorySelect(category)<br>=> fetch questions]:::func
        A4[selectedCategory, questions, currentIndex]:::state
    end

    subgraph B_details[בתוך CategoryList]
        B1[useState: showFeedbackForm, step, formData]:::state
        B2[מציג רשימת כפתורים של קטגוריות]:::ui
        B3[onClick={() => onSelect(cat)}]:::func
    end

    classDef state fill:#fdf3c1,stroke:#d1a200,stroke-width:2px;
    classDef func fill:#c1f3c7,stroke:#1fa327,stroke-width:2px;
    classDef ui fill:#c1d5f3,stroke:#2a56d1,stroke-width:2px;
    classDef effect fill:#e4c1f3,stroke:#742ad1,stroke-width:2px;

* #### הסבר לתרשים

* 🧩 App היא קומפוננטת האב.  
 היא מחזיקה את הנתונים 
 של הקטגוריות, השאלות, והשליטה הכללית במשחק.(state)

* 📦  App send to categorylist 2 props

        categories → רשימת הקטגוריות שנשלפה מהשרת. 

        onSelect → פונקציה שמטפלת בבחירת קטגוריה. 

* 🖱️ CategoryList  - onselect מציגה את הקטגוריות - כמו כפתורים - על המסך 
   כשהמשתמש לוחץ על אחת מהן היא מפעילה את הפונקציה  שקיבלה מהאב


* 🔁 App מקבלת חזרה את הקטגוריה שנבחרה<br>
     state שומרת אותה ב <br>
     שולפת מהשרת את השאלות המתאימות<br>
     QuestionCard  מציגה את המסך הבא<br>

* ### Scope, props, import/export 
* #### scope: <br>
  איפה הפונקציה "חיה" בקוד ואיפה אפשר לקרוא לה.
  הפונקציה נגישה רק באזור שבו היא מוגדרת
* #### Import/Export <br>
  יבוא ויצוא של קבצים שונים כמו קומפוננטות
* #### props <br>
   scope מעבירים מידע הם לא משנים את ה <br>
   הם רק דרך לשלוח פונקציה או ערך שכבר קיימים אל קומפוננטה אחרת 

```mermaid
flowchart LR

    %% SCOPE AREA
    subgraph A[🔹 Local Scope]
      A1[parent()]
      A2[child()]:::local
      A1 -->|מכיל| A2
      A3[external()]:::external
      A3 -. לא נגיש .-> A2
    end

    %% IMPORT / EXPORT AREA
    subgraph B[🔸 Import / Export]
      B1[mathUtils.js]
      B2[export multiplyBy3()]:::export
      B1 -->|export| B2

      B3[main.js]
      B4[import { multiplyBy3 }]:::import
      B3 -->|import| B4
    end

    %% PROPS AREA
    subgraph C[🔹 Props Transfer in React]
      C1[Parent Component 🧠]
      C2[Child Component 🧩]
      C1 -->|⬇️ props: onGreet={sayHello}| C2
      C2 -->|⬆️ קוראת לפונקציה onGreet()| C1
    end

    classDef local fill:#fef5e7,stroke:#d68910,stroke-width:2px;
    classDef external fill:#f5b7b1,stroke:#922b21,stroke-width:2px;
    classDef export fill:#d4efdf,stroke:#1e8449,stroke-width:2px;
    classDef import fill:#d6eaf8,stroke:#2471a3,stroke-width:2px;
```

**הסבר:**

* 🔹 **Scope מקומי** – פונקציה נגישה רק בתוך הפונקציה שבה הוגדרה.
* 🔸 **Import / Export** – מאפשר שימוש בפונקציות מקובץ אחר (ייבוא/ייצוא).
* 🔹 **Props ב־React** – מאפשרים *מעבר נתונים או פונקציות* בין קומפוננטות, אך לא משנים את תחום ההגדרה (scope) שלהן.





