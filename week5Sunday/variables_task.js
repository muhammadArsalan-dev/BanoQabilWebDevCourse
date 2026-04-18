function displayInfo() {
    let cityField = document.getElementById("inp-city").value;
    let userAge   = document.getElementById("inp-age").value;
    let userCountry = document.getElementById("inp-country").value;

    if (cityField === "" || userAge === "" || userCountry === "") {
        document.getElementById("resultText").textContent = 
            "Hey! Please fill every box first :)";
    } else {
        let message = `I live in ${cityField}, I'm ${userAge} years old and I'm from ${userCountry}.`;
        document.getElementById("resultText").textContent = message;
    }
}


function greetClass() {
    document.getElementById("resultText").textContent = 
        "Hello everyone! Hope you're learning JavaScript!";
}


function showGreeting() {
    let personName = document.getElementById("user-name").value.trim();

    if (personName === "") {
        document.getElementById("resultText").textContent = 
            "Please write your name first!";
    } else {
        document.getElementById("resultText").textContent = 
            "Hi there, " + personName.toUpperCase() + "! Nice to meet you.";
    }
}


function clearOutput() {
    document.getElementById("resultText").textContent = 
        "Output cleared. Try again!";
}