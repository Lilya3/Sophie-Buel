/* -------------------------------------------------
   Modal Helpers — open modal
-------------------------------------------------- */

export function openModal(modalEl, pushHistory = true) {
    console.log("open modal");

    if (!modalEl) return;
    if (modalEl.classList.contains("is-open")) return;

    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");

    // history management
    if (pushHistory) {
        history.pushState({ modalId: modalEl.id }, "", "#" + modalEl.id);
    }

    // block scroll
    document.body.style.overflow = "hidden";
}

/**
 * Close modal
 */
export function closeModal(modalEl, pushHistory = true) {
    console.log("close modal");

    if (!modalEl) return;
    if (!modalEl.classList.contains("is-open")) return;

    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");

    if (pushHistory) {
        const state = history.state;
        if (state && state.modalId === modalEl.id) {
            history.back();
        }
    }

    document.body.style.overflow = "";
}

/**
 * Close every modal on screen
 */
export function closeAllModals() {
    console.log("close all modals");

    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    });

    // Clean URL
    if (window.location.hash.startsWith("#")) {
        history.replaceState({}, "", window.location.pathname);
    }

    document.body.style.overflow = "";
}

/* -------------------------------------------------
   Close modal when clicking on overlay
-------------------------------------------------- */

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__overlay")) {
        console.log("click overlay");
        closeAllModals();
    }
});

/* -------------------------------------------------
   Close modal when using browser back button
-------------------------------------------------- */
window.addEventListener("popstate", () => {
    console.log("browser back");

    // if no hash → not stay open modal
    if (!location.hash) {
        closeAllModals();
        return;
    }

    // or open the good one
    const modalId = location.hash.substring(1);
    const modalToOpen = document.getElementById(modalId);

    if (modalToOpen) {
        closeAllModals();
        openModal(modalToOpen, false);
    }
});


/* -------------------------------------------------
   Close modal with ESC key
-------------------------------------------------- */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        console.log("ESC pressed");
        closeAllModals();
    }
});