# cohort-9-mern-8116-hashir

Cohort 9 — MERN (NodeJS+ReactJS) assignment for Hashir Umrani

# 📝 NoteApp

> A full-stack MERN note management application developed as an internship project, providing secure authentication and an intuitive interface for creating, managing, editing, and organizing personal notes.

---

## 📌 Overview

**NoteApp** is a full-stack note management application built using the **MERN stack**.

The application allows authenticated users to securely manage their personal notes through a clean and responsive dashboard. Users can register and log in, create notes, view their notes, search through them, and edit existing notes through a dedicated note editor.

The project follows a modular full-stack architecture with a clear separation between the frontend, backend, database, authentication, and API layers.

This project was developed as part of an **internship project** with an emphasis on:

- Clean project architecture
- Secure authentication
- RESTful API development
- Reusable React components
- Database-driven note management
- Testing
- Code quality
- Maintainable Git workflow
- Production-oriented development practices

---

# ✨ Features

## 🔐 Authentication

- User registration
- User login
- User logout
- JWT-based authentication
- Authentication through HTTP cookies
- Protected frontend routes
- Backend authentication middleware
- User-specific data access
- Authentication context on the frontend

## 📝 Note Management

Authenticated users can:

- Create new notes
- View their notes
- Open individual notes
- Edit existing notes
- Search notes
- View notes in a dashboard/grid interface
- Associate notes with the currently authenticated user

## 🎨 User Interface

The frontend provides:

- Clean SaaS-style interface
- Responsive dashboard
- Notes grid
- Note cards
- Dedicated note editor
- Create Note interface
- Search functionality
- Loading states
- Error handling
- Reusable UI components
- Icon-based actions using `lucide-react`

## 🧪 Testing

The backend includes automated tests covering important application functionality, including:

- Authentication
- User-related operations
- Note management

Testing is implemented using **Jest**.

## 🔍 Code Quality

The project also incorporates **SonarQube** for static code analysis and code-quality monitoring.

SonarQube is used to identify:

- Bugs
- Code smells
- Security issues
- Maintainability problems
- Duplicated code
- Code-quality issues

The SonarQube environment is configured using Docker.

---

# 🏗️ Architecture

NoteApp follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express Backend    │
                    │      / Node.js      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐    ┌────────────┐   ┌───────────┐
        │  Routes  │    │Controllers │   │ Middleware│
        └──────────┘    └────────────┘   └───────────┘
                               │
                               ▼
                       ┌──────────────┐
                       │   Mongoose   │
                       └──────┬───────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   MongoDB    │
                       └──────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology                    | Purpose                                |
| ----------------------------- | -------------------------------------- |
| React                         | Building the user interface            |
| Vite                          | Frontend development and build tooling |
| React Router                  | Client-side routing                    |
| Axios                         | API communication                      |
| SCSS                          | Styling                                |
| Tailwind CSS                  | Utility-based styling where applicable |
| Lucide React                  | UI icons                               |
| React Quill / React Quill New | Rich-text note editing                 |

## Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | Backend web framework     |
| MongoDB    | Database                  |
| Mongoose   | MongoDB ODM               |
| JWT        | Authentication            |
| bcryptjs   | Password hashing          |
| dotenv     | Environment configuration |
| Jest       | Automated testing         |

## Development & Quality Tools

| Tool      | Purpose                               |
| --------- | ------------------------------------- |
| Git       | Version control                       |
| GitHub    | Source-code hosting and collaboration |
| Docker    | Containerization                      |
| SonarQube | Static code analysis                  |
| Nodemon   | Backend development server            |
| npm       | Dependency management                 |

---

# 📁 Project Structure

The project is organized into separate frontend and backend applications.

```text
NoteApp/
│
├── backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── note.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── note.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── note.routes.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── note.test.js
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── notes/
│   │   │
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── SonarQubeReport/
│   ├── docker-compose.sonar.yml
│   └── ...
│
└── README.md
```

> The exact structure may vary slightly depending on the current state of the project.

---

# 🔐 Authentication Flow

NoteApp uses token-based authentication to protect user resources.

### Registration

