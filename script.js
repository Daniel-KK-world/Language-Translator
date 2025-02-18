const fromLanguage = document.getElementById('fromLanguage');
const toLanguage = document.getElementById('toLanguage');
const inputText = document.getElementById('inputText');
const translatedText = document.getElementById('translatedText');

const API_URL = "https://libretranslate.de/translate";

// Populate language dropdowns
const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    zh: "Chinese",
};

for (const [code, name] of Object.entries(languages)) {
    fromLanguage.innerHTML += `<option value="${code}">${name}</option>`;
    toLanguage.innerHTML += `<option value="${code}">${name}</option>`;
}

toLanguage.value = "es"; // Default "to" language

// Debounce function to prevent rapid requests
let timeout;
inputText.addEventListener('input', () => {
    const text = inputText.value;
    const from = fromLanguage.value;
    const to = toLanguage.value;

    if (text.trim()) {
        clearTimeout(timeout); // Clear previous timeout
        timeout = setTimeout(() => {
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ q: text, source: from, target: to, format: "text" }),
            })
            .then((response) => response.json())
            .then((data) => {
                translatedText.textContent = data.translatedText;
            })
            .catch((err) => {
                translatedText.textContent = "Error occurred! Please try again later.";
                console.error(err);
            });
        }, 500); // Wait for 500ms before sending the request
    } else {
        translatedText.textContent = "Your translation will appear here...";
    }
});
