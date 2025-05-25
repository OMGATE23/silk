# Silk - Your AI Course Platform

Silk is an innovative AI-powered platform designed to revolutionize how you learn. Forget rigid curriculums; with Silk, you can create personalized courses on **any topic, at any difficulty level, in no time.** Our intelligent system crafts comprehensive, section-wise course setups tailored to your exact learning needs. Beyond creation, Silk also provides intuitive analytics to track your learning progress.

https://www.loom.com/share/1a655c6d51644e63ac049107cd256a57?sid=10fc3807-352c-4e2a-9516-f7770b038d57

## ✨ Features

- **AI-Powered Course Generation:** Simply describe what you want to learn, and Silk's intelligent agents will instantly generate a structured course outline and detailed section content.
- **Customizable Learning:** Specify the topic, depth, and difficulty, and Silk adapts to your requirements.
- **Section-Wise Setup:** Courses are meticulously organized into logical sections, providing a complete and digestible learning path.
- **Real-time Interaction:** Engage with the course creation process in real-time via a responsive chat interface.
- **Progress Analytics:** Track your learning journey with built-in analytics, showing course completion rates, section progress, and more.
- **Minimalist & Responsive UI:** A clean, professional user interface powered by React and Tailwind CSS, ensuring a seamless experience across all devices.

## 🚀 Technologies Used

Silk is built with a modern, robust tech stack to deliver a smooth and scalable experience.

### Backend

- **Framework:** Flask
- **Real-time:** Flask-SocketIO
- **AI/LLM Integration:** Agno (for Google Gemini interaction)
- **Database:** SQLite

### Frontend

- **Framework:** React
- **Language:** TypeScript
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Charting:** Recharts JS
- **Icons:** Lucide React

## 🏗️ Architecture Overview

Silk follows a clear separation of concerns, divided into a Flask backend and a React frontend:

**Backend:**
The Flask backend is initialized directly within `backend/main.py`, centralizing the application and SocketIO setup. It uses a dedicated **Flask-SocketIO namespace** for handling real-time AI course generation interactions. AI agents (powered by Google Gemini via `agno`) are integrated to perform course validation, outline generation, and content creation.

**Frontend:**
The React frontend, built with TypeScript, provides a dynamic and responsive user interface.

## ⚙️ Setup and Installation

Follow these steps to get Silk up and running on your local machine.

### Prerequisites

- Python 3.12+
- Node.js (LTS version recommended) & npm (or yarn)
- Git

### 1. Clone the Repository

```bash
git clone <https://github.com/OMGATE23/silk.git>
cd silk
```

### 2. Backend Setup

The backend code is located in the `backend/` directory.
a. **Navigate to the Backend Directory:**
Run the following command in the terminal:

```bash
cd backend
```

b.  **Create and Activate a Virtual Environment:**
It's highly recommended to use a virtual environment to manage dependencies.

```bash
python -m venv venv
# On Windows
.\\venv\\Scripts\\activate
# On macOS/Linux
source venv/bin/activate

```

c.  **Install Python Dependencies:**
Run the following command to install all the dependencies

```bash
pip install -r requirements.txt
```

d. **Set up Environment Variables:**
Create a file named `.env` inside the `backend/` directory (i.e., `silk/backend/.env`). This file will hold your API keys and configuration.

```
GEMINI_MODEL=your_gemini_model_id_here_e.g._gemini-pro
GEMINI_API_KEY=your_google_gemini_api_key_here
DB_PATH=sqlite_db.db
```

*Replace placeholders with your actual API keys and model IDs.*

d.  **Run the Backend with Gunicorn:**
From the **project root** (`silk/` directory):

```bash
gunicorn -k gevent -w 1 main:app --bind 0.0.0.0:8000
```

This command starts the Flask backend with Gunicorn on `http://localhost:8000`. Keep this terminal running.

### 3. Frontend Setup

The frontend code is located in the `frontend/` directory.

a.  **Navigate to the Frontend Directory:**

```bash
cd frontend
```

b.  **Install Node.js Dependencies:**

```bash
npm install
```

c. **Add the required Environment Variables**
Create a `.env` file and enter the following content

```
VITE_API_URL=http://localhost:8000
```

d.  **Run the Frontend Development Server:**

```bash
npm run dev
```

## 🚀 Usage

1. Once both the backend and frontend servers are running, open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173/`).
2. Use the navigation links in the header (`Courses`, `Create Course`, `Analytics`) to explore the application.
3. In the "Create Course" section, you can start creating a new course by providing a description. Observe how Silk generates the course in real-time.
4. Visit the "Analytics" page to see your course progress and insights.

## 🤝 Contributing

Contributions are welcome\! Please feel free to open issues or submit pull requests.
