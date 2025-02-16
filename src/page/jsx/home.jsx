import React from 'react';
import Header from '../../component/jsx/header.jsx';
import Cards from '../../component/jsx/cards.jsx'; // استيراد مكون البطاقات
import '../css/home.css'; // استيراد أنماط الصفحة الرئيسية

export default function Home() {
  return (
    <div className='home'>
      <Header />
      <div className='breakline'></div>
      <Cards />
    </div>
  );
}