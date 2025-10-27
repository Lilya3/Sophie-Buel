const apiUrlLogin = "http://localhost:5678/api/users/login";
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim()
    };

    try {
        const response = await fetch(apiUrlLogin, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });

        if (!response.ok) throw new Error("Erreur de connexion");

        const data = await response.json();
        localStorage.setItem("token", data.token);

        window.location.href = "./index.html";
    } catch(err) {
        errorMsg.style.display = "block";
    }
});

const token = localStorage.getItem("token");
const editButton = document.getElementById("editButton");

if (token) {
  editButton?.classList.remove("hidden");
} else {
  editButton?.addEventListener("click", () => {
    window.location.href = "./login.html";
  });
}

