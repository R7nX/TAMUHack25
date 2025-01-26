"use client";

import { useState } from "react";
import Header from '../../components/header'
import Footer from '../../components/footer'

import Header from "../../components/header"
import Footer from '../../components/footer'


export default function Market() {
  const [ticker, setTicker] = useState("");
  const [news, setNews] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch(`/api/market/news?ticker=${ticker}`);
      const data = await res.json();

      if (res.ok) {
        setNews(data.news);
      } else {
        console.error(data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeNews = async (url) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/market/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        setAnalysis({ url, result: data.result });
      } else {
        console.error(data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to analyze news.");
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    
    <div style={{ maxWidth: "800px", margin: "0" }}>
      <Header />
      <h1>Market Page</h1>
      <p>Enter a stock ticker to get the latest news and analyze sentiment.</p>
=======
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <Header />
      <h1 style={{ padding: "40px", margin: "0 auto" }}>Market Page</h1>
      <p style={{ padding: "40px", margin: "0 auto" }}>Enter a stock ticker to get the latest news and analyze sentiment.</p>
>>>>>>> 2782f965d6177bd41024e77ac4219373cf283287
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker (e.g., AAPL)"
        style={{
          marginRight: "10px",
          width: "300px",
          fontSize: "16px",
        }}
      />
      <button onClick={fetchNews} disabled={loading}>
        {loading ? "Loading..." : "Get News"}
      </button>
      

      {news.length > 0 && (
        <div>
          <h2>News Articles for {ticker.toUpperCase()}</h2>
          <ul>
            {news.map((article, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.headline}
                </a>
                <button
                  onClick={() => analyzeNews(article.url)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "14px",
                  }}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      

      {analysis && (
        <div>
          <h2>Analysis Result</h2>
          <p>
            The article at <a href={analysis.url}>{analysis.url}</a> is{" "}
            <strong>{analysis.result}</strong>.
          </p>
          
        </div>
      )}
<<<<<<< HEAD
      
=======
>>>>>>> 2782f965d6177bd41024e77ac4219373cf283287
      <Footer />
    </div>
  );
}
