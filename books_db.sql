CREATE DATABASE books_db;

USE books_db;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  genre ENUM('fiction', 'non-fiction') NOT NULL
);

INSERT INTO books (title, author, review, genre)
VALUES
('Scythe', 'Neal Shusterman', 'Such an easy read. I like how the characters interact with each other.', 'fiction'),
('On Earth We''re Briefly Gorgeous', 'Ocean Vuong', 'What a book.. Cried A LOT reading this one. Written nicely.', 'fiction'),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'A thought-provoking exploration of our history.', 'non-fiction');
