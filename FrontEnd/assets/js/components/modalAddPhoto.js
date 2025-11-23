import { loadModalGallery } from "./modalGallery.js";
import { initGallery } from "./gallery.js";

/* -------------------------------------------------
   VARIABLES
-------------------------------------------------- */
const screenGallery = document.getElementById("modal-gallery");
const screenAdd = document.getElementById("modal-add");

const backBtn = document.getElementById("btnBackToGallery");

const form = document.getElementById("form-add-photo");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");

const uploadBtn = document.querySelector(".upload-btn");
const uploadInfo = document.querySelector(".upload-info");

/* -------------------------------------------------
   ENABLE / DISABLE SUBMIT BUTTON
-------------------------------------------------- */

const validateBtn = document.getElementById("submitAddPhoto");

function updateSubmitState() {
    if (!validateBtn) return;

    const hasImage = fileInput.files.length > 0;
    const hasTitle = titleInput.value.trim() !== "";
    const hasCategory = categorySelect.value !== "";

    if (hasImage && hasTitle && hasCategory) {
        validateBtn.classList.remove("modal__btn--disabled");
    } else {
        validateBtn.classList.add("modal__btn--disabled");
    }

}

function clearErrorIfValid() {
    const hasImage = fileInput.files.length > 0;
    const hasTitle = titleInput.value.trim() !== "";
    const hasCategory = categorySelect.value !== "";

    if (hasImage && hasTitle && hasCategory) {
        errorMsg.textContent = "";
    }
}


titleInput.addEventListener("input", updateSubmitState);
categorySelect.addEventListener("change", updateSubmitState);

titleInput.addEventListener("input", clearErrorIfValid);
categorySelect.addEventListener("change", clearErrorIfValid);
fileInput.addEventListener("change", clearErrorIfValid);



// Inline error message
const errorMsg = document.createElement("p");
errorMsg.classList.add("form-error");
form.appendChild(errorMsg);

/* -------------------------------------------------
   FUNCTION: Show temp error
-------------------------------------------------- */
function showTempError(message, delay = 3000) {
    // cancer last timer if still on
    if (errorMsg.timer) {
        clearTimeout(errorMsg.timer);
    }

    errorMsg.textContent = message;

    // hide after x seconds
    errorMsg.timer = setTimeout(() => {
        errorMsg.textContent = "";
        errorMsg.timer = null;
    }, delay);
}




/* -------------------------------------------------
   SWITCH SCREEN
-------------------------------------------------- */

function showGalleryScreen() {
    screenAdd.classList.remove("active");
    screenGallery.classList.add("active");
}


/* -------------------------------------------------
   RESET FORM
-------------------------------------------------- */

export function resetAddForm() {
    console.log("Reset Add Photo form");

    showTempError("");

    form.reset();
    preview.innerHTML = `<i class="fa-regular fa-image"></i>`;
    uploadBtn.style.display = "block";
    uploadInfo.style.display = "block";
    validateBtn.classList.add("modal__btn--disabled");
    validateBtn.disabled = true;
}


/* -------------------------------------------------
   LOAD CATEGORIES
-------------------------------------------------- */

export async function loadCategories() {
    console.log("Loading categories…");

    const res = await fetch("http://localhost:5678/api/categories");
    const cats = await res.json();
    categorySelect.innerHTML = `<option value="">Selectionnez une catégorie</option>`;


    cats.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        categorySelect.appendChild(opt);
    });
}


/* -------------------------------------------------
   PREVIEW
-------------------------------------------------- */

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) {
        updateSubmitState();
        return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
        showTempError("Only JPG/PNG allowed");
        return;
    }
    if (file.size > 4 * 1024 * 1024) {
        showTempError("Max size 4MB");
        fileInput.value = "";
        return;
    }

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.classList.add("preview-img");

    preview.innerHTML = "";
    preview.appendChild(img);

    uploadBtn.style.display = "none";
    uploadInfo.style.display = "none";

    updateSubmitState();
});


/* -------------------------------------------------
   SUBMIT FORM
-------------------------------------------------- */

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    //Check img
    if (!fileInput.files[0] || !titleInput.value || !categorySelect.value) {
        showTempError("Veuillez remplir tous les champs.");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    const token = localStorage.getItem("authToken");

    const res = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });

    if (!res.ok) {
        showTempError("Échec de l'envoi.");
        return;
    }

    await new Promise(r => setTimeout(r, 400));
    
    // Refresh gallery screen
    loadModalGallery();
    initGallery();
    showGalleryScreen();
    resetAddForm();
});


/* -------------------------------------------------
   BACK BUTTON
-------------------------------------------------- */

backBtn.addEventListener("click", () => {
    console.log("Back to gallery screen");
    showGalleryScreen();
    resetAddForm();
});
