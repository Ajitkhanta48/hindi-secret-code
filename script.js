const codes = {
    "papa aa": "Papa aa rahe hain",
    "maa aa": "Maa aa rahi hain",
    "bhai aa": "Bhai aa raha hai",
    "behen aa": "Behen aa rahi hai",
    "phone no": "Phone mat karo",
    "kisi ko mat bata": "Kisi ko kuch kehna mat",
    "block me": "Mujhe block kar do",
    "baad me baat": "Hum baad me baat karenge",
    "naya msg": "Nayi profile se message karo",
    "pic hatado": "Tasveerin hata do",
    "screenshot mat lo": "Screenshot mat lena",
    "chat clear": "Instagram ka chat clear kar do"
};

function encodeMessage() {
    let text = document.getElementById("inputText").value;
    let words = text.split(" ");
    let encodedText = words.map(word => codes[word] || word).join(" ");
    document.getElementById("outputText").value = encodedText;
}

function decodeMessage() {
    let text = document.getElementById("inputText").value;
    let reverseCodes = Object.fromEntries(Object.entries(codes).map(([k, v]) => [v, k]));
    let words = text.split(" ");
    let decodedText = words.map(word => reverseCodes[word] || word).join(" ");
    document.getElementById("outputText").value = decodedText;
}

function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
}

function copyText() {
    let output = document.getElementById("outputText");
    output.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
