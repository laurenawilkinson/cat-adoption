// variables
let game = document.getElementById('game'),
    starters,
    catArray = [
        {
            name: 'Snowball',
            description: 'Solid White',
            personality: 'Mellow',
            powerLevel: '80',
            type: 'Regular',
            favFood: 'Any',
            memento: 'Flowered Collar',
            favGoodies: []
        },
        {
            name: 'Smokey',
            description: 'Solid Black',
            personality: 'Hot and Cold',
            powerLevel: '140',
            type: 'Regular',
            favFood: 'Any',
            memento: 'Soft Brush',
            favGoodies: []
        },
        {
            name: 'Spots',
            description: 'Black and White',
            personality: 'Joker',
            powerLevel: '75',
            type: 'Regular',
            favFood: 'Any',
            memento: 'Glow Bracelet',
            favGoodies: []
        },
        {
            name: 'Shadow',
            description: 'Solid Grey',
            personality: 'Peculiar',
            powerLevel: '50',
            type: 'Regular',
            favFood: 'Any',
            memento: 'Cicada Skin',
            favGoodies: []
        },
        {
            name: 'Joe DiMeowgio',
            description: 'Baseball Jersey',
            personality: 'Team Player',
            powerLevel: '28',
            type: 'Rare',
            favFood: 'Any',
            memento: 'Baseball',
            favGoodies: []
        },
        {
            name: 'Senor Don Gato',
            description: 'Mustachioed',
            personality: 'Scheming',
            powerLevel: '30',
            type: 'Rare',
            favFood: 'Any',
            memento: 'Feathered Hat',
            favGoodies: []
        },
        {
            name: 'Xerxes IX',
            description: 'Persian',
            personality: 'Regal',
            powerLevel: '70',
            type: 'Rare',
            favFood: 'Any',
            memento: 'Pretty Stones',
            favGoodies: []
        },
        {
            name: 'Chairman Meow',
            description: 'Camouflage',
            personality: 'Boorish',
            powerLevel: '111',
            type: 'Rare',
            favFood: 'Any',
            memento: 'Dog Tag',
            favGoodies: []
        }
      ],
    myCat,
    starterElement,
    hungerBar,
    energyBar,
    happinessBar,
    cleanBar,
    catPic,
    catItem;

start();

let catMarquee = document.getElementById('marquee');

for(let i = 0, l = catArray.length; i < l; i++){
    catMarquee.innerHTML += `<img src="images/cats/${catArray[i].name}-idle.png" />`
}

catMarquee.style.width = (catArray.length * 150) + 'px';

function start(){
    // on pageload
    game.innerHTML = '';
    starters = new Set();

    // until starters.length === 3, add random catArray objects 
    while(starters.size < 3){    
        let random = Math.floor(Math.random() * catArray.length),
            starterCat = catArray[random];

        starters.add(catArray[random]);
    }

    if(starters.size === 3){
        getStarter();
    }
}

// functions
function getStarter(){
    // into array
    starters = Array.from(starters);
    console.log(starters);
    
    game.innerHTML = `<h2 class="heading">Choose your cat!</h2>`;
    
    // itterate over starters to input html
    for (let starter of starters){
        if(starter.type === 'Rare'){
            starterElement = `<div class="starter-tile" id="${starter.name}">
                                <img src="images/cats/${starter.name}.png"></img>
                                <div class="starter-content">
                                    <h3>${starter.name}</h3>
                                    <small><strong>Personality:</strong> ${starter.personality}<br>
                                    <strong>Description:</strong> ${starter.description}</small><div class="rare">RARE</div>
                                </div>`;
        }
        else{
            starterElement = `<div class="starter-tile" id="${starter.name}">
                                <img src="images/cats/${starter.name}.png"></img>
                                <div class="starter-content">
                                    <h3>${starter.name}</h3>
                                    <small><strong>Personality:</strong> ${starter.personality}<br>
                                    <strong>Description:</strong> ${starter.description}</small>
                                </div>`;
        }
        
        game.innerHTML = game.innerHTML + starterElement;
    }
    
    
    
     game.innerHTML += `<p class="cat-button" onclick="start()">Refresh</p>`;
    
    // itterate again to add click event
    starters.forEach(function (item, idx){
        let starterId = document.getElementById(`${item.name}`);
        starterId.addEventListener('click', () =>{
            chosenStarter(item);
        });
    });
   
}

