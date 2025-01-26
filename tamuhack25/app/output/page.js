"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import data from "./sample.json";

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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Analysis Result</h1>
      {output ? (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {output}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
      <button
        style={{ marginTop: "20px" }}
        onClick={() => router.push("/")} // Redirect back to the home page
      >
        Go Back
      </button>
    </div>
  );
}
