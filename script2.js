document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.pathname;
    //let currentPage = "http://127.0.0.1:5502/index.html";
    
    // Get references to the menu buttons
    const menuButtons = document.querySelectorAll(".menu-btn");
    let anchor = null;
  
    // Check the current page and add the "active" class to the corresponding button
    menuButtons.forEach(button => {
        anchor = button.querySelector("a");
        let anchorHref = anchor.href;

        console.log(anchorHref);
        console.log(currentPage);

        if (anchorHref === currentPage) {
            button.classList.add("active-menu-btn");
            anchor.classList.add("active-menu-a");
        };
    });
});