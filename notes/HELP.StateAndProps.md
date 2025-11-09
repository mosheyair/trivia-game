# ⚙️ הסבר על state ו־props
         ## state
    - מצב פנימי של רכיב.
    - נשמר רק בתוך אותו רכיב.
    - נוצר ע"י הקריאה:
        ```js
          const [count, setCount] = useState(0);  
         ##props
  נתונים שעוברים מרכיב אב לרכיב בן 
        לדוגמא:
   <CategoryList categories={categories} onSelect={handleSelect} />
## כלל אצבע:
state - אם הנתון משתנה רק בתוך רכיב
props - אם הנתון מגיע מבחוץ
 הופך את הקוד לקריא ויעיל יותר state ו־props שימוש נכון ב־  

---

### 🌐 4. `HELP.APIConnection.md`
```markdown
# 🌐 חיבור ל־API של Spring Boot

## תקשורת עם השרת
 fetch or axion בשרת דרך API האפליקציה מתחברת ל  
לדוגמה:
  ```js
        fetch("https://api.mokafullstack.com/categories")
        .then(response => response.json())
        .then(data => setCategories(data));

 (localhost מול production)  לסביבה תואם URL-ה אם לבדוק תמיד  
     בשגיאות לטיפול catch() או try...catch -ב להשתמש 
    apiService.js כמו נפרד בקובץ API -ה של הפונקציות כל את לשים אפשר
## להפרדה דוגמא
           // src/services/apiService.js
        export const getCategories = async () => {
         const res = await fetch("/api/categories");
          return res.json();
    };
---

### 🧭 5. `HELP.Routing.md`
```markdown
# 🧭 ניווט באפליקציה (Routing)

## הסבר כללי
האפליקציה משתמשת ב־React Router כדי לעבור בין מסכים שונים:
- עמוד קטגוריות
- עמוד שאלות
- עמוד סיום / תוצאות

## דוגמה:
```js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import QuestionPage from "./components/QuestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/question/:id" element={<QuestionPage />} />
      </Routes>
    </BrowserRouter>
  );
}



    במשחק חלקה זרימה שומר  /question/:id/ ,/   בנתיבים נכון שימוש 
    

