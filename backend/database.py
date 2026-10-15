import mysql.connector
from mysql.connector import pooling
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "studify")

def create_pool():
    try:
        return pooling.MySQLConnectionPool(
            pool_name="studify_pool",
            pool_size=10,
            pool_reset_session=False,  # Avoid multiple roundtrips per connection checkout
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            connection_timeout=10,
        )
    except Exception as e:
        print(f"Warning: Failed to create connection pool: {e}")
        return None

db_pool = create_pool()

def get_connection():
    global db_pool
    # Try getting an active connection from the pool
    if db_pool:
        try:
            conn = db_pool.get_connection()
            # Ensure the remote cloud connection didn't drop due to idle timeout
            conn.ping(reconnect=True, attempts=2, delay=1)
            return conn
        except Exception as e:
            print(f"Pool connection unavailable or exhausted ({e}), reconnecting...")
            try:
                db_pool = create_pool()
                if db_pool:
                    conn = db_pool.get_connection()
                    conn.ping(reconnect=True, attempts=2, delay=1)
                    return conn
            except Exception:
                pass

    # Direct fallback connection to ensure API never hangs
    return mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        connection_timeout=10,
    )