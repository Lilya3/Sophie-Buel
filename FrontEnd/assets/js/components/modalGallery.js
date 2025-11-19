/* -------------------------------------------------
        Modal Gallery — main gallery modal
   ------------------------------------------------- */

import { openModal} from "../utils/modalHelpers.js";
import { closeModal } from "../utils/modalHelpers.js";
import { getWorks } from "../api/worksApi.js";
import { clearElement } from "../utils/domHelpers.js";
import { openConfirm } from "./modalConfirm.js";


const galleryModal = document.getElementById("galleryModal");
const galleryContent = galleryModal.querySelector(".modal__content");
const closeBtn = galleryModal.querySelector(".modal__close");
const openEditBtn = document.getElementById("editButton");

// open modal
openEditBtn?.addEventListener("click", () => {
    console.log("click open gallery");
    openModal(galleryModal);
});

// close modal
closeBtn.addEventListener("click", () => {
    console.log("click close gallery");
    closeModal(galleryModal);
});

/**
 * Load works into modal gallery
 */
export async function loadModalGallery() {
    console.log("start loadModalGallery");

    const works = await getWorks();
    clearElement(galleryContent);

    works.forEach(work => {
        console.log("add mini");

        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const trash = document.createElement("i");
        trash.classList.add("fa-solid");
        trash.classList.add("fa-trash-can");
        trash.classList.add("delete-icon");

        trash.addEventListener("click", () => {
            console.log("click trash");
            openConfirm(work.id);
        });

        figure.appendChild(img);
        figure.appendChild(trash);
        galleryContent.appendChild(figure);
    });

    // Separator
    const separator = document.createElement("hr");
    separator.classList.add("modal__separator");
    galleryContent.appendChild(separator);
}
