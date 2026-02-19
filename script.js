const socket = io();

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const loginView = document.getElementById("loginView");
const chatView = document.getElementById("chatView");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");

let username = getCookie("username");

if (username) {
    showChat();
}

function login() {
    const name = usernameInput.value.trim();
    if (!name) {
        alert("Enter a username");
        return;
    }
    setCookie("username", name);
    username = name;
    showChat();
}

function showChat() {
    loginView.classList.add("hidden");
    chatView.classList.remove("hidden");
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    socket.emit("chat message", {
        username: username,
        message: message
    });

    messageInput.value = "";
}

socket.on("chat message", (data) => {
    const li = document.createElement("li");
    li.textContent = data.username + ": " + data.message;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
});

messageInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
