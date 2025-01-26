import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI; // Add your MongoDB URI to .env.local

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// For development, use a global variable to store the connection
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production, use a normal variable
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
