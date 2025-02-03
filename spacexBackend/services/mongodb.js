const express = require('express');
const { MongoClient,ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string
const uri = 'mongodb+srv://Mohit:itz_tihoM34@cluster0.4oahv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

const dbName = 'practice_data';  // Replace with your MongoDB database name
let usersCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('MongoDB connected');
    const db = client.db(dbName);
    usersCollection = db.collection('Users');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

// Register route
app.post('/register', async (req, res) => {
  const { username, password, role = 'operator' } = req.body; // Default role to 'operator'

  try {
    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password

    // Create the new user object with hashed password
    const newUser = {
      username,
      password: password,
      role,
    };

    // Insert the new user into the database
    const result = await usersCollection.insertOne(newUser);
    console.log(result);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/users', async (req, res) => {
    const users = await usersCollection.find().toArray();
    res.json(users);
  });
  
  app.post('/users', async (req, res) => {
    const newOrder = req.body;
    const result = await usersCollection.insertOne(newOrder);
    res.json(result);
  });
  

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID received for deletion:", id); // Debugging log

    try {
        // Validate the ID format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Access the users collection and delete the user
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

        // Check if a user was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});
  
  





// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare entered password with stored hashed password
    if(password !==user.password )
     {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token with user role included
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route to check user role
app.get('/home', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check user role and send data accordingly
    const { role } = decoded;
    if (role === 'owner') {
      res.json({ message: 'Welcome, Owner!', userId: decoded.userId });
    } else if (role === 'operator') {
      res.json({ message: 'Welcome, Operator!', userId: decoded.userId });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
