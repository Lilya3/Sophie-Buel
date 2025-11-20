/* ------------------------------------------
   Authentication API (login / logout)
------------------------------------------- */

export async function loginUser(email, password) {
    console.log("start loginUser");

    const url = "http://localhost:5678/api/users/login";

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        console.log("error loginUser");
        throw new Error("Login failed");
    }

    console.log("loginUser ok");
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
}

export function logoutUser() {
    console.log("logout");
    localStorage.removeItem("authToken");
}

export function isLoggedIn() {
    console.log("check login");
    return Boolean(localStorage.getItem("authToken"));
}
