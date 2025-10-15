# 🎙 Speech Analyzer

A browser-based speech recognition web app that converts **live speech to text**, supports multiple languages, generates summaries, and allows exporting transcripts as `.docx` files.  
Built with **Flask**, **JavaScript (Web Speech API)**, and a clean, responsive UI.

---

## ✨ Features

- 🎤 **Live Speech Recognition** – Converts spoken words to text in real-time  
- 🌍 **Multi-Language Support** – Choose between English, Hindi, and more  
- 📋 **Transcript Management** – Copy, clear, and store spoken text  
- 📝 **Automatic Summarization** – Generates a condensed summary of the transcript  
- 📄 **Export to `.docx`** – Download your transcript as a Microsoft Word document  
- 🌐 **Web-Based** – Works directly in the browser, no installation needed  

---

## 🛠 Tech Stack

**Frontend:**  
- HTML5, CSS3  
- JavaScript (Web Speech API)  

**Backend:**  
- Flask (Python)  
- Flask-CORS  
- python-docx  

**Hosting:**  
- Backend: Render / Railway / Deta Space  
- Frontend: GitHub Pages / Netlify  

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Speech-Analyzer.git
cd Speech-Analyzer
```
### Install Dependencies
```
pip install -r requirements.txt
```
### Run the Backend Server
```
python backend/app.py
```
The server will start at:

arduino
```
http://localhost:5000
```
## PROJECT SUMMARY
```
Speech-Analyzer/
│── backend/
│   ├── app.py               # Flask backend API
│── static/
│   ├── index.html           # Frontend UI
│   ├── script.js            # Speech recognition logic
│   ├── manifest.json
│   ├── service-worker.js
│── requirements.txt         # Python dependencies
│── README.md                # Documentation
```
# Speech Analyzer – Ready-to-Run Starter

This project turns your speech into text in the browser and sends each final chunk to a Python/Flask backend. You can summarize, clear, and export your transcript as `.docx`.

## 1) Run locally

```bash
# 1. Create a virtualenv (recommended)
python -m venv .venv
# 2. Activate it
#   Windows: .venv\Scripts\activate
#   macOS/Linux: source .venv/bin/activate
# 3. Install deps
pip install -r requirements.txt
# 4. Start the backend (serves the UI too)
python backend/app.py
```
Open http://localhost:5000 in Chrome. Click **Start** and allow microphone access.

> If you deploy front-end separately, set `window.API_BASE` in `index.html` to point at your backend URL.

## 2) Docker (optional)

```bash
docker build -t speech-analyzer .
docker run -p 8000:8000 speech-analyzer
```
Open http://localhost:8000

## 3) Deploy (one simple path)

- **Backend**: Deploy this repo to any Python-friendly host (Render/Railway/Fly/etc.). The Dockerfile already runs Gunicorn on port 8000. Expose that port as your service port.
- **Front-end**: Either let Flask serve `/static` (default) or upload `static/` to a static host (Netlify/Vercel/etc.) and set `window.API_BASE` to the backend’s HTTPS URL.

### Notes for production
- Use HTTPS — browsers require secure context for mic access.
- Web Speech API works best in Chromium-based browsers. Consider adding a server-side STT (e.g., Whisper/Vosk) if you need broader support.
- Replace the in-memory list with a database if you need persistence.

## 4) API

- `POST /save` `{ text }` → append to transcript  
- `GET /summary` → returns `{ summary }` (simple concatenation for now)  
- `POST /clear` → clears transcript  
- `GET /export/docx` → downloads a Word document

## 5) Customize
- Default language is selectable in the UI.
- To add more languages, add `<option>`s in `index.html`.
- Swap the naive summary with any summarization API; just update `/summary` in `backend/app.py`.
