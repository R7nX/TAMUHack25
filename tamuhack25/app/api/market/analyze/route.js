import { writeFileSync } from "fs";
import { spawn } from "child_process";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      console.error("Error: URL is missing in the request body.");
      return new Response(
        JSON.stringify({ error: "URL is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Received URL:", url);

    // Create a temporary file to store the URL
    const tempFile = "C:/Users/baoph/OneDrive - University of Utah/Documents/tamuHack/TAMUHack25/tamuhack25/url_input.txt"; // Adjust for Windows: e.g., "C:\\temp\\url_input.txt"

    try {
      // Write the URL to the file
      writeFileSync(tempFile, url, { encoding: "utf-8" });
      console.log(`URL written to file: ${tempFile}`);

      // Spawn the Python process
      const pythonProcess = spawn("python3", ["./llama3.py", tempFile], {
        cwd: "C:/Users/baoph/OneDrive - University of Utah/Documents/tamuHack/TAMUHack25/tamuhack25/llama3/", // Update to the directory containing llama3.py
      });

      pythonProcess.stdout.on("data", (data) => {
        console.log("Python stdout:", data.toString());
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("Python stderr:", data.toString());
      });

      pythonProcess.on("close", (code) => {
        if (code === 0) {
          console.log("Python script completed successfully.");
        } else {
          console.error(`Python script exited with code ${code}.`);
        }
      });

      return new Response(
        JSON.stringify({ message: "URL written and script executed successfully." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("Error writing URL to file or executing script:", err);
      return new Response(
        JSON.stringify({ error: "Failed to process URL." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Unhandled error in API route:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
