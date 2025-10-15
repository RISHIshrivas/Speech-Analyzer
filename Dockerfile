FROM python:3.11-slim

WORKDIR /app

# Install system deps (optional: for docx, etc.)
RUN pip install --no-cache-dir --upgrade pip

# Install Python deps
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY backend ./backend
COPY static ./static

EXPOSE 8000

# Run with Gunicorn for production
CMD ["gunicorn", "-b", "0.0.0.0:8000", "backend.app:app"]