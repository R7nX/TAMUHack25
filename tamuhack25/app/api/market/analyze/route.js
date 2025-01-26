import { spawn } from "child_process";

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return new Response(
      JSON.stringify({ error: "URL is required." }),
      { status: 400 }
    );
  }

  try {
    const pythonProcess = spawn("python3", ["llama3.py", url]);

    let result = "";
    for await (const chunk of pythonProcess.stdout) {
      result += chunk.toString();
    }

    const error = await new Promise((resolve) =>
      pythonProcess.stderr.on("data", (chunk) => resolve(chunk.toString()))
    );

    if (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to analyze the news." }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ result: result.trim() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
}
