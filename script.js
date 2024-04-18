const currentPath = window.location.pathname;
const pixelsPath = "pixelart.html";
let currentPage = window.location.href;


// ===== ONLY FOR PIXELS PAGE =====
if (currentPath === pixelsPath) {
    let galleryImg = document.querySelectorAll('.gallery img');
    let ex = document.querySelector('.ex');

    galleryImg.forEach(image => {
        image.onclick = () => {
            document.querySelector('.popup-img').style.display = 'block';
            document.querySelector('.popup-img img').src = image.getAttribute('src');
        }
    });

    ex.addEventListener('click', () => {
        document.querySelector('.popup-img').style.display = 'none';
        console.log("img selected");
    });
};


// ===== GENERAL =====
document.addEventListener("DOMContentLoaded", ()=> {
    const menuAnchors = document.querySelectorAll(".menu-a");

    if (currentPage.endsWith("/") || currentPath === "" ) {
        currentPage += "index.html";
        console.log("index.html added");
    };
  
    menuAnchors.forEach(a => {
        const btn = a.querySelector("button");
        const aHref = a.href;

        console.log(aHref);

        if (currentPage === aHref) {
            btn.classList.add("active-menu-btn");
            console.log("active.");
        };
    });
});



