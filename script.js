document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.querySelector(".message-input");
    const submitButton = document.getElementById("submit-button");
    const messageList = document.querySelector(".messages");

    submitButton.addEventListener("click", function() {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            const messageItem = document.createElement("li");
            messageItem.textContent = messageText;
            messageList.appendChild(messageItem);
            messageInput.value = ""; // Clear input
        }
    });
});
