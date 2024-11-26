# 381project-31

# Cloud URL
https://381project-31.azurewebsites.net/

# Project Information

## Project Name
**Library System**

## Group Information
- **Group No.:** 381project-31
- **Students’ Names and SIDs:**
  - CHAN WAI HING (SID: 13809428)
  - Lam Kai Yeung (SID: 13831183)
  - Li Ka Ming (SID: 13504805)
  - Yiu Ho Chun (SID: 13508379)
  - Leung Chun Pak (SID: 13713523)

## Project Overview
This Library System project is designed to manage books and users efficiently through a web-based application. It implements a variety of features including user authentication, CRUD operations for books and users, and image management for book covers.


 `server.js`:
- Dependencies: Imports required packages like `express`, `cookie-parser`, `body-parser`, `dotenv`, and others. Also imports custom modules like `header` middleware and `connectDB`.

- Configuration**:
  - Uses environment variables with `dotenv` for settings like the port.
  - Sets up the view engine as `EJS` for rendering templates.
  - Uses `cookie-parser` for handling cookies.
  - Uses `body-parser` to parse incoming request bodies in JSON format.
  - Serves static files from the `public` folder.
  - Adds custom headers with `setHeaders` middleware.

- Database Connection: The `connectDB` function (imported from `./db/db`) is called to establish a database connection before starting the server.

- Routes Initialization: Initializes all the routes by requiring and invoking `initRoutes` from `./routes/routes`.

- Server Start: The server listens on the specified port (from environment variables or defaulting to `8080`) after the database connection is successful.


`package.json`:
- axios (`^1.7.7`): A promise-based HTTP client for making requests, commonly used for API interactions.
- bcryptjs (`^2.4.3`): A library for hashing passwords using bcrypt, useful for authentication and securing user data.
- body-parser (`^1.20.3`): Middleware to parse incoming request bodies, particularly JSON and URL-encoded data.
- cookie-parser (`^1.4.7`): Middleware to parse `Cookie` header and populate `req.cookies`, enabling cookie management.
- dotenv (`^16.4.5`): Loads environment variables from a `.env` file into `process.env` for configuration purposes.
- ejs (`^3.1.10`): A template engine used for rendering HTML views with embedded JavaScript.
- express (`^4.21.1`): A popular Node.js web framework for building web applications and APIs.
- jsonwebtoken (`^9.0.2`): Implements JSON Web Tokens (JWT) for handling authentication and secure data exchange.
- method-override (`^3.0.0`): Lets you use HTTP verbs like `PUT` or `DELETE` in places where the client doesn't support it (e.g., HTML forms).
- mongoose (`^8.8.0`): An ODM (Object Document Mapper) for MongoDB, used to interact with MongoDB in an object-oriented way.
- multer (`^1.4.5-lts.1`): Middleware for handling file uploads in `multipart/form-data` forms, typically used for uploading images or documents.

`public folder` :
- style.css: This file defines the styles for your website, providing layout, colors, and general formatting for elements such as containers, login forms, buttons, and links. It includes a general reset for consistent styling, custom styles for a login page, form elements, buttons, and more.

`views folder`:
1. add-book.ejs
2. add-user.ejs
3. book-list.ejs
4. login.ejs
5. main.ejs
6. management-user.ejs


 ## CRUD
 1. Login/Logout Pages
   - Valid Login Information: Ensure you have a set of valid credentials email:`admin@hkmu.com` and password:`admin`. These might be hard-coded for testing or saved in a database.
   - Sign-In Steps:
     1. Access the Login Page: Open the `/login` route to access the login form.
     2. Input Credentials: Enter the valid email and password in the respective fields.
     3. Click 'Submit': This triggers a POST request to authenticate the user.
     4. Login Success: If credentials are correct, the user is redirected to the main page (`/main`).
   - **Logout**: Use the logout button , which removes authentication cookies and redirects the user to the login page(`/login`).

  2. CRUD Operations on Web Pages
   - Create:
     - **add-book.ejs**: `/add-book` – Click the 'Add Book' button to open a form for adding a new book.
     - **add-user.ejs**: `/add-user` – Click the 'Add User' button to open a form for adding new user details.
   - Read:
     - **book-list.ejs**: `/book-list` – Shows the list of books and all book details. 
     - **management-user.ejs**: `/management-user` – Displays the list of users and all users details.
   - Update**:
     - **Edit Buttons on Book List Page**: Clicking the 'Edit' button next to a book in `/book-list` opens an edit form, allowing users to update book details (e.g. title, author).
     - **Edit Buttons on User Management Page**: Clicking the 'Edit' button next to a user in `/management-user` opens a form for editing user details (e.g., name, email).
   - Delete:
     - **Delete Buttons on Book List Page**: Clicking the 'Delete' button next to a book in `/book-list` removes that book from the list after confirmation.
     - **Delete Buttons on User Management Page**: Clicking the 'Delete' button next to a user in `/management-user` deletes that user from the list after confirmation.

  3. RESTful CRUD Services
     # API Documentation

