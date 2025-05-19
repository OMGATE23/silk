import os
import sqlite3
import logging
import json
from core.database.initialise import initialise_db

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        self.db_path = os.getenv("DB_PATH","quip.db")
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()
        self.health_check()

    def health_check(self) -> bool:
        try:
            query = """
                SELECT COUNT(name)
                FROM sqlite_master
                WHERE type='table'
                AND name IN ('courses', 'sections', 'sessions');
            """
            self.cursor.execute(query)
            table_count = self.cursor.fetchone()[0]
            if table_count < 3:
                logger.info("Tables missing. Initializing DB...")
                initialise_db(self.db_path)
            return True
        except Exception as e:
            logger.exception(f"Health check failed: {e}")
            return False

    def create_session(self, session_id, actions, description, level, progress):
        query = """
        INSERT INTO sessions (session_id, actions, description, level, progress)
        VALUES (?, ?, ?, ?, ?)
        """
        self.cursor.execute(query, (session_id, json.dumps(actions), description, level, progress))
        self.conn.commit()

    def get_session(self, session_id):
        query = "SELECT * FROM sessions WHERE session_id = ?"
        self.cursor.execute(query, (session_id,))
        row = self.cursor.fetchone()
        if row:
            result = dict(row)
            result["actions"] = json.loads(result["actions"])
            return result
        return None

    def get_all_sessions(self):
        query = "SELECT * FROM sessions"
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        sessions = []
        for row in rows:
            session = dict(row)
            session["actions"] = json.loads(session["actions"])
            sessions.append(session)
        return sessions

    def update_session_progress(self, session_id, new_progress):
        if new_progress not in ("in_progress", "success", "error"):
            raise ValueError("Invalid progress status")

        query = """
        UPDATE sessions
        SET progress = ?
        WHERE session_id = ?
        """
        self.cursor.execute(query, (new_progress, session_id))
        self.conn.commit()
        return self.cursor.rowcount > 0

    # --- Course Methods ---

    def create_course(self, course_id, session_id, title, description, level, created_at):
        query = """
        INSERT INTO courses (course_id, session_id, title, description, level, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        self.cursor.execute(query, (course_id, session_id, title, description, level, created_at))
        self.conn.commit()

    def get_course(self, course_id):
        query = "SELECT * FROM courses WHERE course_id = ?"
        self.cursor.execute(query, (course_id,))
        row = self.cursor.fetchone()
        return dict(row) if row else None

    def get_all_courses(self):
        query = "SELECT * FROM courses"
        self.cursor.execute(query)
        return [dict(row) for row in self.cursor.fetchall()]

    # --- Section Methods ---

    def create_section(self, section_id, course_id, title, description, content, section_order, created_at):
        query = """
        INSERT INTO sections (section_id, course_id, title, description, content, section_order, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        self.cursor.execute(query, (section_id, course_id, title, description, content, section_order, created_at))
        self.conn.commit()

    def get_all_sections_for_course(self, course_id):
        query = "SELECT * FROM sections WHERE course_id = ? ORDER BY section_order"
        self.cursor.execute(query, (course_id,))
        return [dict(row) for row in self.cursor.fetchall()]

    def update_session_actions(self, session_id, actions):
        query = "UPDATE sessions SET actions = ? WHERE session_id = ?"
        self.cursor.execute(query, (json.dumps(actions), session_id))
        self.conn.commit()

    def update_and_get_session(self, session_id):
        self.cursor.execute("SELECT * FROM sessions WHERE session_id = ?", (session_id,))
        row = self.cursor.fetchone()
        return dict(row) if row else None
