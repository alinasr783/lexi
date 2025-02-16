import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "@fortawesome/fontawesome-free/css/all.css";
import "../css/header.css";

export default function Header() {
  const [userData, setUserData] = useState({
    unreadCount: 0,
    greeting: ""
  });

  const [greetings, setGreetings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const fetchGreetings = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("setting").select("greeting").single();
      if (error) throw error;
      if (data?.greeting) {
        setGreetings(data.greeting);
      }
    } catch (error) {
      console.error("Error fetching greetings:", error.message);
    }
  }, []);

  const getGreeting = useCallback(() => {
    if (!greetings) return "";

    const hour = new Date().getHours();
    let timePeriod = "morning";

    if (hour >= 5 && hour < 12) timePeriod = "morning";
    else if (hour >= 12 && hour < 17) timePeriod = "afternoon";
    else if (hour >= 17 && hour < 22) timePeriod = "evening";
    else timePeriod = "night";

    return greetings[timePeriod]?.[Math.floor(Math.random() * greetings[timePeriod].length)] || "";
  }, [greetings]);

  const fetchData = useCallback(async (email) => {
    if (!email) return;

    try {
      const { count, error } = await supabase
        .from("notification")
        .select("id", { count: "exact" })
        .eq("email", email)
        .eq("is_read", false);

      if (error) throw error;

      setUserData(prev => ({
        ...prev,
        unreadCount: count ?? 0
      }));
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGreetings();
  }, [fetchGreetings]);

  useEffect(() => {
    if (greetings) {
      const greeting = getGreeting();
      setUserData(prev => ({ ...prev, greeting }));
    }
  }, [greetings, getGreeting]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        fetchData(user.email);
      }
    });

    return () => unsubscribe();
  }, [fetchData]);

  return (
    <div className="home-header" onClick={()=>setClick(!click)}>
      <div className="home-header-content">
        {loading ? (
          <Skeleton variant="text" width="80%" height="100%" />
        ) : (
          <div className="home-header-content-greeting">
            {userData.greeting}
          </div>
        )}

        <div className="home-header-content-notification">
          {loading ? (
            <Skeleton variant="circular" width={45} height={45} />
          ) : (
            <div
              className={`home-header-content-notification-bg`}
              onClick={() => navigate("/notification")}
            >
              <Badge
                badgeContent={userData.unreadCount}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "#f4f4f4",
                    backgroundColor: "#37474f",
                  },
                }}
              >
                <i className="fas fa-bell"></i>
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}