```text
User
 │
 │ Registration details
 ▼
React Frontend
 │
 │ POST /api/auth/register
 ▼
Express API
 │
 ▼
Auth Controller
 │
 ├── Validate input
 ├── Check existing user
 ├── Hash password
 └── Create user
       │
       ▼
    MongoDB
```

### Login

```text
User
 │
 │ Email + Password
 ▼
Frontend
 │
 │ POST /api/auth/login
 ▼
Backend
 │
 ▼
Auth Controller
 │
 ├── Find user
 ├── Compare password
 └── Generate JWT
       │
       ▼
    HTTP Cookie
```

The authentication middleware then verifies the JWT before allowing access to protected resources.

---

# 🛡️ Authentication Middleware

Protected backend routes use authentication middleware to verify that the request belongs to an authenticated user.

The middleware is responsible for:

1. Reading the authentication token.
2. Extracting the token from the request.
3. Verifying the JWT.
4. Validating the authenticated user.
5. Attaching authenticated user information to the request.
6. Rejecting unauthorized requests.

Conceptually:

```text
Request
   │
   ▼
Authentication Middleware
   │
   ├── Token exists?
   │       │
   │       ├── No → 401 Unauthorized
   │       │
   │       ▼
   │   Verify JWT
   │       │
   │       ├── Invalid → 401 Unauthorized
   │       │
   │       ▼
   │   Attach user
   │       │
   │       ▼
   └── Continue to Controller
```

---

# 👤 User Model

The user model stores authentication-related information.

Typical responsibilities include:

- User identity
- Email
- Password hash
- Account timestamps
- Authentication-related information

Passwords are **never stored as plain text**.

Instead, passwords are hashed before being stored in MongoDB using `bcryptjs`.

```text
Plain Password
      │
      ▼
 bcrypt
      │
      ▼
Password Hash
      │
      ▼
   MongoDB
```

---

# 📝 Note Model

Each note belongs to an authenticated user.

The note model contains information such as:

- `heading`
- `content`
- `user`
- `createdAt`
- `updatedAt`

Conceptually:

```text
User
 │
 ├── Note
 ├── Note
 ├── Note
 └── Note
```

This relationship ensures that users can access their own notes rather than other users' notes.

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Creates a new user account.

### Login

```http
POST /api/auth/login
```

Authenticates a user and establishes an authenticated session.

### Logout

```http
POST /api/auth/logout
```

Logs the current user out.

### Get Current User

```http
GET /api/auth/get-me
```

Returns information about the currently authenticated user.

---

# 📝 Notes API

### Get Notes

```http
GET /api/notes
```

Returns notes belonging to the authenticated user.

### Create Note

```http
POST /api/notes
```

Creates a new note.

Example request:

```json
{
  "heading": "My First Note",
  "content": "This is my note."
}
```

### Update Note

```http
PUT /api/notes/:id
```

Updates an existing note.

> The exact HTTP method/path should be kept synchronized with the current backend route implementation.

---

# 🔄 Frontend Data Flow

The frontend communicates with the backend through a dedicated API/service layer.

```text
React Component
      │
      ▼
API Service
      │
      ▼
Axios
      │
      ▼
Express REST API
      │
      ▼
Controller
      │
      ▼
Mongoose
      │
      ▼
MongoDB
```

This separation keeps API communication independent from UI components and makes the application easier to maintain.

---

# 🖥️ Dashboard

After authentication, users are taken to the main dashboard.

The dashboard provides:

- List/grid of notes
- Note cards
- Search functionality
- Create Note action
- Access to the note editor
- Loading states
- Error states

The notes are fetched from the backend and stored in React state.

Search functionality filters the notes displayed to the user.

---

# ✏️ Note Editor

The Note Editor provides a dedicated interface for writing and modifying notes.

It supports:

- Note heading
- Rich-text content
- Editing existing notes
- Saving note changes
- Reusable editor interface

The editor uses a rich-text editing component to provide a better writing experience than a basic `<textarea>`.

---

# 🔎 Search

The dashboard provides client-side note searching.

Users can enter a search term and the displayed notes are filtered based on their headings.

Conceptually:

```javascript
notes.filter((note) =>
  note.heading.toLowerCase().includes(searchQuery.toLowerCase()),
);
```

This allows users to quickly locate notes without making an additional request to the backend for every search.

---

# 🧪 Testing

Testing is an important part of the backend development workflow.

The project uses **Jest** for automated tests.

Current testing areas include:

```text
tests/
├── auth.test.js
└── note.test.js
```

## Authentication Tests

Authentication tests can cover scenarios such as:

- User registration
- Duplicate user handling
- Login
- Invalid credentials
- Authentication behavior

## Note Tests

Note-related tests cover operations such as:

- Creating notes
- Retrieving notes
- Updating notes
- Authentication requirements
- User-specific note access

Run tests using:

```bash
npm test
```

or the test script configured in the backend `package.json`.

---

# 🔍 SonarQube

The project includes SonarQube integration for static code analysis.

SonarQube helps evaluate the project beyond whether the application simply works.

It can identify:

- Bugs
- Vulnerabilities
- Code smells
- Duplications
- Maintainability issues
- Reliability issues
- Security hotspots

The local SonarQube environment is containerized using Docker.

Conceptually:

```text
                NoteApp
                   │
                   ▼
             Sonar Scanner
                   │
                   ▼
              SonarQube
                   │
                   ▼
        ┌─────────────────────┐
        │ Quality Analysis    │
        │                     │
        │ Bugs                │
        │ Vulnerabilities     │
        │ Code Smells         │
        │ Duplications        │
        └─────────────────────┘
```

---

# 🐳 Docker & SonarQube

The SonarQube environment uses Docker Compose.

The setup includes:

- SonarQube server
- PostgreSQL database used by SonarQube

Example architecture:

```text
┌───────────────────────────┐
│       Docker Network      │
│                           │
│  ┌─────────────────────┐  │
│  │      SonarQube      │  │
│  │      Port: 9000     │  │
│  └──────────┬──────────┘  │
│             │             │
│             ▼             │
│  ┌─────────────────────┐  │
│  │     PostgreSQL      │  │
│  └─────────────────────┘  │
│                           │
└───────────────────────────┘
```

Start the SonarQube environment with the project's Docker Compose configuration.

```bash
docker compose -f SonarQubeReport/docker-compose.sonar.yml up -d
```

Then access SonarQube locally through:

```text
http://localhost:9000
```

> The exact scanner command should follow the scanner configured for the current project/environment.

---

# ⚙️ Environment Variables

Sensitive configuration should be stored in environment variables rather than committed to Git.

Example backend `.env`:

```env
PORT=3500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Depending on the current implementation, additional environment variables may be required.

### Important

Never commit:

```text
.env
.env.local
.env.production
```

or other files containing:

- Database credentials
- JWT secrets
- API keys
- Authentication secrets

Add them to `.gitignore`.

---

# 🚀 Installation

## Prerequisites

Before running NoteApp locally, make sure you have:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

For SonarQube:

- Docker
- Docker Compose

---

# 📥 Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd NoteApp
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```text
.env
```

Configure the required environment variables.

Then start the development server:

```bash
npm run dev
```

The backend should start on the configured port, for example:

```text
http://localhost:3500
```

---

# 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL, commonly:

```text
http://localhost:5173
```

---

# ▶️ Running the Complete Application

Run both applications:

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open the frontend URL provided by Vite.

---

# 🔒 Security Considerations

Security was considered throughout the application architecture.

### Password Security

Passwords are hashed before being stored.

```text
Password
   ↓
bcryptjs
   ↓
Hash
   ↓
MongoDB
```

### Authentication

Protected resources require authentication.

### Environment Variables

Secrets and credentials are kept outside the source code.

### User Data Isolation

Notes are associated with their respective users to prevent unauthorized access to other users' notes.

### Input Validation

Backend validation should be applied before persisting user-controlled data.

---

# 🧩 Separation of Concerns

The backend follows a layered architecture.

```text
Routes
  │
  ▼
Controllers
  │
  ▼
Models
  │
  ▼