function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function chosenStarter(item){
    myCat = item;
    catMarquee.style.display = 'none';
    
    game.innerHTML = `<h2 class="heading">Congratulations! Your chosen starter is ${myCat.name}</h2>
                    <p>If you would like to <strong>change</strong> your cats name, type a name below and press enter</p>
                    <p>If you want to keep the name <strong>${myCat.name}</strong>, press enter to continue</p>
                    <input type="text" id="chooseName" placeholder="enter a name for your cat" maxlength="16" autofocus>`;
    let nameInput = document.getElementById('chooseName');
    
    // set char limit
    nameInput.addEventListener("keyup", function(e) {
          e.preventDefault();
          if (e.keyCode === 13) {
              
              if(nameInput.value === ''){
                  myCat.breed = myCat.name;
                  startGame(myCat);
              }
              else{
                  myCat.breed = myCat.name;
                  myCat.name = nameInput.value;
                  startGame(myCat);
              }
          }
    });
}

function startGame(myCat){    
    // set game properties
    myCat.energy = 100;
    myCat.happiness = randomNum(40, 100);
    myCat.hunger = randomNum(40, 100);
    myCat.clean = randomNum(40, 100);
    myCat.info = `${myCat.name} is happy and healthy! :)`;
    myCat.feed = () => {
        if(myCat.hunger > 70){
            myCat.info = `${myCat.name} isnt hungry right now`;
        }
        else if(myCat.clean > 10){
            myCat.hunger += 30;
            myCat.happiness += 20;
            myCat.energy += 10;
            myCat.clean -= 10;
            myCat.info = `You gave ${myCat.name} some food. They liked it!`;
            console.log(hungerBar.onclick);
        }
        else{
            myCat.info = `${myCat.name} needs a bath!`;
        }
    };
    myCat.play = () => {
        if(myCat.energy > 20 && myCat.happiness < 75){
            myCat.happiness += 25;
            myCat.energy -= 20;
            myCat.clean -= 30;
            myCat.hunger -= 20;
            myCat.info = `${myCat.name} enjoys playing with you`;
        }
        else if(myCat.happiness >= 75){
            myCat.info = `${myCat.name} is content. You shouldnt disturb them right now`;
        }
        else if(myCat.clean <= 30){
            myCat.info = `${myCat.name} needs a bath!`;
        }
        else if(myCat.energy <= 20){
            myCat.info = `${myCat.name} is too tired to play right now`;
        }
    };
    myCat.sleep = () => {
        if(myCat.energy >= 50){
            myCat.info = `${myCat.name} is not tired yet!`;
            catPic.setAttribute('src', `images/cats/${myCat.breed}-idle.png`);
            catItem.setAttribute('class', 'default');
        }
        else{
            // gradually increase energy, decrease hunger + cleanliness
            //catPic.setAttribute('src', `images/cats/${myCat.breed}-sleep.png`);
            catItem.setAttribute('class', 'sleeping');
            
            let sleeping = setInterval( () =>{
                myCat.energy += 10;
                energyBar.style.width = `${myCat.energy}%`;
                myCat.info = `${myCat.name} is resting...`;
                //catPic.setAttribute('src', `images/cats/${myCat.breed}-sleep.png`);
                // disable buttons
                document.getElementById('feed').disabled = true;
                document.getElementById('play').disabled = true;
                document.getElementById('sleep').disabled = true;
                document.getElementById('wash').disabled = true;
            }, 1000);
            
            setTimeout( () =>{
                clearInterval(sleeping);
                catPic.setAttribute('src', `images/cats/${myCat.breed}-idle.png`);
                myCat.info = `${myCat.name} had a good rest`;
                document.getElementById('feed').disabled = false;
                document.getElementById('play').disabled = false;
                document.getElementById('sleep').disabled = false;
                document.getElementById('wash').disabled = false;
            }, 5000);
        }
    };
    myCat.wash = () => {
        if(myCat.clean > 55){
            myCat.info = `${myCat.name} doesnt need cleaning right now`;
        }
        else if(myCat.happiness < 20){
            myCat.energy -= 20;
            myCat.clean += 45;
            myCat.info = `You washed ${myCat.name}. They didnt like the water, but at least theyre clean!`;
        }
        else if(myCat.energy < 20){
            myCat.info = `${myCat.name} is too tired to be bathed`;
        }
        else{
            myCat.happiness -= 20;
            myCat.energy -= 20;
            myCat.clean += 45;
            myCat.info = `You washed ${myCat.name}. They didnt like the water, but at least theyre clean!`;
        }
    }
    myCat.pet = () => {        
        catItem.className = 'pet';
        catItem.style.AnimationPlayState = 'running';
        catItem.style.WebkitAnimationPlayState = 'running';
        setTimeout( () =>{
            catItem.style.AnimationPlayState = 'paused';
            catItem.style.WebkitAnimationPlayState = 'paused';
            catItem.className = 'default';
        }, 1000);
    }
    
    // html elements
    game.innerHTML = `<div class="col left-col">
                        <h2>${myCat.name}</h2>
                        <div class="default" id="item"></div>
                        <img src="images/cats/${myCat.breed}-idle.png" id="cat-pic" onclick="myCat.pet()">
                        <p><h3>Purrsonality:</h3> ${myCat.personality}</p>
                        <p><h3>Description:</h3> ${myCat.description}</p>
                        <p><h3>Power Lvl:</h3> ${myCat.powerLevel}</p>
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
                                <button class="cat-button" id="feed" onclick="myCat.feed()">Feed</button></li>
                                <li>
                                <button class="cat-button" id="play" onclick="myCat.play()">Play</button></li>
                                <li>
                                <button class="cat-button" id="sleep" onclick="myCat.sleep()">Sleep</button></li>
                                <li>
                                <button class="cat-button" id="wash" onclick="myCat.wash()">Wash</button></li>
                                <li id="shop"><img src="images/assets/shop-btn.png" width="50px" height="50px"></li>
                            </ul>
                        </div>
                    </div>`;
    
    catPic = document.getElementById('cat-pic');
    catItem = document.getElementById('item');
    energyBar = document.getElementById('energy');
    happinessBar = document.getElementById('happiness');
    hungerBar = document.getElementById('hunger');
    cleanBar = document.getElementById('cleanliness');
    info = document.getElementById('info');
    energyBar.style.width = `${myCat.energy}%`;
    happinessBar.style.width = `${myCat.happiness}%`;
    hungerBar.style.width = `${myCat.hunger}%`;
    cleanBar.style.width = `${myCat.clean}%`;
    
    // update info
    setInterval( () =>{
        info.innerHTML = myCat.info;
        energyBar.style.width = `${myCat.energy}%`;
        happinessBar.style.width = `${myCat.happiness}%`;
        hungerBar.style.width = `${myCat.hunger}%`;
        cleanBar.style.width = `${myCat.clean}%`;
        
        checkBar(energyBar, myCat.energy);
        checkBar(happinessBar, myCat.happiness);
        checkBar(hungerBar, myCat.hunger);
        checkBar(cleanBar, myCat.clean);
        
        // reset so bars dont exceed 100
        if (myCat.energy > 100){
            myCat.energy = 100;
        }else if(myCat.happiness > 100){
            myCat.happiness = 100;
        }else if (myCat.hunger > 100){
            myCat.hunger = 100;
        }else if (myCat.clean > 100){
            myCat.clean = 100;
        }
    }, 1000);
    
    // bars depleat
    setInterval( () =>{
        myCat.energy = myCat.energy - 1;
        myCat.happiness = myCat.happiness - 1;
        myCat.hunger = myCat.hunger - 1;
        myCat.clean = myCat.clean - 1;
    }, 3000);
}

function checkBar (bar, percent){    
    
    if(percent < 50){
        bar.style.backgroundColor = 'yellow';
        bar.className = 'bar'; // reset alert
    }
    if(percent < 35){
        bar.style.backgroundColor = 'orange';
        bar.className = 'bar alert';
        
        if(bar === energyBar){
            myCat.info = 'Your cats energy is low. Tuck them into bed!';
        }
        else if(bar === hungerBar){
            myCat.info = 'Your cat is hungry. Give them some food!';
        }
        else if(bar === happinessBar){
            myCat.info = 'Your cat is unhappy. Play with them!';
        }
        else if(bar === cleanBar){
            myCat.info = 'Your cat is all dirty. Give them a bath!';
        }
    }
    if(percent < 15){
        bar.style.backgroundColor = 'red';
    }
    if(percent < 2){
        bar.style.width = '1%';
    }
    if(percent >= 50){
        // reset
        bar.style.backgroundColor = 'green';
        bar.className = 'bar';
        
        if(bar === energyBar){
            catPic.setAttribute('src', `images/cats/${myCat.breed}-idle.png`);
        }
    }
}