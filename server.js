import express from 'express';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());

let db;

// Menghubungkan ke database saat server dijalankan
(async () => {
    db = await connectDB();
})();

// Endpoint Cek koneksi server
app.get('/', (req, res) => {
    res.send('Connected!');
});


// CRUD

// Endpoint POST -  menambahkan buku baru
app.post('/create-books', async (req, res) => {
    const { title, author, review, genre } = req.body; 
    try {
        const [result] = await db.query(
            'INSERT INTO books (title, author, review, genre) VALUES (?, ?, ?, ?)',
            [title, author, review, genre]
        );
        res.json({
            "message": "Book created successfully",
            "title": title,
            "author": author,
            "review": review,
            "genre" : genre
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint GET - Menampilkan semua buku
app.get('/books', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM books');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint GET - Menampilkan buku berdasarkan ID
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint GET - Menampilkan buku berdasarkan Genre
app.get('/books/genre/:genre', async (req, res) => {
  const { genre } = req.params;
  try {
      const [results] = await db.query('SELECT * FROM books WHERE genre = ?', [genre]);
      if (results.length === 0) {
          return res.status(404).json({ message: 'No books found for this genre' });
      }
      res.json(results);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Endpoint PUT - Update data buku
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, review, genre } = req.body;
    try {
        await db.query(
            'UPDATE books SET title = ?, author = ?, review = ?, genre = ? WHERE id = ?',
            [title, author, review, genre, id]
        );
        const [updatedBook] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        res.json({ message: 'Book updated successfully', updatedBook: updatedBook[0] }); // Data yang telah diperbarui
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });
  


// Endpoint untuk menghapus buku
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Menjalankan server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
