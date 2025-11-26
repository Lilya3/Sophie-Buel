/* -------------------------------------------------
   Modal system — ONE modal, TWO screens
-------------------------------------------------- */
import { resetAddForm } from "../components/modalAddPhoto.js";
import { loadModalGallery } from "../components/modalGallery.js";

const modal = document.getElementById("modal");

/* -------------------------------------------------
   FULL RESET + CLOSE
-------------------------------------------------- */
export function resetFullApp() {
    console.log("RESET FULL APP");

    // 1. Reset form
    resetAddForm();
    console.log("form reset done");

    // 2. Reset screens
    const screenGallery = document.getElementById("modal-gallery");
    const screenAdd = document.getElementById("modal-add");
    screenAdd.classList.remove("active");
    screenGallery.classList.add("active");
    console.log("screen reset to gallery");

    loadModalGallery();

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
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
}


/* -------------------------------------------------
   CLOSE ON (X) BUTTON
-------------------------------------------------- */
const closeBtns = modal.querySelectorAll(".modal__close");
closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        console.log("CLOSING: X button");
        e.stopPropagation();
        resetFullApp();
    });
});

/* -------------------------------------------------
   CLOSE ON OVERLAY CLICK
-------------------------------------------------- */
document.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("modal__overlay") &&
        modal.classList.contains("is-open")
    ) {
        console.log("CLOSING: overlay click");
        e.stopPropagation();
        resetFullApp();
    }
});

/* -------------------------------------------------
   CLOSE ON ESC
-------------------------------------------------- */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
        console.log("CLOSING: ESC key");
        e.stopPropagation();
        resetFullApp();
    }
});