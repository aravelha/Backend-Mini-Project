import promptSync from 'prompt-sync';
import axios from 'axios';

const prompt = promptSync();

async function main() {
  while (true) {
      console.log('1. Create Book');
      console.log('2. Update Book');
      console.log('3. View All Books');
      console.log('4. View Book by ID'); // Tambahkan pilihan untuk get by ID
      console.log('5. View Book by Genre'); // Tambahkan pilihan untuk get by Genre
      console.log('6. Delete Book'); // Update pilihan delete
      console.log('7. Exit');

      const choice = prompt('Choose an option: ');

      switch (choice) {
          case '1':
              await createBook();
              break;
          case '2':
              await updateBook();
              break;
          case '3':
              await viewBooks();
              break;
          case '4':
              await viewBookById(); // Panggil fungsi view by ID
              break;
          case '5':
              await viewBooksByGenre(); // Panggil fungsi view by Genre
              break;
          case '6':
              await deleteBook(); // Panggil fungsi delete
              break;
          case '7':
              console.log('Exiting...');
              return;
          default:
              console.log('Invalid choice. Please try again.');
      }
  }
}

// Fungsi yang sudah ada
async function createBook() {
  const title = prompt("Enter the book title: ");
  const author = prompt("Enter the author's name: ");
  const review = prompt("Enter your review: ");
  const genre = prompt("Enter the genre (fiction/non-fiction): ");

  try {
      const response = await axios.post("http://localhost:3000/create-books", {
          title,
          author,
          review,
          genre,
      });
      console.log("Book created successfully", response.data);
  } catch (error) {
      console.error("Error creating book:", error.response?.data || error.message);
  }
}

async function updateBook() {
  const id = prompt("Enter the book ID to update: ");
  const title = prompt("Enter the new book title: ");
  const author = prompt("Enter the new author's name: ");
  const review = prompt("Enter the new review: ");
  const genre = prompt("Enter the new genre (fiction/non-fiction): ");

  try {
      const response = await axios.put(`http://localhost:3000/books/${id}`, {
          title,
          author,
          review,
          genre,
      });
      console.log("Book updated successfully", response.data);
  } catch (error) {
      console.error("Error updating book:", error.response?.data || error.message);
  }
}

async function viewBooks() {
  try {
      const response = await axios.get("http://localhost:3000/books");
      console.log("Books:", response.data);
  } catch (error) {
      console.error("Error fetching books:", error.response?.data || error.message);
  }
}

// Fungsi untuk mendapatkan buku berdasarkan ID
async function viewBookById() {
  const id = prompt("Enter the book ID to view: ");

  try {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      console.log("Book Details:", response.data);
  } catch (error) {
      console.error("Error fetching book by ID:", error.response?.data || error.message);
  }
}

// Fungsi untuk mendapatkan buku berdasarkan genre
async function viewBooksByGenre() {
  const genre = prompt("Enter the genre to view books: ");

  try {
      const response = await axios.get(`http://localhost:3000/books/genre/${genre}`);
      console.log("Genre:", response.data);
  } catch (error) {
      console.error("Error fetching books by genre:", error.response?.data || error.message);
  }
}

// Fungsi untuk menghapus buku
async function deleteBook() {
  const id = prompt("Enter the book ID to delete: ");

  try {
      const response = await axios.delete(`http://localhost:3000/books/${id}`);
      console.log("Book deleted successfully", response.data);
  } catch (error) {
      console.error("Error deleting book:", error.response?.data || error.message);
  }
}

main();
