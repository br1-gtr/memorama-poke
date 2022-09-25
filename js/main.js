const d = document;
const cardsContainer = d.getElementById('cardsContainer');
let select = true;
let score = 0;
let countEquals = 0; 
const btnReload = d.querySelector('.btn-reload');
btnReload.addEventListener('click', () => {
    location.reload();
});

const getAPiData = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then( res => res.json())
    .then( data => data)
};

const buildArray = () => {
    const arrCards = [];
    for ( let i = 0; i < 6; i++) {
        const aux = Math.floor(Math.random() * 152) ;
        arrCards.push(aux);
    };
    return arrCards;
};

const buildArrShuffle = (arr) => {
    const arrOk = (arr.concat(arr)).sort( (a,b)=> Math.random() - 0.5 );
    return arrOk;
};

const arrShuffle = buildArrShuffle(buildArray());

const renderCards = (arr) => {
    for(let i = 0; i < arr.length ; i++){
        getAPiData(arr[i]).then( pok => {
            cardsContainer.innerHTML += `
            <div class="card flex c" id="${arr[i]}">
                <div class="card-reveal flex">
                    <p>?</p>
                </div>
                <img src="${pok.sprites.front_default}" class="img-poke" alt="...">
                <p class="card-title">${pok.name.toUpperCase()}</p>
            </div>
            `;
        });
    };
};

renderCards(arrShuffle);

cardsContainer.addEventListener('click', evt => {
    if ( !evt.target.classList.contains('cards') ){
        let tgt = evt.target.parentElement;
        if ( evt.target.classList.contains('card') ){
            tgt = evt.target;
        }
        selectionCard(tgt, select);
    };  
});

let moveOne,
    moveTwo;
    
const selectionCard = (tgt, selectState) => {
    if (selectState && tgt.classList.contains('card-reveal')) {
        moveOne = tgt;
        moveOne.classList.add('index-card');
        select = false;
    } else if (tgt.classList.contains('card-reveal')) {
        moveTwo = tgt;
        moveTwo.classList.add('index-card');
        select = true;
        checkMove(moveOne, moveTwo);
    };
};

const checkMove = (m1, m2) => { // valida por nombres del card-title
    if ((m1.parentElement.querySelector('.card-title').textContent) === (m2.parentElement.querySelector('.card-title').textContent)) {
        areEquals();
    } else {
        setTimeout(()=>{
            notEquals(m1, m2);
        }, 500);
    };
    score++;
    d.querySelector('.scoreCount').textContent = score;
};

const areEquals = () => {
        countEquals++;
        if ( countEquals === 6 ) {
            d.querySelector('.gameOverScore').textContent = score+1;
            d.querySelector('.gameOver').style.visibility = 'visible';
        }
};
const notEquals = (m1, m2) => {
    console.log('NO son iguales');
    m1.classList.remove('index-card')
    m2.classList.remove('index-card')
};

