/* -------------------------------------------------
   Modal Gallery — screen 1
-------------------------------------------------- */

import { openModal } from "../utils/modalHelpers.js";
import { getWorks } from "../api/worksApi.js";
import { openConfirm } from "./modalConfirm.js";
import { clearElement } from "../utils/domHelpers.js";
import { loadCategories } from "./modalAddPhoto.js";

const modal = document.getElementById("modal");
const screenGallery = document.getElementById("modal-gallery");
const screenAdd = document.getElementById("modal-add");

const openEditBtn = document.getElementById("editButton");
const btnToAddPhoto = document.getElementById("btnToAddPhoto");
const galleryContent = document.getElementById("modalGalleryContent");


/**
 * Switch to a modal screen
 */
function showScreen(screen) {
    screenGallery.classList.remove("active");
    screenAdd.classList.remove("active");

    screen.classList.add("active");
}


/**
 * Load gallery content (thumbnails)
 */
export async function loadModalGallery() {
    console.log("Loading modal gallery thumbnails…");

    const works = await getWorks();

    clearElement(galleryContent);

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can", "delete-icon");

        trash.addEventListener("click", () => {
            openConfirm(work.id);
        });

        figure.appendChild(img);
        figure.appendChild(trash);

        galleryContent.appendChild(figure);
    });
}


/**
 * Buttons actions
 */
openEditBtn?.addEventListener("click", () => {
    console.log("Open main modal + gallery screen");
    showScreen(screenGallery);
    loadModalGallery();
    openModal();
});

btnToAddPhoto.addEventListener("click", () => {
    if (!modal.classList.contains("is-open")) return;
    
    console.log("Switch to Add Photo screen");
    showScreen(screenAdd);
    loadCategories();
});



