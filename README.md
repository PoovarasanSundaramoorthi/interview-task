# Chat Export and Task Management System

This project provides a chat history import/export feature along with user login and task management functionality. It enables users to log in using JWT authentication, manage tasks with CRUD operations, and import/export chat history from Excel files.

## Features

- **User Login**: JWT-based authentication for secure login.
- **Task Management**: CRUD operations for tasks with pagination support.
- **Chat History Export**: Import chat history from an Excel sheet and export it as an Excel file.
- **Data Validation**: Ensures proper data formatting and integrity using Joi for validation.

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: Type-safe superset of JavaScript.
- **Sequelize**: ORM for interacting with databases (MySQL/PostgreSQL).
- **JWT (JSON Web Token)**: Used for user authentication and authorization.
- **Joi**: Data validation library.
- **xlsx**: Library to parse and export Excel files.
- **Multer**: Middleware for handling file uploads (Excel files).

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or above)
- **npm** (Node package manager)
- **MySQL** or **PostgreSQL** for database management

Verify that Node.js and npm are installed by running:

```bash
node -v
npm -v
```
