"use client";

import { useState } from "react";
import Header from '../../components/header'
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
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <Header />
      <div style={{marginLeft:"75px"}}>
      <h1>Market Page</h1>
      <p>Enter a stock ticker to get the latest news and analyze sentiment.</p>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker (e.g., AAPL)"
        maxLength={4}
        style={{
          padding: "10px",
          marginRight: "10px",
          width: "300px",
          fontSize: "16px",
          textTransform: 'uppercase',
        }}
      />
      <button onClick={fetchNews} disabled={loading} width="50px">
        {loading ? "Loading..." : "Get News"}
      </button>
      </div>

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
      <Footer />
    </div>
  );
}
