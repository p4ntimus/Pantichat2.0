console.log("chat.js wurde geladen");

// Username aus Login holen
const username = localStorage.getItem("username");

// UI-Elemente holen
const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Nachricht senden
function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    db.collection("messages").add({
        username: username,
        text: text,
        time: Date.now()
    });

    messageInput.value = "";
}

// Button klick
sendBtn.addEventListener("click", sendMessage);

// Enter Taste
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Nachrichten live laden
db.collection("messages")
  .orderBy("time")
  .onSnapshot(snapshot => {
      messagesContainer.innerHTML = "";
      snapshot.forEach(doc => {
          renderMessage(doc.data());
      });
  });

// Nachricht anzeigen
function renderMessage(msg) {
    const div = document.createElement("div");

    if (msg.username === username) {
        div.classList.add("message", "me");
    } else {
        div.classList.add("message", "other");
    }

    div.textContent = msg.username + ": " + msg.text;
    messagesContainer.appendChild(div);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
