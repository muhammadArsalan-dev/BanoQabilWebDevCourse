function loadComponent(id, file) {
    fetch(file)
    .then(response => {
        if (!response.ok) throw new Error('Not found');
        return response.text();
    })
    .then(data => {
        document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(err));
}

loadComponent("navbar", "../navbar/navbar.html");
loadComponent("hero", "../hero/hero.html");
loadComponent("footer", "../footer/footer.html");