"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "./sample.json";
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function OutputPage() {
  const [output, setOutput] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch the content of the JSON file when the page loads
    const fetchOutput = async () => {
      try {
        // const res = await fetch("/sample.json"); // Change to your JSON file
          setOutput(data["analysis"]);
          // Assuming the JSON has a key "analysisResult" that holds the content
      } catch (error) {
        console.error("Error fetching sample.json:", error);
        setOutput("Error: Unable to fetch the analysis.");
      }
    };

    fetchOutput();
  }, []);

  return (
    <div>
      <Header />
      <h1 style={{maxWidth: "1000px", display: "block", marginLeft: "auto", marginRight : "auto"}}>Analysis Result</h1>
      {output ? (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#2e2e2e",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "1000px",
            display: "block",
            marginLeft: "auto",     
            marginRight : "auto"
          }}
        >
          {output}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
      <button
        style={{ marginTop: "20px",
          display: "block",
          marginLeft: "auto",     
          marginRight : "auto",
        height: "50px",
        width: "90px",}}
        onClick={() => router.push("/")} // Redirect back to the home page
      >
        Go Back
      </button>
      <Footer />
    </div>
  );
}
