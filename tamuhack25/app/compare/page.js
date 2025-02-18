"use client";

import React, { useState } from 'react';
import styles from "./compare.module.css";
import Header from "../../components/header"
import Footer from '../../components/footer'
import finnhub from 'finnhub'

let companyName = Array(5).fill('');
let companyStockData = Array(5).fill('');
let companyQuote = Array(5).fill('');


export default function Home() {
    //Finnhub API
    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cub1b1pr01qof06jku50cub1b1pr01qof06jku5g";
    const finnhubClient = new finnhub.DefaultApi();
    
    //create input fields for companies
    const [values, setValues] = useState(Array(5).fill(''));

    const handleChange = (index, e) => {
    let { value } = e.target;
    // Allow only letters:
    value = value.replace(/[^a-zA-Z]/g, '');
    // Limit length to 4 characters:
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
    finnhubClient.recommendationTrends(value, (error, data, response) => {
        companyStockData[index] = data[0];
        document.getElementById((index+4)*2).textContent= (companyStockData[index].buy+companyStockData[index].strongBuy) + " Buy/ "+ companyStockData[index].hold+" Hold";
      });
    finnhubClient.quote(value, (error, data, response) => {
        companyQuote[index] = data;
        document.getElementById((index+9)*2).textContent= "$"+(companyQuote[index].c)+" (Low: $"+companyQuote[index].l+" High: $"+companyQuote[index].h+")";
      });
    finnhubClient.companyProfile2({'symbol': value}, (error, data, response) => {
        companyName[index] = data.name;
        document.getElementById(index).textContent=companyName[index];
      });
    
    };

    

    return (
      <>
        
        <Header />
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1>Track the market</h1>
                <p>Compare different stock.</p>
            </section>
        <h2 style={{textAlign:"center"}} >Track companies</h2>
        </div>

        <div className={styles.companyInput}>
            {values.map((val, idx) => (
            <div key={idx}>
                <input
                type="text"
                value={val}
                onChange={(e) => handleChange(idx, e)}
                maxLength={4}
                placeholder='Enter a company'
                style={{ textTransform: 'uppercase' }}
                />
                <p id={idx}></p>
                <p id={(idx+4)*2}></p>
                <p id={(idx+9)*2}></p>
            </div>
        ))}
        </div>

        <Footer />
      </>
      
    );
    
  }
