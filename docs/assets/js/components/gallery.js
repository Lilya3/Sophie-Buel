/* -------------------------------------------------
Main gallery and category filters
------------------------------------------------- */

import { getWorks, getCategories } from "../api/worksApi.js";
import { createElement, clearElement } from "../utils/domHelpers.js";

const galleryEl = document.querySelector(".gallery");
const filterEl = document.querySelector(".filter");

let allWorks = [];

/* -------------------------------------------------
   Render gallery
-------------------------------------------------- */
export function renderGallery(works) {
    console.log("renderGallery : start");

    if (!galleryEl) return;

    console.log("renderGallery : clear gallery");
    clearElement(galleryEl);

    works.forEach(work => {
        console.log("renderGallery : add item", work.title);

        const figure = createElement("figure");
        figure.dataset.id = work.id;

        const img = createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const caption = createElement("figcaption");
        caption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(caption);

        galleryEl.appendChild(figure);
    });
}

/* -------------------------------------------------
   Render category filters
-------------------------------------------------- */
function renderFilters(categories) {
    console.log("renderFilters : start");

    if (!filterEl) return;

    clearElement(filterEl);

    // ----- Button "Tous"
    const allBtn = createElement("button");
    allBtn.classList.add("btn");
    allBtn.textContent = "Tous";

    allBtn.addEventListener("click", () => {
        console.log("filter : Tous");
        renderGallery(allWorks);
    });

    filterEl.appendChild(allBtn);

    // ----- Buttons for each category
    categories.forEach(cat => {
        console.log("create filter :", cat.name);

        const btn = createElement("button");
        btn.classList.add("btn");
        btn.textContent = cat.name;

        btn.addEventListener("click", () => {
            console.log("filter :", cat.name);
            const filtered = allWorks.filter(work => work.categoryId === cat.id);
            renderGallery(filtered);
        });

        filterEl.appendChild(btn);
    });
}

/* -------------------------------------------------
   Init gallery on page load
-------------------------------------------------- */
export async function initGallery() {
    console.log("initGallery : start");

    try {
        console.log("initGallery : load works");
        allWorks = await getWorks();

        renderGallery(allWorks);

        console.log("initGallery : load categories");
        const categories = await getCategories();

        renderFilters(categories);
    } 
    catch (err) {
        console.log("initGallery : ERROR", err);
    }
}