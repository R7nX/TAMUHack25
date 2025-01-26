import { spawn } from "child_process";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Promise((resolve, reject) => {
      // Spawn the Python process
      const pythonProcess = spawn("python3", ["llama3.py", url], {
        cwd: "/path/to/llama3", // Change this to the directory where llama3.py is located
      });

      let output = "";
      let errorOutput = "";

      // Collect stdout data
      pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      // Collect stderr data
      pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      // Handle process exit
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          resolve(
            new Response(
              JSON.stringify({ result: output.trim() }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            )
          );
        } else {
          console.error("Python error:", errorOutput);
          reject(
            new Response(
              JSON.stringify({ error: "Failed to analyze the news." }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error("Error invoking Python script:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
