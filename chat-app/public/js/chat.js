const socket = io();

socket.on("welcome", (message) => {
    console.log(message);
});

socket.on("message", (message) => {
    console.log(message);
});

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("sendMessage", e.target.elements.message.value, (error) => {
        console.log(error ? error : "message has been acknowledged");
    });
});

document.querySelector("button#location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("geolocation is not supported by the browser");
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    });
});
