const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Book = require('./models/book');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB (Library)');
}).catch((err) => {
    console.error(err);
});

// Root Route
app.get('/', (req, res) => {
    res.send('Book Library API is running!');
});

// Create a Book
app.post('/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get All Books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Book by ID
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Book
app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete Book
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Book Library API server running on port 3001');
});
