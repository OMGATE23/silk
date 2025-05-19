import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

// Message component for displaying session actions
const ActionMessage = ({ content }: { content: string }) => (
  <div className="bg-gray-100 rounded-lg p-3 animate-fade-in">
    <p className="text-gray-800">{content}</p>
  </div>
);

// Course header component
const CourseHeader = ({
  course,
}: {
  course: {
    description: string;
    title: string;
    created_at: number;
    level: string;
  };
}) => (
  <div className="mb-6">
    <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded">
      {course.level}
    </span>
    <h2 className="text-2xl font-bold text-gray-800 mt-2">{course.title}</h2>
    <p className="text-gray-600 mt-1">{course.description}</p>
    <p className="text-xs text-gray-400 mt-2">
      Created: {new Date(course.created_at * 1000).toLocaleString()}
    </p>
  </div>
);

// Section component
const Section = ({
  section,
}: {
  section: { section_order: number; title: string; description: string };
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-200">
    <h4 className="font-medium text-gray-800">
      {section.section_order}. {section.title}
    </h4>
    <p className="text-gray-600 text-sm mt-1">{section.description}</p>
  </div>
);

interface InputFormProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  isDisabled: boolean;
}
const InputForm = ({
  message,
  setMessage,
  handleSendMessage,
  isDisabled,
}: InputFormProps) => (
  <form onSubmit={handleSendMessage} className="flex">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      disabled={isDisabled}
      placeholder={
        isDisabled ? "Creation in progress..." : "Describe your course..."
      }
      className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      disabled={isDisabled || !message.trim()}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r disabled:bg-gray-300 transition-colors duration-200"
    >
      Create
    </button>
  </form>
);

interface Session {
  progress: string;
  course_id: string | null;
  actions: string[];
}

interface Section {
  section_id: string;
  created_at: number;
  section_order: number;
  title: string;
  description: string;
}

function App() {
  const [message, setMessage] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    // Connect to socket when component mounts
    socketRef.current = io(`${API_BASE_URL}/create`);

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
      setError("Failed to connect to server. Please try again later.");
    });

    socketRef.current.on("session_update", async (data) => {
      console.log("Session update:", data);
      setSession(data);

      if (data.course_id) {
        await fetchCourseData(data.course_id);
      }

      if (data.progress === "success") {
        setIsLoading(false);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to the bottom of the messages container when new actions arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.actions]);

  const fetchCourseData = async (courseId: string) => {
    if (!courseId) return;

    try {
      // Fetch course details
      console.log("URL ->", `${API_BASE_URL}/course?id=${courseId}`);
      const courseResponse = await fetch(
        `${API_BASE_URL}/course?id=${courseId}`
      );

      if (!courseResponse.ok) {
        throw new Error(`Failed to fetch course: ${courseResponse.status}`);
      }

      const courseData = await courseResponse.json();
      setCourse(courseData);

      // Fetch sections for this course
      const sectionsResponse = await fetch(
        `${API_BASE_URL}/sections?course_id=${courseId}`
      );

      if (!sectionsResponse.ok) {
        throw new Error(`Failed to fetch sections: ${sectionsResponse.status}`);
      }

      const sectionsData = await sectionsResponse.json();
      setSections(sectionsData);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setError("Failed to load course data. Please try again.");
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim() || isSessionInProgress) return;

    setIsLoading(true);
    setError(null);

    // Reset previous session data if any
    setCourse(null);
    setSections([]);

    // Start course creation process
    socketRef.current!.emit("start_creation", {
      description: message,
      level: message.includes("advanced")
        ? "Advanced"
        : message.includes("intermediate")
        ? "Intermediate"
        : "Beginner",
    });

    setMessage("");
  };

  const isSessionInProgress = session?.progress === "in_progress";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side - Chat interface */}
      <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Course Creator
          </h1>
          <p className="text-sm text-gray-500">
            Describe the course you want to create
          </p>
        </div>

        {/* Messages/Actions area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {session?.actions?.map((action, index) => (
            <ActionMessage key={index} content={action} />
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200">
          <InputForm
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isDisabled={isSessionInProgress}
          />

          {isLoading && !course && (
            <p className="text-sm text-gray-500 mt-2">
              {isSessionInProgress
                ? "Creating your course..."
                : "Initializing course creation..."}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Course display */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
        {course ? (
          <div>
            <CourseHeader course={course} />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Course Sections
              </h3>

              {sections.length > 0 ? (
                <div className="space-y-3">
                  {sections
                    .sort((a, b) => a.section_order - b.section_order)
                    .map((section) => (
                      <Section key={section.section_id} section={section} />
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No sections available yet</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-gray-500">
              No course selected. Create a course to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
