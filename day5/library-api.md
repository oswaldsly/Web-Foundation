# Library Books API Design

## Overview

The Library Books API allows clients to list, retrieve, create, update, and delete books. It also supports searching for books by author.

Base path: `/books`

## Endpoints

### 1. List all books

- **Method:** GET
- **Path:** `/books`
- **Description:** Returns a list of all books in the library.
- **Success status:** `200 OK`
- **Request body:** None

### 2. Get one book

- **Method:** GET
- **Path:** `/books/{id}`
- **Description:** Returns details of a book with the specified ID.
- **Success status:** `200 OK`
- **Request body:** None

Example: `GET /books/42`

### 3. Create a book

- **Method:** POST
- **Path:** `/books`
- **Description:** Creates a new book in the library.
- **Success status:** `201 Created`

Example request body:

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}
```

### 4. Update a book

- **Method:** PUT
- **Path:** `/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Success status:** `200 OK`

Example request body:

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}
```

### 5. Delete a book

- **Method:** DELETE
- **Path:** `/books/{id}`
- **Description:** Deletes the book with the specified ID.
- **Success status:** `204 No Content`
- **Request body:** None

Example: `DELETE /books/42`

### 6. List books by author

- **Method:** GET
- **Path:** `/books?author={authorName}`
- **Description:** Returns books written by the specified author.
- **Success status:** `200 OK`
- **Request body:** None

Example: `GET /books?author=Chinua%20Achebe`

## Error Responses

### 400 Bad Request

Returned when the request contains invalid data or required fields are missing.

Example: Creating a book without a title or author.

### 404 Not Found

Returned when the requested book does not exist.

Example: Requesting `GET /books/9999` when book ID 9999 is not in the library.
