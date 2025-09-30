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
        console.log("Travaux récupérés :", data);
    })
    .catch(err => console.error(err));