let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle')
let cardname = document.querySelector('#cardname')
let carddescription = document.querySelector('#carddescription')
let flipcard = document.querySelector('.flipcard')

let teachers = [
    {name: 'Maximilian',description: 'colui che in realtà è innocente', url: './media/MB.jpg'},
    {name: 'Brazian',description: 'mangiatore di patate al sugo', url: './media/BC.jpg'},
    {name: 'Anastander',description: 'ballerino e basta', url: './media/AA.jpeg'},
    {name: 'Domink de rait',description: 'colui che non sapeva l`esistenza del marmo bianco di carrara', url: './media/ddr.jpeg'}
];


teachers.forEach((docente)=>{
    let div = document.createElement(`div`);
    div.classList.add(`moved`);
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
    



})




let movedDivs = document.querySelectorAll('.moved');

let check = false;

opener.addEventListener('click', ()=>{
    if(check == false){
    opener.style.transform = 'rotate(45deg)'
    movedDivs.forEach((moved, i)=>{
        let angle = (360 * i) / movedDivs.length;
        moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
    });
    check = true
}else{
    check = false;
    opener.style.transform = '';
    movedDivs.forEach((moved, i)=>{
        moved.style.transform = ``;
    });
    flipcard.classList.add('d-none')

}
});
let innerface = document.querySelector('.innerface')


movedDivs.forEach((moved, i)=>{
    moved.addEventListener('click', ()=>{
        flipcard.classList.remove('d-none')
        let docente = teachers[i];
        innerface.style.backgroundImage = `url(${docente.url})`;
        cardname.innerHTML = docente.name;
        carddescription.innerHTML = docente.description;

    })
});
