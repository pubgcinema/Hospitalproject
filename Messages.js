// Elements
const faqItems = document.querySelectorAll(".faq-item");
const faqAnswers = document.querySelectorAll(".faq-answer");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotContent = document.querySelector(".chatbot-content");
const chatbotMessages = document.querySelector(".chatbot-messages");
const chatbotInput = document.querySelector("#chatbot-input");
const chatbotSend = document.querySelector("#chatbot-send");

// Show answer for clicked question
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const answerId = item.getAttribute("data-answer");
    faqAnswers.forEach((answer) => {
      if (answer.getAttribute("data-answer-id") === answerId) {
        answer.style.display = answer.style.display === "block" ? "none" : "block";
      } else {
        answer.style.display = "none";
      }
    });
  });
});

// Toggle Chatbot
chatbotToggle.addEventListener("click", () => {
  if (chatbotContent.style.display === "none") {
    chatbotContent.style.display = "flex";
    chatbotToggle.style.display = "none";
  } else {
    chatbotContent.style.display = "none";
    chatbotToggle.style.display = "block";
  }
});

// Send chatbot message
chatbotSend.addEventListener("click", () => {
  const messageText = chatbotInput.value.trim();
  if (messageText === "") return;

  // Add user message
  const userMessage = document.createElement("div");
  userMessage.classList.add("chatbot-message", "sent");
  userMessage.innerHTML = `
    <p>${messageText}</p>
    <small>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
  `;
  chatbotMessages.appendChild(userMessage);

  // Add bot response (simple predefined response for demo)
  setTimeout(() => {
    const botMessage = document.createElement("div");
    botMessage.classList.add("chatbot-message", "received");
    botMessage.innerHTML = `
      <p>Thank you! I’ll help with that. Please wait for a moment.</p>
      <small>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
    `;
    chatbotMessages.appendChild(botMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 1000);

  // Clear the input
  chatbotInput.value = "";
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
});

// Send chatbot message on Enter key
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    chatbotSend.click();
  }
});