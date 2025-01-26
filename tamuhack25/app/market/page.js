"use client";

import React, { useState } from 'react';
import styles from "./market.module.css";
import Header from "../../components/header"
import Footer from '../../components/footer'


export default function Home() {
    return (
      <>
        <Header />
        <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Track the market</h1>
          <p>heh placeholder text.</p>
        </section>
        </div>
        <Footer />
      </>
    );
  }