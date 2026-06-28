//Responsive : Menu Burger 
const burger = document.getElementById('burger');
const nav = document.querySelector('header nav');

burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
});