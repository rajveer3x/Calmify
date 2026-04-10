# 🌿 Calmify

> A personalized, full-stack stress management and mindfulness portal designed for distraction-free engagement, secure mood tracking, and safe AI-assisted reflection.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## 📖 Overview
Calmify was built to address the lack of personalization and sustained engagement in modern mental health applications. By leveraging the MERN stack and the Google Gemini API, Calmify dynamically adapts to a user's specific stressors, provides real-time interactive mindfulness tools, and offers a secure space for daily reflection.

## ✨ Key Features

* **Dynamic Onboarding & Personalization:** A tailored onboarding flow captures user stressors and preferences, storing them as relational tags in MongoDB to populate a custom daily feed.
* **Safe AI "Calm Companion":** A real-time mindfulness chatbot powered by the Google Gemini API. **Safety Architecture:** Includes a hardcoded backend interceptor that scans for crisis keywords and bypasses the LLM to provide immediate emergency resources.
* **Interactive Breathing Studio:** Custom UI-driven animations built with React state and Tailwind `transition-all` to guide users through structured breathwork (e.g., 4-7-8, Box Breathing).
* **Progress & Digital Journal:** A secure journaling interface coupled with daily mood tracking. Data is visualized dynamically using **Recharts** to help users recognize long-term mental health trends.
* **Custom Media Experience:** Integrated, distraction-free audio and video players for guided meditations, served directly from the Express backend.
* **Secure Authentication:** End-to-end JWT (JSON Web Token) authentication with encrypted passwords and protected React routes.

## 🏗️ System Architecture
Calmify utilizes a strictly decoupled Client-Server architecture:
* **Client (React/Vite):** Utilizes `AuthContext` and `DataContext` for global state management. Implements a custom Axios instance with request interceptors to automatically append JWT bearer tokens to secure headers.
* **Server (Node/Express):** RESTful API handling authentication, data retrieval, static media serving, and secure prompt handling for the Gemini LLM (keeping API keys hidden from the client).
* **Database (MongoDB):** Document-based NoSQL storage utilizing Mongoose schemas for flexible user profiles, resource tagging, and historical mood logs.

## 🚀 Local Development Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+)
* [MongoDB](https://www.mongodb.com/) (Atlas or local instance)
* [Google AI Studio](https://aistudio.google.com/) (For free Gemini API Key)

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/calmify.git](https://github.com/yourusername/calmify.git)
cd calmify