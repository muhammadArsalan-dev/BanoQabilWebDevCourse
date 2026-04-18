fetch("../header/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});
const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../header/header.css";
    document.head.appendChild(link);


function showFunctionList() {

    document.getElementById('main-trigger').style.display = 'none';
    document.getElementById('function-list').style.display = 'flex';
}

fetch("../hero/hero.html")
.then(res => res.text())
.then(data => {
    document.getElementById("hero").innerHTML = data;
});
const linkHeroCss = document.createElement("link");
linkHeroCss.rel = "stylesheet";
linkHeroCss.href = "../hero/hero.css";
document.head.appendChild(linkHeroCss);

const script = document.createElement("script");
    script.src = "../hero/hero.js";
    document.body.appendChild(script);


fetch("../footer/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
}); 

const linkFooterCss = document.createElement("link");
linkFooterCss.rel = "stylesheet";
linkFooterCss.href = "../footer/footer.css";
document.head.appendChild(linkFooterCss);

