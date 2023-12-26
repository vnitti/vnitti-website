let galleryImg = document.querySelectorAll('.gallery img');
let ex = document.querySelector('.ex');
let navLi = document.querySelectorAll('.nav-ul');

galleryImg.forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup-img').style.display = 'block';
        document.querySelector('.popup-img img').src = image.getAttribute('src');
    }
});

ex.onclick = () => {
    document.querySelector('.popup-img').style.display = 'none';
}

navLi.forEach(li => {
    li.onclick = () => {
        console.log("1");
        document.querySelector('. li a class') = 'nav-li-selected';
        console.log("2");
    }
})
