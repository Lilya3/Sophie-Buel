import {isLoggedIn} from "../api/auth.js";
import {logoutUser} from "../api/auth.js";

/**
 * Setup login/logout link + edit banner + filters visibility
 */
export function setupIndexPage() {
    console.log("start setupIndexPage");

    const authLink = document.getElementById("authLink");
    const editBanner = document.getElementById("editBanner");
    const editButton = document.getElementById("editButton");
    const filterEl = document.querySelector(".filter");

    if (!authLink) return;

    // -------------------------------------
    // If user is logged in
    // -------------------------------------
    if (isLoggedIn()) {
        console.log("user logged");
        // transform link into logout
        authLink.textContent = "logout";
        authLink.href = "#";
        authLink.classList.remove("auth-active");

        authLink.addEventListener("click", (e) => {
            console.log("click logout");
            e.preventDefault();
            logoutUser();
            window.location.reload();
        });

        // show edit banner + hide filters
        editBanner?.classList.remove("hidden");

        filterEl?.classList.add("hidden");

        // show edit button
        editButton?.classList.remove("hidden");

    } 

    // -------------------------------------
    // If user is NOT logged in
    // -------------------------------------
    else {
        console.log("user not logged");

        // set login link
        authLink.textContent = "login";
        authLink.href = "./login.html";
        authLink.classList.add("auth-active");

        // hide edit elements
        editBanner?.classList.add("hidden");

        filterEl?.classList.remove("hidden");

        // clicking edit opens login page
        editButton?.addEventListener("click", () => {
            console.log("click redirect login");
            window.location.href = "./login.html";
        });
    }
}
