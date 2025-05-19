import os
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, Namespace, emit
import uuid
import random
import time
import json
from core.models import CourseOutline
from core.prompts import SYSTEM_PROMPT_CONTENT, SYSTEM_PROMPT_OUTLINE
from core.database.db import Database
from flask_cors import CORS
from dotenv import load_dotenv
from agno.agent import Agent
from agno.models.google import Gemini

load_dotenv()
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

db = Database()

@app.route('/callback', methods=['POST'])
def callback():
    try:
        data = request.get_json()
        print("Received callback data:", data)

        return jsonify({"status": "success", "message": "Callback received"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/')
def home():
    db.health_check()
    print("Hello")
    return {"message": "Hello from Flask!"}

@app.route('/course')
def get_course():
    course_id = request.args.get('id')
    if not course_id:
        return jsonify({"error": "Missing 'id' query parameter"}), 400

    course = db.get_course(course_id)
    print(f"COURSE -> {course}")
    if course:
        return jsonify(course)
    else:
        return jsonify({"error": "Course not found"}), 404

@app.route('/courses')
def get_all_courses():
    courses = db.get_all_courses()
    return jsonify(courses)

@app.route('/sections')
def get_sections():
    course_id = request.args.get('course_id')
    if not course_id:
        return jsonify({"error": "Missing 'course_id' query parameter"}), 400

    sections = db.get_all_sections_for_course(course_id)
    print(f"SECTIONS -> {sections}")
    return jsonify(sections)

outline_agent = Agent(
    model=Gemini(id=os.getenv("GEMINI_MODEL"), api_key=os.getenv("GEMINI_API_KEY")),
    description=SYSTEM_PROMPT_OUTLINE,
    introduction=SYSTEM_PROMPT_OUTLINE,
    structured_outputs=True,
    use_json_mode=True,
    response_model= CourseOutline
)

section_agent = Agent(
    model=Gemini(id=os.getenv("GEMINI_MODEL"), api_key=os.getenv("GEMINI_API_KEY")),
    description=SYSTEM_PROMPT_CONTENT,
    introduction=SYSTEM_PROMPT_CONTENT
)
class CreateNamespace(Namespace):
    def emit_session_update(self, session_id, course_id):
        session = db.get_session(session_id)
        self.emit('session_update', {**session, "course_id": course_id}, namespace='/create')

    def on_connect(self):
        print("Client connected to /create")

    def on_disconnect(self):
        print("Client disconnected from /create")

    def on_start_creation(self, data):
        session_id = data.get('session_id') or str(uuid.uuid4())
        description = data.get('description', '')
        level = data.get('level', '')

        actions = []
        course_id = str(uuid.uuid4())

        db.create_session(session_id, actions, description, level, 'in_progress')
        self.emit_session_update(session_id, course_id)

        actions.append("Creating course details")
        db.update_session_progress(session_id, 'in_progress')
        db.update_session_actions(session_id, actions)

        self.emit_session_update(session_id, course_id)

        

        response = outline_agent.run(description)
        course_outline: CourseOutline = response.content

        created_at = int(time.time())
        db.create_course(course_id, session_id, course_outline.course_title, course_outline.course_description, level, created_at)
        for i, section in enumerate(course_outline.sections):
            actions.append(f"Creating section: {section.section_title}")
            db.update_session_actions(session_id, actions)
            self.emit_session_update(session_id, course_id)
            section_response = section_agent.run(section.section_description)
            section_content = section_response.content
            section_id = str(uuid.uuid4())
            db.create_section(
                section_id=section_id,
                course_id=course_id,
                title=section.section_title,
                description=section.section_description,
                content=section_content,
                section_order=i,
                created_at=created_at
            )

            db.update_session_actions(session_id, actions)
            self.emit_session_update(session_id, course_id)

        actions.append("Course creation completed!")
        db.update_session_progress(session_id, 'success')
        db.update_session_actions(session_id, actions)

        self.emit_session_update(session_id, course_id)

socketio.on_namespace(CreateNamespace('/create'))

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8000)
