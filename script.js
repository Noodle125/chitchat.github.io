// **Important Note:**

While the previous code snippet included a Firebase configuration, using a real-time database like Firebase for this simple message board may be overkill. It introduces unnecessary complexity and potential costs. Here are alternative, more suitable approaches:

1. **Client-Side Storage (Limited Persistence):**
   - Store messages directly in the browser's local storage or session storage. This offers a quick solution but messages are lost when users refresh the page or close the browser.

2. **Server-Side Storage (Persistent):**
   - If you need messages to persist across sessions, consider implementing a simple server-side script (e.g., Node.js, Python) to store messages in a database like MongoDB or a flat-file database. This requires setting up a server-side component.

**Here's the code without Firebase, assuming client-side storage (local storage):**

document.addEventListener("DOMContentLoaded", function() {
  const messageInput = document.getElementById("message-input");
  const submitButton = document.getElementById("submit-button");
  const chatMessages = document.getElementById("chat-messages");

  // Function to add a message to the chat (using local storage)
  function addMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    // Get existing messages from local storage (or initialize empty array)
    let storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    storedMessages.push(message); // Add new message to the array

    // Update local storage with the new messages array
    localStorage.setItem("chatMessages", JSON.stringify(storedMessages));
  }

  // Event listener for the submit button
  submitButton.addEventListener("click", function() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      addMessage(messageText);
      messageInput.value = ""; // Clear input
    }
  });

  // Event listener for Enter key
  messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      submitButton.click();
    }
  });

  // Function to load messages from local storage on page load (optional)
  function loadMessages() {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    storedMessages.forEach(addMessage); // Display existing messages
  }

  // Call the loadMessages function to display existing messages (optional)
  loadMessages();
});