## Usage
Start the server with:
```bash
npm start
```

### Authentication

#### POST `/api/auth/login`
- **Description**: Authenticates a user and initiates a session.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "accessToken": "string"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "wrong username or password"
    }
    ```
- **Authentication**: None required.

#### POST `/api/auth/logout`
- **Description**: Logs out the authenticated user and terminates the session.
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "logout successful"
    }
    ```
  - **401 Unauthorized:**
    ```json
    {
      "message": "User not authenticated"
    }
    ```
- **Authentication**: Required.

### Book Management

#### POST `/api/book/create`
- **Description**: Creates a new book entry with image upload.
- **Request Body:** Form-data containing book details and an optional image file.
  - **Form-data Example:**
    - Key: `image` (file)
    - Other keys: `title`, `author`, etc.
- **Response:**
  - **201 Created:**
    ```json
    {
      "message": "Book created successfully",
      "book": {
        "id": "string",
        "title": "string",
        ...
      }
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "message": "Invalid book data"
    }
    ```
- **Authentication**: User required.

#### GET `/api/book`
- **Description**: Retrieves a list of all books.
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "string",
        "title": "string",
        ...
      }
    ]
    ```
  - **401 Unauthorized:**
    ```json
    {
      "message": "User not authenticated"
    }
    ```
- **Authentication**: User required.

#### GET `/api/book/:id`
- **Description**: Retrieves the details of a specific book by ID.
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "string",
      "title": "string",
      ...
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "Book not found"
    }
    ```
- **Authentication**: User required.

#### PUT `/api/book/edit/:id`
- **Description**: Updates the details of a specific book, including the optional image file.
- **Request Body:** Form-data containing updated book details and an optional image file.
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Book updated successfully",
      "book": {
        "id": "string",
        "title": "string",
        ...
      }
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "Book not found"
    }
    ```
- **Authentication**: User required.

#### DELETE `/api/book/delete/:id`
- **Description**: Deletes a specific book by ID.
- **Response:**
  - **204 No Content:** Successfully deleted
  - **404 Not Found:**
    ```json
    {
      "message": "Book not found"
    }
    ```
- **Authentication**: User required.

### User Management

#### GET `/api/user`
- **Description**: Retrieves a list of all users.
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "string",
        "username": "string",
        ...
      }
    ]
    ```
  - **403 Forbidden:**
    ```json
    {
      "message": "Access denied"
    }
    ```
- **Authentication**: Admin required.

#### GET `/api/user/user`
- **Description**: Retrieves the authenticated user's information.
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "string",
      "username": "string",
      ...
    }
    ```
  - **401 Unauthorized:**
    ```json
    {
      "message": "User not authenticated"
    }
    ```
- **Authentication**: User required.

#### GET `/api/user/:id`
- **Description**: Retrieves the details of a specific user by ID.
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "string",
      "username": "string",
      ...
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "User not found"
    }
    ```
- **Authentication**: Admin required.

#### POST `/api/user/create`
- **Description**: Creates a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": "string",
        "username": "string",
        ...
      }
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "message": "Invalid user data"
    }
    ```
- **Authentication**: Admin required.

#### PUT `/api/user/update/:id`
- **Description**: Updates the details of a specific user by ID.
- **Request Body:**
  ```json
  {
    "username": "string",
    "role": "string",
    ...
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "User updated successfully",
      "user": {
        "id": "string",
        "username": "string",
        ...
      }
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "User not found"
    }
    ```
- **Authentication**: Admin required.

#### DELETE `/api/user/delete/:id`
- **Description**: Deletes a specific user by ID.
- **Response:**
  - **204 No Content:** Successfully deleted
  - **404 Not Found:**
    ```json
    {
      "message": "User not found"
    }
    ```
- **Authentication**: Admin required.

### Book Image Management

#### GET `/bookImg/:bookId`
- **Description**: Retrieves the image of a specific book by book ID.
- **Response:**
  - **200 OK:** Returns the image file
  - **404 Not Found:**
    ```json
    {
      "message": "Book image not found"
    }
    ```
- **Authentication**: User required.

- **Testing with Curl**

###1. Login to Obtain Access Token
```
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

###2. Get All Books
```
curl -X GET http://localhost:3000/api/book
```
## Middleware

### `verifyRole(role)`
- **Description**: Verifies the role of the authenticated user (e.g., `user` or `admin`). Only users with the correct role are allowed access to the endpoint.

### `upload.single('image')`
- **Description**: Middleware to handle single image file uploads.

### `upload.none()`
- **Description**: Middleware to ensure no files are uploaded, used when creating or updating users.

