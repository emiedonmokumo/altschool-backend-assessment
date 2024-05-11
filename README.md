# AltSchool Africa Backend Assessment

## [Blog API](https://altschool-backend-assessment.onrender.com/blog)
An API created with Express, Passport, JSON Web Token and MongoDB

Certainly! Below is the documentation for your Express.js API routes, generated from the provided code, suitable for your GitHub README.md file:


# Blog API Documentation

This API provides endpoints to manage a blog system including creating, reading, updating, and deleting articles.

## Authentication

Authentication is required for certain routes using JSON Web Tokens (JWT).

## Routes

### Create New Article

- **URL**: `/api/articles/new`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  - `title`: Title of the article (String)
  - `description`: Description of the article (String)
  - `state`: State of the article (String, either 'published' or 'draft')
  - `body`: Body/content of the article (String)
  - `tags`: Tags associated with the article (Array of Strings)
- **Response**: 
  - `message`: Success message
  - `blog`: Newly created article object

### Get Articles

- **URL**: `/api/articles`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number for pagination (Optional, default: 1)
  - `limit`: Number of articles per page (Optional, default: 20)
  - `read_count`: Sort articles by read count (Optional, default: -1)
  - `title`: Search articles by title (Optional)
  - `tags`: Search articles by tags (Optional, comma-separated list)
- **Response**: 
  - Array of article objects

### Get User's Articles

- **URL**: `/api/articles/user`
- **Method**: `GET`
- **Authentication**: Required
- **Query Parameters**:
  - `page`: Page number for pagination (Optional, default: 1)
  - `limit`: Number of articles per page (Optional, default: 20)
  - `state`: Filter articles by state (Optional, default: 'published', 'draft')
- **Response**: 
  - Array of user's article objects

### Get Article by ID

- **URL**: `/api/articles/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: ID of the article
- **Response**: 
  - `article`: Article object
  - `author`: Author information (ID, name, email)

### Update Article

- **URL**: `/api/articles/:id`
- **Method**: `PUT`
- **Authentication**: Required
- **URL Parameters**:
  - `id`: ID of the article
- **Request Body**: Updated article data
- **Response**: 
  - Success message
  - Updated article object

### Delete Article

- **URL**: `/api/articles/:id`
- **Method**: `DELETE`
- **Authentication**: Required
- **URL Parameters**:
  - `id`: ID of the article
- **Response**: 
  - Success message
