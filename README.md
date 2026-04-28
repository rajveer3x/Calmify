# 🌿 Calmify

> A minimalist, full-stack mental wellness application engineered for distraction-free engagement, secure mood tracking, and safe AI-assisted reflection.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📖 Overview
Calmify was built to address the lack of personalization and sustained engagement in modern mental health applications. By leveraging the MERN stack and the Google Gemini API, Calmify dynamically adapts to a user's specific stressors, provides real-time interactive mindfulness tools, and offers a secure space for daily reflection. 

## ✨ Key Features & Technical Implementation

### Core Application
* **Dynamic Media Library:** An interactive resource library featuring custom video and audio players. Data is dynamically filtered by category (Mindfulness, Sleep, Focus) via React state, and media files are statically served from the Express backend.
* **Progress & Digital Journaling:** A secure journaling interface coupled with daily mood tracking. 
  * *Data Visualization:* User mood history is visualized dynamically using **Recharts** to identify long-term mental health trends.
  * *Stat Engine:* Custom backend logic calculates daily streaks and generates a real-time percentile ranking against the global user base.
* **Safe AI "Calm Companion":** A real-time mindfulness chatbot powered by the Google Gemini API. 
  * *Safety Architecture:* Includes a hardcoded Express backend interceptor that scans for crisis keywords and bypasses the LLM entirely to provide immediate emergency resources.
* **Interactive Breathing Studio:** Custom UI-driven animations built with React state and Tailwind `transition-all` to guide users through structured breathwork.
* **Secure Authentication:** End-to-end JWT (JSON Web Token) authentication with encrypted passwords, protected React routes, and secure session termination (logout).

### UI/UX & Polish
* **Custom Night Mode:** A bespoke, toggleable dark mode utilizing a deep 'Forest Charcoal' palette. Theme state is managed globally via React's `Context API` and persists through `localStorage`.
* **Responsive Architecture:** Built mobile-first using Tailwind CSS. The UI fluidly transitions from a persistent desktop sidebar to a sleek bottom-navigation bar on mobile viewports.
* **Asynchronous UX:** Implemented elegant skeleton loading states (`animate-pulse`) and custom spinners to mask data fetching latency and ensure a premium feel.

## 🏗️ System Architecture
Calmify utilizes a strictly decoupled Client-Server architecture:
* **Client (React/Vite):** Utilizes `AuthContext` and `ThemeContext` for global state management. Implements a custom Axios instance with request interceptors to securely handle API calls.
* **Server (Node/Express):** RESTful API handling authentication, streak calculation, static media serving (`express.static`), and secure prompt execution for the Gemini LLM (keeping API keys hidden from the client).
* **Database (MongoDB):** Document-based NoSQL storage utilizing Mongoose schemas for flexible user profiles, seeded resources, and historical mood logs.

## 🚀 Local Development Setup

### Prerequisites
* Node.js (v16+)
* MongoDB (Atlas or local instance)
* Google AI Studio (For free Gemini API Key)

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/calmify.git](https://github.com/yourusername/calmify.git)
cd calmify
2. Server Environment Setup
Navigate to the server directory and install dependencies:

Bash
cd server
npm install
Create a .env file in the server root directory:

Code snippet
PORT=5000
MONGO_URI=mongodb://localhost:27017/calmify
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key_here
Start the backend development server:

Bash
npm run dev
3. Client Environment Setup
Open a new terminal window, navigate to the client directory, and install dependencies:

Bash
cd client
npm install
Start the Vite frontend server:

Bash
npm run dev
4. Database Seeding & Media
Ensure you have placed your .mp4 and .mp3 media files inside server/public/media. Then, populate your local MongoDB instance by running the included seed script:

Bash
cd server
node seed.js

Rajveer Singh
Full-Stack Developer | Lovely Professional University


***

<FollowUp label="Ready to deploy this live to the internet?" query="Yes, let's deploy Calmify! How do I get my MERN app live on the internet using free tiers?" />
