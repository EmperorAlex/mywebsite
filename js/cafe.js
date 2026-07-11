document.addEventListener("DOMContentLoaded", () => {

    const pages = {
        journal: "journal.html",
        profiles: "profiles.html",
        garden: "garden.html",
        surprise: "surprise.html"
    };

    Object.entries(pages).forEach(([id, page]) => {

        const button = document.getElementById(id);

        if (!button) return;

        button.addEventListener("click", () => {

            window.location.href = page;

        });

    });

});