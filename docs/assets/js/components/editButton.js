/* ------------------------------------------
   Display / Behavior for "modifier" button
------------------------------------------- */

import {isLoggedIn} from "../api/auth.js";

export function setupEditButton() {
    console.log("start setupEditButton");

    const editButton = document.getElementById("editButton");

    if (!editButton) return;

    if (isLoggedIn()) {
        console.log("user logged");
        // user already logged → show the button
        editButton.classList.remove("hidden");
    } else {
        console.log("click edit -> login");
        // user not logged → button redirects to login page
        editButton.addEventListener("click", () => {
            window.location.href = "./login.html";
        });
    }
}
