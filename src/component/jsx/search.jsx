import React, { useState } from "react";
import "../css/search.css"; // استيراد أنماط البحث

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // دالة للتعامل مع تغيير نص البحث
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // تمرير قيمة البحث إلى المكون الأب
  };

  // دالة لمسح نص البحث
  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch(""); // إعادة تعيين البحث في المكون الأب
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by word, meaning, or arabic..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={handleClearSearch}>
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;