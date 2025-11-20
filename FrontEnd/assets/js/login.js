console.log("login.js : start");

const apiUrlLogin = "http://localhost:5678/api/users/login";
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

// -------------------------------------------------
// Submit du form login
// -------------------------------------------------
form.addEventListener("submit", async (e) => {
    console.log("login : form submitted");
    e.preventDefault();

    const emailValue = document.getElementById("email").value.trim();
    const passwordValue = document.getElementById("password").value.trim();

    console.log("login : send request");

    try {
        const response = await fetch(apiUrlLogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });

        if (!response.ok) {
            console.log("login : error HTTP");
            throw new Error("Erreur login");
        }

        const data = await response.json();
        localStorage.setItem("authToken", data.token);

        console.log("login : success");
        window.location.href = "./index.html";
    } 
    catch (err) {
        console.log("login : failed");
        errorMsg.style.display = "block";
    }
});

// -------------------------------------------------
// Manage "modifier" btn if already login
// -------------------------------------------------
const token = localStorage.getItem("authToken");
const editButton = document.getElementById("editButton");

if (token) {
    console.log("login.js : user already logged");
    editButton?.classList.remove("hidden");
} else {
    editButton?.addEventListener("click", () => {
        console.log("login.js : redirect login page");
        window.location.href = "./login.html";
    });
}

// -------------------------------------------------
// Bold login if no login
// -------------------------------------------------
const authLink = document.getElementById("authLink");
if (authLink) {
    console.log("login.js : highlight login link");
    authLink.classList.add("auth-active");
}
