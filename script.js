document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("message-input");
    const submitButton = document.getElementById("submit-button");
    const chatMessages = document.getElementById("chat-messages");

    // Function to add a message to the chat
    function addMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
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
});

