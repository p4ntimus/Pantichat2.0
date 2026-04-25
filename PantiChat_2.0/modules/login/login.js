function enterChat() {
    const name = document.getElementById("username").value.trim();
    if (name === "") return;

    localStorage.setItem("username", name);
    window.location.href = "../../index.html";
}
