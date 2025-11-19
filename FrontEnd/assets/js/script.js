/* -------------------------------------------------
   Loads all modules and initializes the page
   ------------------------------------------------- */

import { setupIndexPage } from "./components/indexPage.js";
import { setupEditButton } from "./components/editButton.js";
import { initGallery } from "./components/gallery.js";
import { loadModalGallery } from "./components/modalGallery.js";
import "./components/modalAddPhoto.js";

console.log("start script.js");

// 1. Setup login/logout UI, edit-banner, filters visibility
console.log("load indexPage");
setupIndexPage();

// 2. Setup "modifier" button display/behavior
console.log("load editButton");
setupEditButton();

// 3. Load the main gallery + categories
console.log("load gallery");
initGallery();

// 4. Preload modal gallery (optional but smooth UX)
console.log("load modalGallery");
loadModalGallery();