MongoDB
```

### Routes

Responsible for defining API endpoints.

### Controllers

Responsible for application/business logic.

### Models

Responsible for database schemas and persistence.

### Middleware

Responsible for cross-cutting concerns such as authentication.

This structure makes the backend easier to test, maintain, and extend.

---

# 🌿 Git Workflow

Development follows a feature-based Git workflow.

Typical workflow:

```text
main
 │
 └── develop
       │
       ├── feature/authentication
       ├── feature/note-management
       └── feature/ui-improvements
```

A typical feature workflow:

```bash
git checkout develop

git pull origin develop

git checkout -b feature/my-feature
```

After completing the feature:

```bash
git add .

git commit -m "feat: implement my feature"

git push origin feature/my-feature
```

A Pull Request can then be created for review and integration.

---

# 📊 Development Workflow

The overall development process can be summarized as:

```text
Requirement
    │
    ▼
Implementation
    │
    ▼
Frontend / Backend Integration
    │
    ▼
Testing
    │
    ▼
Code Review
    │
    ▼
SonarQube Analysis
    │
    ▼
Bug / Code Quality Fixes
    │
    ▼
Pull Request
    │
    ▼
Merge
```

---

# 🧪 Quality Assurance

The project uses multiple approaches to maintain quality:

### Functional Testing

Jest tests verify backend functionality.

### Manual Testing

Frontend flows are tested through the browser.

### Static Analysis

SonarQube analyzes the codebase for potential quality and security issues.

### Code Review

Git branches and Pull Requests allow changes to be reviewed before integration.

---

# 🚧 Future Improvements

Potential improvements for future versions include:

- Note deletion
- Note archiving
- Note categories
- Tags
- Advanced search
- Pagination
- Sorting
- Note pinning
- Dark mode
- Profile management
- Password reset
- Email verification
- Refresh-token authentication
- Rate limiting
- API documentation with Swagger/OpenAPI
- Improved automated test coverage
- CI/CD pipeline
- Automated SonarQube analysis
- Production Docker deployment
- Cloud deployment

---

# 📈 Future Production Architecture

A future production deployment could follow:

```text
                    Internet
                       │
                       ▼
                 ┌───────────┐
                 │   CDN /   │
                 │   Proxy   │
                 └─────┬─────┘
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
       React Frontend       Node/Express API
                                  │
                         ┌────────┴────────┐
                         │                 │
                         ▼                 ▼
                     MongoDB          External Services
```

This architecture can later be expanded with:

- Reverse proxy
- HTTPS
- CDN
- Container orchestration
- CI/CD
- Monitoring
- Centralized logging
- Cloud database
- Horizontal scaling

---

# 📸 Screenshots

Screenshots can be added here to document the application's interface.

Recommended screenshots:

### Login

```text
Add login screenshot here
```

### Registration

```text
Add registration screenshot here
```

### Dashboard

```text
Add dashboard screenshot here
```

### Note Editor

```text
Add note editor screenshot here
```

### SonarQube Dashboard

```text
Add SonarQube analysis screenshot here
```

---

# 📚 Learning Outcomes

This project provided practical experience with full-stack software development, including:

- React application development
- REST API development
- Express.js
- Node.js
- MongoDB
- Mongoose
- JWT authentication
- Password hashing
- API integration
- Protected routes
- React state management
- Component-based architecture
- Automated testing
- Docker
- SonarQube
- Git and GitHub
- Feature-based development
- Pull Requests
- Code quality practices

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Run the available tests.
5. Verify the application locally.
6. Commit your changes.
7. Push the branch.
8. Open a Pull Request.

Example:

```bash
git checkout -b feature/new-feature

git add .

git commit -m "feat: add new feature"

git push origin feature/new-feature
```

---

# 📄 License

This project was developed as an internship project.

Add the project's applicable license here if the repository has one.

---

# ⭐ Project Summary

**NoteApp** is a full-stack MERN application designed to provide users with a secure and convenient platform for managing personal notes.

The project demonstrates practical implementation of:

**React + Node.js + Express + MongoDB + Mongoose + JWT Authentication + REST APIs + Jest + Docker + SonarQube**

It was developed with a focus on maintainability, modular architecture, authentication, testing, and software-engineering best practices.
