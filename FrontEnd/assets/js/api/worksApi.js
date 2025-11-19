const BASE_URL = "http://localhost:5678/api";

/* -------------------------------------------------
   GET Works (liste des projets)
-------------------------------------------------- */
export async function getWorks() {
    console.log("→ getWorks : start");

    try {
        const response = await fetch(`${BASE_URL}/works`);
        console.log("→ getWorks : response received");

        if (!response.ok) {
            console.log("→ getWorks : error HTTP");
            throw new Error("Erreur HTTP");
        }

        console.log("→ getWorks : success");
        return await response.json();
    } catch (err) {
        console.log("→ getWorks : fetch failed");
        throw err;
    }
}

/* -------------------------------------------------
   GET Categories
-------------------------------------------------- */
export async function getCategories() {
    console.log("→ getCategories : start");

    try {
        const response = await fetch(`${BASE_URL}/categories`);
        console.log("→ getCategories : response received");

        if (!response.ok) {
            console.log("→ getCategories : error HTTP");
            throw new Error("Erreur HTTP");
        }

        console.log("→ getCategories : success");
        return await response.json();
    } catch (err) {
        console.log("→ getCategories : fetch failed");
        throw err;
    }
}

/* -------------------------------------------------
   DELETE Work
-------------------------------------------------- */
export async function deleteWork(id) {
    console.log("→ deleteWork : start", "id =", id);

    const token = localStorage.getItem("token");

    if (!token) {
        console.log("→ deleteWork : no token");
        throw new Error("Utilisateur non connecté");
    }

    try {
        const response = await fetch(`${BASE_URL}/works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("→ deleteWork : response received");

        if (!response.ok) {
            console.log("→ deleteWork : delete error");
            throw new Error("Erreur de suppression");
        }

        console.log("→ deleteWork : success");
        return true;
    } catch (err) {
        console.log("→ deleteWork : fetch failed");
        throw err;
    }
}

/* -------------------------------------------------
   POST Work
-------------------------------------------------- */
export async function createWork(formData) {
    console.log("→ createWork : start");

    const token = localStorage.getItem("token");

    if (!token) {
        console.log("→ createWork : no token");
        throw new Error("Utilisateur non connecté");
    }

    try {
        const response = await fetch(`${BASE_URL}/works`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        console.log("→ createWork : response received");

        if (!response.ok) {
            console.log("→ createWork : error HTTP");
            throw new Error("Erreur ajout");
        }

        console.log("→ createWork : success");
        return await response.json();
    } catch (err) {
        console.log("→ createWork : fetch failed");
        throw err;
    }
}