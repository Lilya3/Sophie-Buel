/* -------------------------------------------------
   Loads all modules and initializes the page
-------------------------------------------------- */

import { setupIndexPage } from "./components/indexPage.js";
import { setupEditButton } from "./components/editButton.js";
import { initGallery } from "./components/gallery.js";

// Modal screens (gallery + add photo)
import "./components/modalGallery.js";
import "./components/modalAddPhoto.js";

console.log("start script.js");

// 1. Setup login/logout UI, edit banner, filters visibility
console.log("load indexPage");
setupIndexPage();

// 2. Setup "modifier" button display/behavior
console.log("load editButton");
setupEditButton();

// 3. Load the main gallery on homepage
console.log("load gallery");
initGallery();

// No need to preload modal gallery anymore
console.log("modalGallery will load on click");
