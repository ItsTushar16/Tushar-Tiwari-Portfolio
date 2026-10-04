# Tushar Tiwari | Personal Portfolio

A full-stack personal portfolio built to showcase my technical skills, projects, and journey as a Computer Science student and aspiring Software Engineer.

The portfolio combines a modern, responsive frontend with a dedicated backend to provide a complete digital presence, making it easier for recruiters, developers, and collaborators to explore my work and connect with me.

**Live Website:** [tushar-tiwari-portfolio.vercel.app](https://tushar-tiwari-portfolio.vercel.app/)

---

## Overview

This portfolio serves as my central platform for presenting my development experience, technical interests, and projects. It reflects my approach to building software, with an emphasis on clean design, practical functionality, and maintainable code.

Unlike a static portfolio, the project follows a full-stack architecture, separating the frontend and backend to support independent development and future improvements.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript |
| Styling | Tailwind CSS, CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Security | Helmet, Express Rate Limit, Express Validator |
| Utilities | Node Cron, Dotenv |
| Deployment | Vercel |
| Version Control | Git, GitHub |

## Key Features

- **Personal Introduction:** A dedicated space to learn about my background, interests, and career goals.
- **Project Showcase:** Highlights selected projects, their purpose, and the technologies used to build them.
- **Technical Skills:** Presents my programming languages, frameworks, and development tools.
- **Responsive Interface:** Designed to provide a consistent browsing experience across desktop, tablet, and mobile devices.
- **Full-Stack Architecture:** Separate frontend and backend applications for better organization and maintainability.
- **Contact Integration:** Backend-supported contact functionality for communication and inquiries.
- **Security Measures:** Uses middleware for HTTP security headers, request validation, and rate limiting.
- **Scalable Structure:** Organized codebase that can accommodate new projects, features, and improvements.

## Project Architecture

The application is organized into two main components:

```text
Tushar-Tiwari-Portfolio/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── package.json
└── README.md
```

**Frontend:** Handles the user interface, component rendering, styling, and interactions.

**Backend:** Manages server-side operations, API endpoints, database connectivity, and application security.

**Database:** MongoDB with Mongoose for structured data management.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm
- MongoDB database (local or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ItsTushar16/Tushar-Tiwari-Portfolio.git
cd Tushar-Tiwari-Portfolio
```

### 2. Install Dependencies

Install the root, frontend, and backend dependencies:

```bash
npm run install:all
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Add the environment variables required by your backend configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Add any additional API keys or service credentials required by your implementation.

**Important:** Never commit your `.env` file or expose private credentials in the repository.

### 4. Start the Development Servers

From the project root, run:

```bash
npm run dev
```

This starts the frontend and backend development servers concurrently.

### 5. Build for Production

To create a production build of the frontend:

```bash
npm run build
```

---

## Deployment

The portfolio is deployed and accessible online:

**[Visit My Portfolio](https://tushar-tiwari-portfolio.vercel.app/)**

The project uses a separate frontend and backend structure, allowing the two components to be configured and deployed independently.

---

## What I Learned

Building this project helped me strengthen my understanding of:

- Structuring and developing a full-stack application.
- Building reusable interfaces with React.
- Styling responsive layouts with Tailwind CSS.
- Developing RESTful APIs using Express.js.
- Connecting backend services with MongoDB.
- Implementing middleware for validation, security, and request handling.
- Managing environment variables and deployment configurations.
- Organizing a project for future maintenance and scalability.

## Future Improvements

- Improve accessibility and keyboard navigation.
- Enhance performance and loading behavior.
- Expand project details with dedicated case studies.
- Add further interactive elements and portfolio analytics.
- Continue refining the UI based on feedback and usability testing.

---

## Connect With Me

**Tushar Tiwari**  
B.Tech Computer Science and Engineering | Aspiring Software Engineer

- **Portfolio:** [tushar-tiwari-portfolio.vercel.app](https://tushar-tiwari-portfolio.vercel.app/)
- **GitHub:** [@ItsTushar16](https://github.com/ItsTushar16)
- **LinkedIn:** [Connect with me](www.linkedin.com/in/tushar-tiwari-dev)

---

*Built with curiosity, consistency, and a passion for software development.*
