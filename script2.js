document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.href;
    //let currentPage = "http://127.0.0.1:5502/index.html";
    
    // Get references to the menu buttons
    const menuButtons = document.querySelectorAll(".menu-btn");
  
    // Check the current page and add the "active" class to the corresponding button
    menuButtons.forEach(button => {
        let anchor = button.querySelector("a");
        let anchorHref = anchor.href;

        console.log(anchorHref);
        console.log(currentPage);

        if (anchorHref === currentPage) {
            button.classList.add("active-menu-btn");
            anchor.classList.add("active-menu-a");
            console.log("IT'S THE SAME SHIT");
        };
    });
});