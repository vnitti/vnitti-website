const currentPage = window.location.href;
const currentPath = window.location.pathname;
const pixelsPath = "pixelart.html";

// ===== ONLY FOR PIXELS PAGE =====
if (currentPath === pixelsPath) {

    console.log("aaa");
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
    const domain = currentPage.split("/")[2]; //returns "https://www.vnitti.com"
    
    const menuAnchors = document.querySelectorAll(".menu-a");
  
    menuAnchors.forEach(a => {
        let btn = a.querySelector("button");
        let aHref = a.href;

        console.log(currentPage);

        if (aHref === currentPage || aHref === domain) {
            btn.classList.add("active-menu-btn");
            console.log("IT'S THE SAME SHIT");
        };
    });
});



