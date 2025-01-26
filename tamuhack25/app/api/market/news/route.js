import fetch from "node-fetch";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker")?.toUpperCase();

  if (!ticker) {
    return new Response(
      JSON.stringify({ error: "Ticker is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  try {
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${thirtyDaysAgo}&to=${today}&token=${finnhubApiKey}`;

    console.log("Finnhub API URL:", url); // Log the request URL

    const response = await fetch(url);
    const data = await response.json();

    console.log("Finnhub API Response:", data); // Log the response

    if (!Array.isArray(data) || data.length === 0) {
      return new Response(
        JSON.stringify({ news: [], message: "No news found for this ticker." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ news: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch news." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}