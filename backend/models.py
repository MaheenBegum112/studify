 
from database import get_connection

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    # Create tasks table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subject VARCHAR(255) NOT NULL,
            deadline DATE NOT NULL,
            priority VARCHAR(50) NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    cursor.close()
    conn.close()
    print("Tables created successfully! ✅")

# Run this file directly to create tables
if __name__ == "__main__":
    create_tables()