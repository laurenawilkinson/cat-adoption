// variables
let game = document.getElementById('game');
import Cat from './Cat.js';
let catArray;
let starters;
let myCat;
let starterElement;
let hungerBar;
let energyBar;
let happinessBar;
let cleanBar;
let catPic;
let catItem;
let catMarquee;

fetch('./scripts/cats.json')
.then(res => res.json())
.then(json => {
    catArray = json;
    gameSetup();
});

function getStarters () {
    const starters = new Set();
    
    // until starters.length === 3, add random catArray objects 
    while (starters.size < 3) {    
        let random = Math.floor(Math.random() * catArray.length);
        let starterCat = catArray[random];

        starters.add(starterCat);
    }
    return Array.from(starters);
}

function gameSetup () {
    // on pageload
    game.innerHTML = '';
    catMarquee = document.getElementById('marquee');

    for(let i = 0, l = catArray.length; i < l; i++){
        catMarquee.innerHTML += `<img src="images/cats/${catArray[i].name}-idle.png" />`
    }

    catMarquee.style.width = (catArray.length * 150) + 'px';

    start();
}

// functions
function start () {
    starters = getStarters();
    
    game.innerHTML = `<h2 class="heading">Choose your cat!</h2>`;
    
    // itterate over starters to input html
    for (let starter of starters){
        if(starter.type === 'Rare'){
            starterElement = 
            `<div class="starter-tile" id="${starter.name}">
                <img src="images/cats/${starter.name}.png"></img>
                <div class="starter-content">
                    <h3>${starter.name}</h3>
                    <small><strong>Personality:</strong> ${starter.personality}<br>
                    <strong>Description:</strong> ${starter.description}</small><div class="rare">RARE</div>
                </div>`;
        }
        else {
            starterElement = 
            `<div class="starter-tile" id="${starter.name}">
                <img src="images/cats/${starter.name}.png"></img>
                <div class="starter-content">
                    <h3>${starter.name}</h3>
                    <small><strong>Personality:</strong> ${starter.personality}<br>
                    <strong>Description:</strong> ${starter.description}</small>
                </div>`;
        }
        
        game.innerHTML = game.innerHTML + starterElement;
    }
    
    
    
     game.innerHTML += `<p id="refreshButton" class="cat-button">Refresh</p>`;

     document.querySelector('#refreshButton').addEventListener('click', () => start());
    
    // itterate again to add click event
    starters.forEach(function (item, idx){
        let starterId = document.getElementById(`${item.name}`);
        starterId.addEventListener('click', () =>{
            chosenStarter(item);
        });
    });
   
}

function chosenStarter(item){
    myCat = new Cat(item);
    catMarquee.style.display = 'none';
    
    game.innerHTML = 
    `<h2 class="heading">Congratulations! Your chosen starter is ${myCat.name}</h2>
        <p>If you would like to <strong>change</strong> your cats name, type a name below and press enter</p>
        <p>If you want to keep the name <strong>${myCat.name}</strong>, press enter to continue</p>
        <input type="text" id="chooseName" placeholder="enter a name" maxlength="16" autofocus>`;
    let nameInput = document.getElementById('chooseName');
    
    // set char limit
    nameInput.addEventListener("keyup", function(e) {
          e.preventDefault();
          if (e.keyCode === 13) {
              if (nameInput.value !== '') {
                  myCat.name = nameInput.value;
              }
              startGame(myCat);
          }
    });
}

function startGame(myCat){        
    myCat.info = `${myCat.name} is happy and healthy! :)`;
    // html elements
    game.innerHTML = 
    `<div class="col left-col">
        <h2>${myCat.name}</h2>
        <div class="default" id="item"></div>
        <img src="images/cats/${myCat.breed}-idle.png" id="cat-pic" onclick="myCat.pet()">
        <p><h3>Purrsonality:</h3> <span>${myCat.personality}</span></p>
        <p><h3>Description:</h3> <span>${myCat.description}</span></p>
        <p><h3>Power Lvl:</h3> <span>${myCat.powerLevel}</span></p>
    </div>
    <div class="col right-col">
        <div class="col col-1">
            <h3>Energy</h3>
            <div id="energy" class="bar"></div>
            <h3>Hunger</h3>
            <div id="hunger" class="bar"></div>
        </div>
        <div class="col col-2">
            <h3>Happiness</h3>
            <div id="happiness" class="bar"></div>
            <h3>Cleanliness</h3>
            <div id="cleanliness" class="bar"></div>
        </div>
        <div class="interaction">
            <p id="info">${myCat.info}</p>
            <ul>
                <li>
                <button class="cat-button" id="feed">Feed</button></li>
                <li>
                <button class="cat-button" id="play">Play</button></li>
                <li>
                <button class="cat-button" id="sleep">Sleep</button></li>
                <li>
                <button class="cat-button" id="wash">Wash</button></li>
                <li id="shop"><img src="images/assets/shop-btn.png" width="50px" height="50px"></li>
            </ul>
        </div>
    </div>`;
    
    myCat.setup();

    const btnFeed = document.querySelector('#feed');
    const btnPlay = document.querySelector('#play');
    const btnSleep = document.querySelector('#sleep');
    const btnWash = document.querySelector('#wash');

    btnFeed.addEventListener('click', () => myCat.feed());
    btnPlay.addEventListener('click', () => myCat.play());
    btnSleep.addEventListener('click', () => myCat.sleep());
    btnWash.addEventListener('click', () => myCat.wash());
    
    // update info
    setInterval( () =>{
        myCat.update();
    }, 500);
    
    // bars depleat
    setInterval( () =>{
        myCat.energy = myCat.energy - 1;
        myCat.happiness = myCat.happiness - 1;
        myCat.hunger = myCat.hunger - 1;
        myCat.clean = myCat.clean - 1;
    }, 3000);
}