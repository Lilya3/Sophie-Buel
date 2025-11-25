/* -------------------------------------------------
   Modal system — ONE modal, TWO screens
-------------------------------------------------- */
import { errorMsg } from "../components/modalAddPhoto.js";
import { resetAddForm } from "../components/modalAddPhoto.js";
const modal = document.getElementById("modal");

/* -------------------------------------------------
   FULL RESET + CLOSE
-------------------------------------------------- */
export function resetFullApp() {
    console.log("RESET FULL APP");
    
    errorMsg.textContent = "";
        if (errorMsg.timer) {
        clearTimeout(errorMsg.timer);
        errorMsg.timer = null;
    }

    // 1. Reset form
    resetAddForm();
    console.log("form reset done");

    // 2. Reset screens
    document.getElementById("modal-add").classList.remove("active");
    document.getElementById("modal-gallery").classList.add("active");
    console.log("screen reset to gallery");

    // 3. Close modal
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    console.log("modal closed");
}

/* -------------------------------------------------
   OPEN MODAL
-------------------------------------------------- */
export function openModal() {
    console.log("open modal");

    document.getElementById("modal-add").classList.remove("active");
    document.getElementById("modal-gallery").classList.add("active");

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
}


/* -------------------------------------------------
   CLOSE ON (X) BUTTON
-------------------------------------------------- */
const closeBtns = modal.querySelectorAll(".modal__close");

closeBtns.forEach(btn =>
    btn.addEventListener("click", (e) => {
        console.log("CLOSING: X button");
        e.stopPropagation();
        resetFullApp();
    })
);

/* -------------------------------------------------
   CLOSE ON OVERLAY CLICK
-------------------------------------------------- */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__overlay")) {
        console.log("CLOSING: overlay click");
        e.stopPropagation();
        resetFullApp();
    }
});

/* -------------------------------------------------
   CLOSE ON ESC
-------------------------------------------------- */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape")
        console.log("ESC pressed");
        e.stopPropagation();
        resetFullApp();
});