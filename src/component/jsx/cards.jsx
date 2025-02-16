import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from "./card"; // استيراد مكون البطاقة
import "../css/card.css"; // استيراد أنماط البطاقة
import "../css/search.css"; 

const Cards = () => {
  console.log("Component Rendered");

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // جلب الكلمات من قاعدة البيانات
  const getWords = useCallback(async () => {
    if (!email) {
      console.log("No email found, skipping fetch");
      return;
    }

    console.log("Fetching words for email:", email);
    setLoading(true);

    const { data, error } = await supabase
      .from("words")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error fetching words:", error.message);
    } else {
      console.log("Fetched words:", data);
      setWords(data || []);
    }

    setLoading(false);
  }, [email]);

  // فلترة الكلمات حسب البحث
  const filteredWords = words.filter((word) => {
    const match = 
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.mean.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.arabic.toLowerCase().includes(searchTerm.toLowerCase());

    console.log(`Checking word "${word.word}" -> Match:`, match);
    return match;
  });

  // دالة حذف الكلمة
  const deleteWord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this word?")) return;

    console.log("Deleting word with ID:", id);
    const { error } = await supabase.from("words").delete().eq("id", id);

    if (error) {
      console.error("Error deleting word:", error.message);
    } else {
      console.log("Word deleted successfully");
      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    }
  };

  // دالة النقر على البطاقة
  const handleCardClick = (word) => {
    console.log("Card clicked:", word);
  };

  // جلب الكلمات عند تغيير البريد الإلكتروني
  useEffect(() => {
    console.log("Setting up Firebase auth listener...");
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. User:", user);
      setEmail(user ? user.email : null);
    });

    return () => {
      console.log("Unsubscribing Firebase auth listener...");
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Email changed:", email);
    getWords();
  }, [email, getWords]);

  return (
    <div className="cards-container">
      {/* شريط البحث */}
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search by word, meaning, or arabic..."
            value={searchTerm}
            onChange={(e) => {
              console.log("Search term updated:", e.target.value);
              setSearchTerm(e.target.value);
            }}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => {
                console.log("Clearing search input");
                setSearchTerm("");
              }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* عرض البطاقات */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredWords.length === 0 ? (
        <div className="no-words">No matching words found...</div>
      ) : (
        <div className="cards-grid">
          {filteredWords.map((word) => (
            <Card
              key={word.id}
              word={word}
              onCardClick={handleCardClick}
              onDelete={deleteWord}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;