
  const { MongoClient } = require('mongodb'); // Import MongoDB driver
  const uri = "mongodb+srv://Mohit:itz_tihoM34@cluster0.4oahv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const dbName = "practice_data"; // Replace with your database name
  const collectionName = "mohit"; // Replace with your collection name

  // Function to retrieve data from the database
  async function retrieveData(query = {}) {
    const client = new MongoClient(uri);

    try {
      // Connect to MongoDB
      await client.connect();
      console.log("Connected to MongoDB");

      // Access the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Retrieve data based on the query
      const data = await collection.find(query).toArray();
      console.log("Retrieved Data:", data);

      return data; // Return the data if needed elsewhere
    } catch (err) {
      console.error("Error retrieving data:", err);
    } finally {
      // Close the connection
      await client.close();
      console.log("Connection closed");
    }
  }

  // Example usage
  retrieveData({ age: { $gte: 25 } }) // Query to fetch documents where age >= 25
    .then((data) => {
      console.log("Final Data:", data);
    })
    .catch((err) => console.error("Error:", err));







  // // Create a MongoClient instance
  // const client = new MongoClient(uri);

  // async function insertData() {
  //     try {
  //         // Connect to MongoDB
  //         await client.connect();
  //         console.log("Connected to MongoDB");

  //         // Select the database and collection
  //         const database = client.db("practice_data"); // Database name
  //         const collection = database.collection("mohit"); // Collection name

  //         // Data to insert
  //         const data = [
  //             { name: "John Doe", age: 25, city: "New York" },
  //             { name: "Jane Smith", age: 30, city: "London" },
  //             { name: "Mohit", age: 28, city: "Delhi" }
  //         ];

  //         // Insert the data
  //         const result = await collection.insertMany(data); // Use `insertOne` for a single document
  //         console.log(`${result.insertedCount} documents were inserted`, result.insertedIds);

  //     } catch (error) {
  //         console.error("Error inserting data:", error);
  //     } finally {
  //         // Close the connection
  //         await client.close();
  //         console.log("MongoDB connection closed");
  //     }
  // }

  // // Call the function
  // insertData();

