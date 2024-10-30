# Backend-Mini-Project
Backend mini project for KSM Android - Reading list / tracker

This Book Tracker is a backend mini project that allows users to perform CRUD (Create, Read, Update, Delete) operations on a book database. It is built with Node.js, Express, and uses MySQL as the database.

# Features
* Add a new book to the list
* Retrieve all books
* Retrieve a book by ID
* Retrieve books by genre
* Update book information
* Delete a book from the list

# Installation
1. Clone this repository
2. Install dependencies with npm
```
npm install
```
3. Database Configuration <br>
   Edit the password in the '.env' file to your root password.
4. Database Setup <br>
   Create a MySQL database using the syntaxs in 'books_db.sql'
5. Start the server
```
npm start
```

# Endpoints
### 1. Create a New Book Review
* URL: /create-books
* Method: POST
* Body
```
{
    "title": "Book Title",
    "author": "Author Name",
    "review": "Book review",
    "genre": "fiction" // or "non-fiction"
}

```

### 2. Read or Retrieve Books by Books
* URL: /books
* Method: GET
* Response: An array of all book records in the database.

### 3. Read or Retrieve All Books
* URL: /books/:id
* Method: GET
* Params: id (Book ID)
* Response: Book data for the specified ID.

### 4. Read Retrieve Books by Genre
* URL: /books/genre/:genre
* Method: GET
* Params: genre (e.g., fiction or non-fiction)
* Response: An array of books that match the specified genre.

### 5. Update Book
* URL: /books/:id
* Method: PUT
* Params: id (Book ID)
* Body:
```
{
    "title": "Book Title",
    "author": "Author Name",
    "review": "Book review",
    "genre": "fiction" // or "non-fiction"
}
```
* Response: Displays a success message with the updated book details.

### 6. Delete Book
* URL: /books/:id
* Method: DELETE
* Params: id (Book ID)
* Response: Displays a success message once the book is deleted.

# Testing the API with Postman
1. Open Postman.
2. Create a New Request and set the URL and HTTP method based on the endpoint you want to test.
3. For POST and PUT endpoints, input book data in JSON format in the body section.
4. Send the request and view the response from the API.




