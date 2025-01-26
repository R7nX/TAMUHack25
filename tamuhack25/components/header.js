"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if a token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false); // Update state
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My App</h1>
      <nav className={styles.nav}>
        <Link href="/home">Home</Link>
        <Link href="/budget">Budget</Link>
        <Link href="/market">Market</Link>
        <Link href="/compare">Compare</Link>
        {!isLoggedIn ? (
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
