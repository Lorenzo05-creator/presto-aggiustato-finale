let navbar = document.querySelector(`#navbar`);
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logo-navbar')



window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    if (scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link)=>{
            link.style.color = 'var(--black)'
            
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo.png';
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-yellow');
        navbar.style.height = '90px';
        links.forEach((link)=>{
            link.style.color = 'var(--yellow)'
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo-yellow.png';
    }
    
});


//chiamate asincrone: 
// setInterval: crea un ciclo infinito in cui possiamo gestire le interazioni
// settimeout : fa partire il blocco dopo tot secondi


let firstnumber = document.querySelector('#firstnumber')
let secondnumber = document.querySelector('#secondnumber')
let thirdnumber = document.querySelector('#thirdnumber')
let confirm = true;

function createinterval(n, element, time) {
    let counter = 0;
    let interval = setInterval(()=> {
        if (counter < n) {
            counter++
            element.innerHTML = counter;
        }else{
            console.log('finito bro');
            clearInterval(interval)
            
        }
        
    }, time);
    
    setTimeout(() => {
        confirm = true
    }, 8000);
    
}

// intersectionobserver: all'incontro scatta la funzione

let observer = new IntersectionObserver ((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm){
            createinterval(100, firstnumber, 100);
            createinterval(200, secondnumber, 50);
            createinterval(300, thirdnumber, 20);  
            confirm = false;
        }
    })
});

observer.observe(firstnumber);

let reviews = [
    {user: `matteo`, description: `Sandro perrone`, rank:5},
    {user: `Thomas`, description: `Christian La Greca`, rank:1},
    {user: `Mary`, description: `Rosetta`, rank:2},
    {user: `Ferrigno`, description: `Matteo de patta`, rank:3}
]

let swiperWrapper = document.querySelector(`.swiper-wrapper`);

reviews.forEach((recensione)=>{
    let div = document.createElement(`div`)
    div.classList.add(`swiper-slide`)
    div.innerHTML = `
             <div class="card-review">
         <p class="lead text-center">${recensione.description}
         </p>
             <p class="h4 text-center">${recensione.user}</p>
             <div class="d-flex justify-content-center star">
    </div>
    </div>
    `;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll(`.star`);
stars.forEach((star, index)=>{
    for (let i = 0; i < reviews[index].rank; i++) {
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-solid`, `fa-star`);
        star.appendChild(icon);
        
    }

    let difference = 5 - reviews[index].rank;

    for (let i = 0; i < difference; i++) {
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-regular`, `fa-star`);
        star.appendChild(icon);

}

});






//swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
    
});