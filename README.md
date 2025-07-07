# Blogger

## Description

A simple RESTful API built using **Node.js** and **Express.js**. It allows users to:

- Register and log in
- Perform CRUD operations on blogs
- Manage their profiles

---

## Features

- User authentication and authorization
- Create, Read, Update, Delete (CRUD) operations on blogs
- REST API using Node.js & Express
- MongoDB database integration

---

## Authentication

All blog-related routes are protected and require a valid JWT token.

## Authorization

Only the owner of a blog can create, update, or delete it. Unauthorized actions return appropriate error messages.

---

## Tech Stack

- **Backend**: Node.js, Express.js, JavaScript
- **Database**: MongoDB
- **Packages**: JSON Web Token (JWT), bcrypt, express, mongoose
- **Tools**: Postman, Visual Studio Code

---

## API Endpoints

### User Authentication

| Method | Endpoint   | Description        |
|--------|------------|--------------------|
| POST   | `/signup`  | Register new user  |
| POST   | `/login`   | Login existing user|

### User APIs

| Method | Endpoint     | Description     |
|--------|--------------|-----------------|
| GET    | `/user`      | Get all users   |
| PUT    | `/user/:id`  | Update user     |

### Blog APIs

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| POST   | `/newblog`    | Create blog       |
| GET    | `/allblogs`   | Show all blogs    |
| GET    | `/myblogs`    | Show my blogs     |
| GET    | `/:id`        | Get blog details  |
| PUT    | `/:id`        | Edit my blog      |
| DELETE | `/:id`        | Delete my blog    |

### Comment APIs

| Method | Endpoint        | Description      |
|--------|-----------------|------------------|
| POST   | `/add-comment`  | Add a comment    |
| DELETE | `/:id`          | Delete comment   |

---

## Models
User Model
```js
{
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"]
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}
```

 Blog Model
``` js
{
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}
```
 Comment Model
 ```js
{
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog"
  },
  createdAt: {
    type: Date,
    required: true
  }
}
```

# Testing with Postman
Create a Postman collection named Blog App with the following requests:

Create User

Login

Create Blog

Get All Blogs

Get My Blogs

Edit Blog

Delete Blog

Add Comment

Delete Comment

Ensure each request is properly labeled and uses environment variables or headers to pass JWT tokens when required.

# Bonus Features
.Unique validation on email and username

.Email format validation using Regex

.Soft delete support for blogs and comments

# Author
**Aleem Khan**
LinkedIn Profile (https://www.linkedin.com/in/aleemkh4n/)