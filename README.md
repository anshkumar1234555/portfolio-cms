# Portfolio CMS

A full-stack **Portfolio Content Management System (CMS)** built with **Spring Boot, React, PostgreSQL, and JWT authentication**.

The application provides two separate experiences:

* 🌐 **Public Portfolio** — visitors can view portfolio information and send contact messages.
* 🔐 **Admin CMS** — authenticated administrators can manage portfolio content using CRUD operations.

---

## 🚀 Features

### 🌐 Public Portfolio

Visitors can view:

* Personal profile
* Skills
* Work experience
* Education
* Projects
* Certifications
* Blog posts
* Contact information
* Contact form

Public portfolio data is exposed through dedicated public REST APIs that do not require authentication.

---

### 🔐 Admin Dashboard

Authenticated administrators can manage portfolio content through a protected dashboard.

Admin functionality includes:

* Dashboard statistics
* Project management
* Skills management
* Experience management
* Education management
* Certification management
* Blog management
* Contact/message management
* Create, read, update, and delete operations
* JWT-based authentication
* Logout functionality

---

## 🛠️ Tech Stack

### Backend

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| Java            | Backend programming language     |
| Spring Boot     | REST API development             |
| Spring Security | Authentication and authorization |
| JWT             | Stateless authentication         |
| Spring Data JPA | Database access                  |
| Hibernate       | ORM                              |
| PostgreSQL      | Relational database              |
| Maven           | Dependency management            |

### Frontend

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| React        | User interface                  |
| JavaScript   | Frontend logic                  |
| React Router | Application routing             |
| Axios        | REST API communication          |
| Vite         | Frontend development/build tool |
| CSS          | Styling                         |

---

# 🏗️ Project Architecture

```text
                         Portfolio CMS
                              │
              ┌───────────────┴───────────────┐
              │                               │
       Public Portfolio                  Admin CMS
              │                               │
              │                         Login + JWT
              │                               │
              ▼                               ▼
       Public REST APIs                 Protected APIs
              │                               │
              └───────────────┬───────────────┘
                              │
                              ▼
                       Spring Boot API
                              │
                              ▼
                       Spring Data JPA
                              │
                              ▼
                         PostgreSQL
```

---

# 📁 Project Structure

```text
portfolio-cms-backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── portfolio_cms_backend/
│   │   │       │
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── security/
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── portfolio-cms-frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
└── README.md
```

---

# 🔐 Authentication

The admin panel uses **JWT-based authentication**.

### Authentication flow

```text
Admin
  │
  ▼
Login
  │
  ▼
POST /api/auth/login
  │
  ▼
Spring Security
  │
  ▼
JWT Token
  │
  ▼
Frontend localStorage
  │
  ▼
Axios Authorization Header
  │
  ▼
Protected Admin API
```

The JWT is sent with protected API requests using:

```http
Authorization: Bearer <JWT_TOKEN>
```

The application uses stateless sessions.

---

# 🌐 Public API

Public endpoints are available without administrator authentication.

### Projects

```http
GET /api/public/projects
GET /api/public/projects/{id}
```

### Skills

```http
GET /api/public/skills
GET /api/public/skills/{id}
```

### Experience

```http
GET /api/public/experiences
GET /api/public/experiences/{id}
```

### Education

```http
GET /api/public/education
GET /api/public/education/{id}
```

### Certifications

```http
GET /api/public/certifications
GET /api/public/certifications/{id}
```

### Blog

```http
GET /api/public/blog
GET /api/public/blog/{id}
```

### Contact

```http
POST /api/public/contact
```

These endpoints allow the public portfolio to function without requiring visitors to log in.

---

# 🔧 Admin REST API

Admin APIs are protected using JWT authentication.

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Projects

```http
POST   /api/projects
GET    /api/projects
GET    /api/projects/{id}
PUT    /api/projects/{id}
DELETE /api/projects/{id}
```

---

## Skills

```http
POST   /api/skills
GET    /api/skills
GET    /api/skills/{id}
PUT    /api/skills/{id}
DELETE /api/skills/{id}
```

---

## Experience

```http
POST   /api/experiences
GET    /api/experiences
GET    /api/experiences/{id}
PUT    /api/experiences/{id}
DELETE /api/experiences/{id}
```

---

## Education

```http
POST   /api/education
GET    /api/education
GET    /api/education/{id}
PUT    /api/education/{id}
DELETE /api/education/{id}
```

---

## Certifications

```http
POST   /api/certifications
GET    /api/certifications
GET    /api/certifications/{id}
PUT    /api/certifications/{id}
DELETE /api/certifications/{id}
```

---

# 📊 Dashboard

The admin dashboard provides an overview of portfolio content.

Dashboard statistics include:

* Total Projects
* Total Skills
* Total Experiences
* Total Education Records
* Total Certifications
* Total Blog Posts
* Total Messages

Example endpoint:

```http
GET /api/dashboard/stats
```

This endpoint requires administrator authentication.

---

# 🗄️ Database

The application uses **PostgreSQL**.

The database contains entities for the major portfolio sections, including:

```text
Users
Projects
Skills
Experiences
Education
Certifications
Blog Posts
Messages
```

Spring Data JPA and Hibernate are used to map Java entities to PostgreSQL tables.

The application uses:

```properties
spring.jpa.hibernate.ddl-auto=update
```

during local development so that Hibernate can automatically update the database schema based on entity changes.

---

# 🔒 Security Configuration

Spring Security separates public and protected resources.

### Public

```text
/api/auth/register
/api/auth/login

/api/public/projects/**
/api/public/profile/**
/api/public/skills/**
/api/public/experiences/**
/api/public/education/**
/api/public/contact
/api/public/certifications/**
/api/public/blog/**
```

### Protected

Administrative CRUD endpoints require authentication.

For example:

```text
/api/projects
/api/skills
/api/experiences
/api/education
/api/certifications
/api/dashboard/**
```

---

# 🔄 Public vs Admin Architecture

The application intentionally separates public read-only access from administrator operations.

```text
PUBLIC

Visitor
   │
   ▼
React Portfolio
   │
   ▼
/api/public/*
   │
   ▼
Database


ADMIN

Administrator
   │
   ▼
Login
   │
   ▼
JWT
   │
   ▼
React Admin Dashboard
   │
   ▼
Protected REST APIs
   │
   ▼
Database
```

This prevents public visitors from directly accessing administrator CRUD functionality.

---

# ⚙️ Backend Setup

## Requirements

Install:

* Java 21
* Maven
* PostgreSQL
* Node.js
* npm

---

## 1. Clone the repository

```bash
git clone https://github.com/anshkumar1234555/portfolio-cms.git
```

```bash
cd portfolio-cms
```

---

## 2. Create PostgreSQL database

Create a database named:

```text
portfolio_cms
```

Example PostgreSQL configuration:

```text
Host: localhost
Port: 5432
Database: portfolio_cms
Username: postgres
```

---

## 3. Configure environment variables

The backend uses environment variables for database credentials.

Example:

```text
DB_URL=jdbc:postgresql://localhost:5432/portfolio_cms
DB_USERNAME=postgres
DB_PASSWORD=Y_
```
