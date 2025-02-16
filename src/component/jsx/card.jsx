import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "../css/card.css"; // استيراد ملف الأنماط

const Card = ({ word, onCardClick, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // تهيئة الصوت عند تحميل المكون
  useEffect(() => {
    if (word.audioUrl) {
      const newAudio = new Audio(word.audioUrl);
      newAudio.preload = "metadata";

      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });

      setAudio(newAudio);
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [word.audioUrl]);

  // تحديث وقت الصوت
  useEffect(() => {
    if (audio) {
      const updateProgress = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audio]);

  // دالة لتشغيل الصوت
  const handlePlay = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  // دالة لإيقاف الصوت
  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // دالة لإعادة تشغيل الصوت
  const handleRestart = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  };

  // دالة لتحديث وقت الصوت
  const handleSeek = (value) => {
    if (audio) {
      const seekTime = parseFloat(value);
      audio.currentTime = seekTime;
    }
  };

  // دالة لتحويل الوقت إلى تنسيق MM:SS
  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="card" onClick={() => onCardClick(word)}>
      <div className="card-header">
        <h3>{word.word}</h3>
      </div>
      <div className="card-body">
        <p>
          <strong>Meaning:</strong> {word.mean}
        </p>
        <p>
          <strong>Arabic:</strong> {word.arabic}
        </p>
      </div>
      <div className="card-footer">
        <button className="edit-btn">Edit</button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(word.id);
          }}
        >
          Delete
        </button>
      </div>

      {/* أدوات التحكم في الصوت */}
      {audio && (
        <div className="audio-controls">
          <button
            className="audio-btn"
            onClick={isPlaying ? handlePause : handlePlay}
          >
            <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <button className="audio-btn" onClick={handleRestart}>
            <i className="fas fa-redo-alt"></i>
          </button>
          <div className="audio-progress">
            <input
              type="range"
              min="0"
              max={duration || 0.1}
              value={currentTime}
              onChange={(e) => handleSeek(e.target.value)}
              style={{
                background: `linear-gradient(90deg, #8a85ff ${
                  (currentTime / (duration || 0.1)) * 100
                }%, #2e2e2e 0%)`,
              }}
            />
            <div className="time-indicator">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;