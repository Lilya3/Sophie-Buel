// import
import "./modale.js";

// URL du back-end (GET/works)
const apiUrlworks = "http://localhost:5678/api/works";

fetch(apiUrlworks)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json(); //Convert to JSON
    })
    .then(worksData => {
        // affichage départ
        DisplayGallery(worksData);
        // charge categories + envoi worksData
        loadCategories(worksData);
    })
    .catch(err => console.error(err));

    
// ---------------- Galerie ------------------------------
const gallery = document.querySelector(".gallery");
    
function DisplayGallery (data) {
    gallery.innerHTML =""; //reset
    data.forEach(item => {
        console.log(item);
        const figure = document.createElement("figure");
        const img = document.createElement ("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = item.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// ---------------- Catégories + filtres ----------------
function loadCategories(worksData) {
    const apiCategories = "http://localhost:5678/api/categories";

    fetch(apiCategories)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json(); //Convert to JSON
    })
    .then(categories => {
        const CatIdName = Array.from(
            categories.map(category => {
                return {id: category.id, name: category.name};
            })
        );
        console.log("Catégories filtrées :", CatIdName);
        
        DisplayCategory(CatIdName, worksData);
    })
    .catch(err => console.error(err));
}
    
//Création de filtres
    function DisplayCategory (CatIdName, worksData) {
        const filterDiv = document.querySelector(".filter");
        filterDiv.innerHTML = "";

        // Bouton "Tous"
        const allBtn = document.createElement("button");
        allBtn.textContent = "Tous" ;
        allBtn.classList.add("btn");
        allBtn.addEventListener("click", () => {
            DisplayGallery(worksData);
        });
        filterDiv.appendChild(allBtn);

        //Boutons par catégorie
        CatIdName.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.classList.add("btn");
            btn.addEventListener("click", () => {
                const filtered = worksData.filter(work => work.categoryId === category.id);
                DisplayGallery(filtered);
            });
            filterDiv.appendChild(btn);
        });
    }

    // Gestion du login/logout + btn "modifier"

    const token = localStorage.getItem("token");
    const authLink = document.getElementById("authLink");
    const editButton = document.getElementById("editButton");
    const editBanner = document.getElementById("editBanner");
    const filterDiv = document.querySelector(".filter");
    
    // Login/Logout
    if(token) {
        authLink.textContent = "logout";
        authLink.href = "#";
        authLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            window.location.reload();
        });

        //UI login
        editButton?.classList.remove("hidden");
        editBanner?.classList.remove("hidden");
        editBanner?.setAttribute("aria-hidden","false");
        filterDiv?.classList.add("hidden");

    } else {
        authLink.textContent = "login";
        authLink.href = "./login.html";
        editButton?.addEventListener("click", () => {
            window.location.href = "./login.html";
        });

        //UI logout
        editBanner?.classList.add("hidden");
        editBanner?.setAttribute("aria-hidden","true");
        filterDiv?.classList.remove("hidden");
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    