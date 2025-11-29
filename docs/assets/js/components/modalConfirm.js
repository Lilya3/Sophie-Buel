/* -------------------------------------------------
   Modal Confirm — delete confirmation popup
   ------------------------------------------------- */

import { deleteWork } from "../api/worksApi.js";
import { loadModalGallery } from "./modalGallery.js";
import { showSuccessToast } from "./successmsg.js";
import { renderGallery } from "./gallery.js";
import { getWorks } from "../api/worksApi.js";


const confirmModal = document.getElementById("confirmModal");
const btnYes = document.getElementById("confirmYes");
const btnNo = document.getElementById("confirmNo");

let itemToDeleteId = null;

export function openConfirm(id) {
    console.log("open confirm");
    itemToDeleteId = id;
    confirmModal.classList.remove("hidden");
}

function closeConfirm() {
    console.log("close confirm");
    itemToDeleteId = null;
    confirmModal.classList.add("hidden");
}

btnYes.addEventListener("click", async () => {
    if (!itemToDeleteId) return;

    await deleteWork(itemToDeleteId);

    closeConfirm();

    // Refresh modal gallery
    loadModalGallery();

    // Refresh main gallery
    const updatedWorks = await getWorks();
    renderGallery(updatedWorks);

    showSuccessToast();
});


btnNo.addEventListener("click", () => {
    console.log("click no");
    closeConfirm();
});
