// src/components/CategoryList.js
import React from "react";

function CategoryList({ categories, onSelect }) {
  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat)} // 👈 מעביר את הקטגוריה שנבחרה
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
    </div>
  );
}

export default CategoryList;
