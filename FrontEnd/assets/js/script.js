// URL du back-end (GET/works)
const apiUrl = "http://localhost:5678/api/works";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json(); //Convertion JSON
    })
    .then(data => {
        DisplayGallery(data);
    })
    .catch(err => console.error(err));
    let gallery = document.querySelector(".gallery")
    
    function DisplayGallery (data) {
        data.forEach((item) => {
            console.log(item);
            const figure = document.createElement("figure");
            const img = document.createElement ("img");
            img.src = item["imageUrl"];
            img.alt = item["title"];
            const figcaption = document.createElement("figcaption");
            figcaption.innerText = item["title"];
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    }
