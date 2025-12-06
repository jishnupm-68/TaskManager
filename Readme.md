# Voice-Enabled Task Tracker — README
> A full-stack productivity application that lets users create, manage, and search tasks using voice commands, AI-powered task parsing, and a clean React/Tailwind UI.

1. Project Setup 
1.1 Prerequisites
> Before running the project, ensure the following are installed:
 # Node.js
 Recommended: Node v18+
 
 # Database
 MongoDB (local or Atlas)
 Collections used: User, Todo

 # API Keys
 Gemini API (for task description parsing → structured JSON)


# Environment Variables (.env)
 > backend .env must include : 
        DB_CONNECTION_STRING = your monogdb connection string
        JWT_SECRET = your jwt secret
        CORS_ORIGIN_STRING = your frontend connection string
        PORT= your port number
        GEMINI_API_KEY= your google gemini api key 

1.2 Installation Steps
clone the project using : https://github.com/jishnupm-68/TaskManager.git

# Backend Setup
cd backend
npm install

Run backend: npm run dev

# Frontend Setup
cd frontend
npm install
npm run dev

Frontend default runs on: http://localhost:5173


2. Tech Stack
    > Frontend
        > React + Vite
        > TailwindCSS
        > React Icons
        > React Router
        > Fetch API 

    > Backend
        > Node.js
        > Express.js
        > Mongoose
        > cookie-parser
        > jsonwebtoken

    > Database
        > MongoDB / Atlas

    > AI Provider
        > gemini-2.5-flash-lite

    
    > Key Libraries
     > Backend
        > @google/genai
        > bcrypt
        > cookie-parser
        > dotenv
        > cors
        > express
        > jsonwebtoken
        > mongoose
        > nocache
        > validator
     > Frontend
        > react
        > react-redux
        > redux
        > tailwindcss
        > react-speech-recognition

3. API Documentation
 1. User Login
        POST /api/user/login
        Body:
        {
        "email": "test@gmail.com",
        "password": "123456"
        }


        Success Response:
        {
            "message": "Login successful",
            "status": true,
            "data": {
                "_id": "60682asg45f41s060dee8yuiot8bb",
                "userName": "test",
                "email": "test@gmail.com",
                "todos": [
                ],
            }
        }
 2. Create Todo
        POST /api/todo
            Body (AI parsed / MANUALLY TYPED JSON ):

            {
                "title":"complete this todo assignment",
                "priority" : "High",
                "dueDate":"2025-12-07T04:36:34.481Z"
            }

            Success:
            {
                "message": "Todo added successfully",
                "status": true,
                "data": {
                    "title": "complete this todo assignment",
                    "priority": "High",
                    "dueDate": "2025-12-07T04:36:34.481Z",
                    "status": "Todo",
                    "_id": "6933fd2d1a5b4db7b3817329",
                    "createdAt": "2025-12-06T09:53:49.631Z",
                    "updatedAt": "2025-12-06T09:53:49.631Z",
                    "__v": 0
                }
            }

 3. AI → Convert Voice/Text to JSON
        POST /api/ai/parse

            Body:
            {
            "text":"Create a task to buy groceries tomorrow with high priority and mark it as pending"
            }

            Response:
            {
                "status": true,
                "message": "Text parsed successfully",
                "data": {
                    "title": "Buy groceries",
                    "priority": "High",
                    "status": "Todo",
                    "dueDate": "2025-12-07 00-00"
                }
            }

4. Decisions & Assumptions
    4.1 Key Design Decisions
        > AI Parsing
        Task creation relies heavily on AI converting natural-language text into structured JSON.

    Data Model
        > Each Todo contains:
            title
            priority
            status
            dueDate
            description

        > Voice Input Flow
        Microphone → Audio → Transcription → AI Parser → JSON → DB

        > AI-first workflow: Instead of plain CRUD, the system converts speech → structured JSON using Gemini.

        > Redux used for predictable state updates.
        > Debounce implemented for search (1s delay).
        > Custom hooks created for search & filter.
        > Server-side filtering instead of client-side for efficient scaling.
        > JWT stored in HttpOnly cookies for secure authentication.

    4.2 Assumptions
        > Priority defaults to Low
        > Status defaults to Todo
        > description  is optional
        > Only one user is required (for assignment purpose).

5. AI Tools Usage
    5.1 Tools Used
        ChatGPT → debugging + writing parsers
        GitHub Copilot → boilerplate + React UI
        Gemini  → raw text  to task parsing (backend)

    5.2 What AI Helped With
        Debugging the code
        Fixing CORS issues
        Styling React components
        Improving "task parsing" prompt

    5.3 What I Learned

        > Using voice to text parser
        > Connection with gemini ai model to backend
        > Custom hooks must not return JSX
        > Hooks cannot be called inside useEffect
        > Better way to use debouncing for search
        > Dynamic key-based MongoDB queries
        > Working with JWT cookies + secure CORS setup
        > How to structure a voice-enabled workflow from UI → AI → backend
        > use httponly false to access token, but its dangerous