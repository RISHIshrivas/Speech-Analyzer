// Elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const transcriptEl = document.getElementById("transcript");
const statusEl = document.getElementById("status");
const langSelect = document.getElementById("lang");

// Added buttons
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const summaryBtn = document.getElementById("summaryBtn");
const exportBtn = document.getElementById("exportBtn");
const summaryEl = document.getElementById("summary");

let recognition = null;
let isListening = false;

// Check browser support
function supportsSpeechRecognition() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function setStatus(text) {
    statusEl.textContent = text;
}

// Start button click
startBtn.addEventListener("click", () => {
    if (!supportsSpeechRecognition()) {
        alert("Your browser does not support the Web Speech API. Use Chrome.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = langSelect.value || "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        isListening = true;
        setStatus("Listening...");
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    recognition.onerror = (e) => {
        console.error("Recognition error:", e);
        setStatus("Error: " + (e.error || "unknown"));
    };

    recognition.onend = () => {
        isListening = false;
        setStatus("Stopped");
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onresult = (event) => {
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
                finalText += result[0].transcript.trim() + " ";
            }
        }
        if (finalText) {
            transcriptEl.value += finalText;
            transcriptEl.scrollTop = transcriptEl.scrollHeight;

            // Send to backend
            fetch("/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: finalText })
            }).catch(() => {});
        }
    };

    try {
        recognition.start();
    } catch (err) {
        console.error("Recognition start error:", err);
    }
});

// Stop button click
stopBtn.addEventListener("click", () => {
    if (recognition && isListening) {
        recognition.stop();
    }
});

// Copy transcript
copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(transcriptEl.value || "");
    setStatus("Copied");
    setTimeout(() => setStatus(isListening ? "Listening..." : "Idle"), 1000);
});

// Clear transcript & summary
clearBtn.addEventListener("click", async () => {
    transcriptEl.value = "";
    summaryEl.value = "";
    await fetch("/clear", { method: "POST" });
    setStatus("Cleared");
});

// Get summary
summaryBtn.addEventListener("click", async () => {
    const res = await fetch("/summary");
    const data = await res.json();
    summaryEl.value = data.summary || "";
    summaryEl.scrollTop = summaryEl.scrollHeight;
});

// Export transcript as .docx
exportBtn.addEventListener("click", () => {
    window.location.href = "/export/docx";
});
