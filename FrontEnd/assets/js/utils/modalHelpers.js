/* -------------------------------------------------
   Modal system — ONE modal, TWO screens
-------------------------------------------------- */
import { resetAddForm } from "../components/modalAddPhoto.js";


const mainModal = document.getElementById("modal");

/**
 * Open the MAIN modal
 */
export function openModal() {
    console.log("open modal");

    mainModal.classList.add("is-open");

    // prevent page scroll
    document.body.style.overflow = "hidden";

    // push ONE history state only
    history.pushState({ modal: true }, "", "#modal");
}

/**
 * Close modal
 */
export function closeModal() {
    console.log("close modal");

    mainModal.classList.remove("is-open");

    document.body.style.overflow = "";
    
    resetAddForm();

    // go back in history if the hash is #modal
    if (location.hash === "#modal") {
        history.back();
    }

}

/**
 * Close modal on overlay click
 */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__overlay")) {
        closeModal();
    }
});

/**
 * Close modal on Escape
 */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

/**
 * Handle browser back button
 */
window.addEventListener("popstate", (e) => {
    console.log("browser back");

    if (!e.state || !e.state.modal) {
        closeModal();
    }
});
