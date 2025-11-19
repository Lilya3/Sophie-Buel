import { openModal, closeModal } from "../utils/modalHelpers.js";

const addPhotoModal = document.getElementById("addPhotoModal");
const openAddBtn = document.getElementById("addPhoto");
const closeAddBtn = addPhotoModal.querySelector(".modal__close");
const backBtn = document.getElementById("backToGallery");

const form = document.getElementById("form-add-photo");
const formFields = form.querySelector(".form-fields");

/* -------------------------------------------------
   RESET FORM + SÉPARATOR
-------------------------------------------------- */

function resetAddPhotoModal() {
    console.log("start reset");
    // Reset fields
    form.reset();

    // Reset preview icon
    const preview = document.getElementById("preview");
    preview.innerHTML = `<i class="fa-regular fa-image" aria-hidden="true"></i>`;

    // Replace separator if missing
    if (!formFields.querySelector(".modal__separator")) {
        console.log("add separator");
        const sep = document.createElement("hr");
        sep.classList.add("modal__separator");
        formFields.appendChild(sep);
    }
}

/* -------------------------------------------------
   OPEN / CLOSE / BACK
-------------------------------------------------- */

// open add photo modal
openAddBtn.addEventListener("click", () => {
    console.log("click open add");
    resetAddPhotoModal();
    openModal(addPhotoModal);
});

// close modal
closeAddBtn.addEventListener("click", () => {
    console.log("click close add");
    closeModal(addPhotoModal);
});

// back to gallery modal
backBtn.addEventListener("click", () => {
    console.log("click back");
    closeModal(addPhotoModal);
    openModal(document.getElementById("galleryModal"));
});
