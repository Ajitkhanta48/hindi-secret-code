const secretKey = 5; // Security key (you can change)
const dataFile = "data.json"; // File to store encodings

// Function to load stored encodings
async function loadStoredEncodings() {
    try {
        const response = await fetch(dataFile);
        return await response.json();
    } catch (error) {
        console.error("Error loading stored encodings:", error);
        return {};
    }
}

// Function to save encodings
async function saveStoredEncodings(encodings) {
    try {
        await fetch(dataFile, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(encodings, null, 2),
        });
    } catch (error) {
        console.error("Error saving stored encodings:", error);
    }
}

// Function to encode message
async function encodeMessage() {
    let text = document.getElementById("inputText").value.trim();
    let encodings = await loadStoredEncodings();

    // Check if the text is already encoded
    if (encodings[text]) {
        document.getElementById("outputText").value = encodings[text];
        return;
    }

    let encodedArray = [];
    for (let i = 0; i < text.length; i++) {
        let shiftedCode = text.charCodeAt(i) + secretKey;
        encodedArray.push(shiftedCode.toString(36)); // Base36 encoding
    }
    let encodedString = encodedArray.join("-");

    // Store the new encoding
    encodings[text] = encodedString;
    await saveStoredEncodings(encodings);

    document.getElementById("outputText").value = encodedString;
}

// Function to decode message
async function decodeMessage() {
    let text = document.getElementById("inputText").value.trim();
    let encodings = await loadStoredEncodings();

    // Check if the text is already decoded
    let decodedText = Object.keys(encodings).find(key => encodings[key] === text);
    if (decodedText) {
        document.getElementById("outputText").value = decodedText;
        return;
    }

    // If not found, manually decode
    let encodedArray = text.split("-");
    decodedText = encodedArray.map(code => String.fromCharCode(parseInt(code, 36) - secretKey)).join("");

    document.getElementById("outputText").value = decodedText;
}

// Function to clear text fields
function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
}

// Function to copy text to clipboard
function copyText() {
    let output = document.getElementById("outputText");
    output.select();
    document.execCommand("copy");
    alert("📋 Copied to clipboard!");
}

// Function to switch between sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
