document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.href;
    let domain = currentPage.split("/")[2];
    console.log(domain);
    
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