// Display btn "modifier" only if user logged
    const token = localStorage.getItem("token");
    const editButton = document.getElementById("editButton");
    if (token) editButton.classList.remove("hidden");

    // ------------------Open/Close modal gallery-------------------

    const modal = document.getElementById("galleryModal");
    const overlay = modal.querySelector(".modal__overlay");
    const closeBtn = modal.querySelector(".modal__close");

    function openModal(pushHistory = true) {
        if (modal.classList.contains("is-open")) return;

        modal.classList.add("is-open")
        modal.setAttribute("aria-hidden","false");
        document.body.style.overflow = "hidden";

        if (pushHistory) {
            history.pushState({ modalOpen: true }, "", "#modal");
        }
    }

    function closeModal(pushHistory = true) {
        document.activeElement.blur();
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow ="";

        if (pushHistory && history.state && history.state.modalOpen) {
            history.back();
        }
    }

    editButton?.addEventListener("click", openModal);
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", e=>{
        if(e.key==="Escape" && modal.classList.contains("is-open")) closeModal();
    });

    // Browser back
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.modalOpen) {
            openModal(false);
        } else {
            closeModal(false);
        }
    });

    if (window.location.hash === "#modal") {
        openModal(false)
    }

    // Photo Gallery Miniature 

const galleryminiature = document.querySelector(".modal__content");

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  DisplayGallery(data);
}

getWorks();

function DisplayGallery (data) {
    galleryminiature.innerHTML =""; //reset
    data.forEach(item => {
        console.log(item);
        const figure = document.createElement("figure");

        const img = document.createElement ("img");
        img.src = item.imageUrl;
        img.alt = item.title;

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-solid", "fa-trash-can", "delete-icon");


        const figcaption = document.createElement("figcaption");

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteBtn);

        galleryminiature.appendChild(figure);
    });


    // Séparator line
    const separator = document.createElement("hr");
    separator.classList.add("modal__separator");
    separator.setAttribute("aria-hidden", "true");
    galleryminiature.appendChild(separator);
}


// --------------- Modal " Ajout Photo "----------------
const addPhotoModal = document.getElementById("addPhotoModal");
const addPhotoBtn = document.getElementById("addPhoto");
const addPhotoOverlay = addPhotoModal.querySelector(".modal__overlay");
const addPhotoCloseBtn = addPhotoModal.querySelector(".modal__close");

// Open modal add photo
function openAddPhotoModal(pushHistory = true) {
    //Close Gallery Modal before open this one
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    //Open modal addphoto
    addPhotoModal.classList.add("is-open");
    addPhotoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (pushHistory) {
        history.pushState({ addPhotoOpen: true}, "", "#addphoto");
    }
}

// Close modal addPhoto
function closeAddPhotoModal(pushHistory = true) {
    addPhotoModal.classList.remove("is-open");
    addPhotoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (pushHistory && history.state && history.state.addPhotoOpen) {
        history.back();
    }
}

// Click
addPhotoBtn.addEventListener("click", openAddPhotoModal);
addPhotoOverlay.addEventListener("click", closeAddPhotoModal);
addPhotoCloseBtn.addEventListener("click", closeAddPhotoModal);

// Escape Key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && addPhotoModal.classList.contains("is-open")) {
        closeAddPhotoModal();
    }
});

// Browser History
window.addEventListener("popstate", (event) => {
    if (event.state?.addPhotoOpen) {
        openAddPhotoModal(false);
    } else if (event.state?.modalOpen) {
        openModal(false);
    } else {
        closeAddPhotoModal(false);
        closeModal(false);
    }
});

// Direct opening with #addphoto (si refresh)
if (window.location.hash === "#addphoto") {
    openAddPhotoModal(false);
}