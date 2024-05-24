const currentPath = window.location.pathname;
const pixelsPathEn = "/en/pixelart/";
const pixelsPathSp = "/sp/pixelart/";
let currentPage = window.location.href;
console.log("script.js loaded");

// ===== ONLY FOR PIXELS PAGE =====
console.log(currentPath);
if (currentPath === pixelsPathEn || currentPath === pixelsPathSp) {
    
    let galleryImg = document.querySelectorAll('.gallery img');
    let ex = document.querySelector('.ex');

    galleryImg.forEach(image => {
        image.addEventListener("click", () => {
            document.querySelector('.popup-img').style.display = 'block';
            document.querySelector('.popup-img img').src = image.getAttribute('src');
        });
    });

    ex.addEventListener('click', () => {
        document.querySelector('.popup-img').style.display = 'none';
    });
} else {
    console.log("didn't work");
};



// ===== GENERAL =====
document.addEventListener("DOMContentLoaded", ()=> {
    const menuAnchors = document.querySelectorAll(".menu-a");

    if (currentPath === "" ) {
        currentPage += "/";
        //console.log(currentPage);
        //console.log("/ added");
    };
  
    menuAnchors.forEach(a => {
        const btn = a.querySelector("button");
        const aHref = a.href;
        //console.log(aHref);

        if (currentPage === aHref) {
            btn.classList.add("active-menu-btn");
            //console.log("active.");
        };
    });
});

document.addEventListener("DOMContentLoaded", ()=> {
    const languageAnchors = document.querySelectorAll(".en-es-a");
    let aEn;
    let aSp;

    languageAnchors.forEach(a => {
        if(a.innerHTML === "en") {
            aEn = a;
        };

        if (a.innerHTML === "sp") {
            aSp = a;
        };
    });

    if (currentPath.substring(0, 3) === "/en") {
        aEn.classList.add("active-language-a");
    } else {
        aSp.classList.add("active-language-a");
    };
});


// ===== LANGUAGE SWAPPING =====
/*
const englishDivs = document.querySelectorAll(".english");
const spanishDivs = document.querySelectorAll(".spanish");

englishDivs.forEach(div => {
    div.style.display = "none";
});
*/