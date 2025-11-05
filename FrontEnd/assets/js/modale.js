// Afficher bouton "modifier" seulement si user connecté
    const token = localStorage.getItem("token");
    const editButton = document.getElementById("editButton");
    if (token) editButton.classList.remove("hidden");

    // Ouverture/Fermeture modale
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

    // Navigator back
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

    // ---------------- Gallery Miniature ------------------------------

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


    // Séparateur
    const separator = document.createElement("hr");
    separator.classList.add("modal__separator");
    separator.setAttribute("aria-hidden", "true");
    galleryminiature.appendChild(separator);
}
