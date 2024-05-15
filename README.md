# AltSchool Africa Backend Assessment

## [Blog API](https://altschool-backend-assessment.onrender.com/)
### https://altschool-backend-assessment.onrender.com/

An API created with Express, Passport, JSON Web Token and MongoDB, 
Absolutely Free 

---
# Authentication API Documentation
This API provides endpoints for user authentication including signup and login using email and password.

## Signup

### Create New User Account

- **URL**: `/signup`
- **Method**: `POST`
- **Request Body**:
  - `firstname`: First name of the user (String)
  - `surname`: Surname of the user (String)
  - `email`: Email address of the user (String)
  - `password`: Password for the account (String)
- **Response**: 
  - `message`: Success message
  - `user`: Newly created user object

## Login

### Authenticate User

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  - `email`: Email address of the user (String)
  - `password`: Password for the account (String)
- **Response**: 
  - `token`: JWT token for authenticated user

---

## Passport Authentication Strategies

### JWT Strategy

- **Name**: JWT Strategy
- **Description**: This strategy verifies JWT tokens sent by clients in the Authorization header.
- **Usage**:
  - It extracts JWT token from the Authorization header.
  - Verifies the token using the provided JWT secret.
  - Returns the user object associated with the token if it's valid.

### Local Strategy

- **Name**: Local Strategy
- **Description**: This strategy authenticates users using their email and password.
- **Usage**:
  - It verifies user credentials against the database.
  - If the user is found and the password is correct, it returns the user object.
  - If the user is not found or the password is incorrect, it returns an error message.

## Passport Configuration

The `auth.js` file configures Passport authentication strategies for the application.

---

# Blog API Documentation

## Introduction

This is the documentation for the RESTful API of the blog application. The API is built using Node.js with Express.js framework and MongoDB for data storage. It provides endpoints for creating, retrieving, updating, and deleting articles, as well as user authentication for protected routes.

## Authentication

To access protected routes, you need to authenticate using JSON Web Tokens (JWT). Send a POST request to `/login` with valid credentials to obtain a token. The token should be included in the `Authorization` header for subsequent requests.

## Routes

### Create New Article

- **URL:** `/blog/new`
- **Method:** `POST`
- **Authentication:** Required (JWT)
- **Request Body:**
  - `title`: String (required) - Title of the article
  - `description`: String (required) - Brief description of the article
  - `state`: String (required) - State of the article (published/draft)
  - `body`: String (required) - Content of the article
  - `tag`: List(required) - tags of the article [blog, writing, article]
- **Response:**
  - `message`: String - Success message
  - `blog`: Object - Created article object

### Get Articles

- **URL:** `/blog`
- **Method:** `GET`
- **Query Parameters:**
  - `page`: Number - Page number (default: 1)
  - `limit`: Number - Number of articles per page (default: 20)
  - `read_count`: Number - Sort articles by read count (default: -1)
  - `title`: String - Search articles by title
- **Response:** Array of article objects

### Get User's Articles

- **URL:** `/blog/user`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Query Parameters:**
  - `page`: Number - Page number (default: 1)
  - `limit`: Number - Number of articles per page (default: 20)
  - `state`: String or Array - State of articles (published/draft, default: both)
- **Response:** Array of user's article objects

### Get Article by ID

- **URL:** `/blog/:id`
- **Method:** `GET`
- **Path Parameters:**
  - `id`: String (required) - ID of the article
- **Response:**
  - `article`: Object - Article details
  - `author`: Object - Author details (name and email)

### Update Article

- **URL:** `/blog/:id`
- **Method:** `PUT`
- **Authentication:** Required (JWT)
- **Path Parameters:**
  - `id`: String (required) - ID of the article
- **Request Body:** Updated article fields
- **Response:**
  - `message`: String - Success message
  - `article`: Object - Updated article object

### Delete Article

- **URL:** `/blog/:id`
- **Method:** `DELETE`
- **Authentication:** Required (JWT)
- **Path Parameters:**
  - `id`: String (required) - ID of the article
- **Response:**
  - `message`: String - Success message

