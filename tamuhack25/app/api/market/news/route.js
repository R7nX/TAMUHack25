import fetch from "node-fetch";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return new Response(
      JSON.stringify({ error: "Ticker is required." }),
      { status: 400 }
    );
  }

  try {
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    const response = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2023-01-01&to=2023-12-31&token=${finnhubApiKey}`
    );
    const data = await response.json();

    return new Response(
      JSON.stringify({ news: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch news." }),
      { status: 500 }
    );
  }
}
