export default class Cat {
    constructor (cat) {
        this.name = cat.name;
        this.breed = cat.name;
        this.description = cat.description;
        this.personality = cat.personality;
        this.powerLevel = cat.powerLevel;
        this.type = cat.type;
        this.favFood = cat.favFood;
        this.memento = cat.memento;
        this.favGoodies = cat.favGoodies;

        this.energy = 100;
        this.happiness = this.randomNum(40, 100);
        this.hunger = this.randomNum(40, 100);
        this.clean = this.randomNum(40, 100);
        this.info = '';
        this.points = 0;
    }

    setup () {    
        this.catPic = document.getElementById('cat-pic');
        this.catItem = document.getElementById('item');
        this.energyBar = document.getElementById('energy');
        this.happinessBar = document.getElementById('happiness');
        this.hungerBar = document.getElementById('hunger');
        this.cleanBar = document.getElementById('cleanliness');
        this.infoElement = document.getElementById('info');

        this.energyBar.style.width = `${this.energy}%`;
        this.happinessBar.style.width = `${this.happiness}%`;
        this.hungerBar.style.width = `${this.hunger}%`;
        this.cleanBar.style.width = `${this.clean}%`;
    }

    randomNum(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    feed () {
        if (this.hunger > 70) {
            this.info = `${this.name} isnt hungry right now`;
        }
        else if (this.clean > 10) {
            this.hunger += 30;
            this.happiness += 20;
            this.energy += 10;
            this.clean -= 10;
            this.points += 5;
            this.info = `You gave ${this.name} some food. They liked it!`;
        }
        else {
            this.info = `${this.name} needs a bath!`;
        }
    }

    play () {
        if (this.energy > 20 && this.happiness < 75) {
            this.happiness += 25;
            this.energy -= 20;
            this.clean -= 30;
            this.hunger -= 20;
            this.points += 5;
            this.info = `${this.name} enjoys playing with you`;
        }
        else if (this.happiness >= 75) {
            this.info = `${this.name} is content. You shouldnt disturb them right now`;
        }
        else if (this.clean <= 30) {
            this.info = `${this.name} needs a bath!`;
        }
        else if (this.energy <= 20) {
            this.info = `${this.name} is too tired to play right now`;
        }
    }

    sleep () {
        if (this.energy >= 50) {
            this.info = `${this.name} is not tired yet!`;
            this.catPic.setAttribute('src', `images/cats/${this.breed}-idle.png`);
            this.catItem.setAttribute('class', 'default');
        }
        else {
            // gradually increase energy, decrease hunger + cleanliness
            //catPic.setAttribute('src', `images/cats/${this.breed}-sleep.png`);
            this.catItem.setAttribute('class', 'sleeping');
            
            let sleeping = setInterval( () =>{
                this.energy += 10;
                this.energyBar.style.width = `${this.energy}%`;
                this.info = `${this.name} is resting...`;
                //catPic.setAttribute('src', `images/cats/${this.breed}-sleep.png`);
                // disable buttons
                document.getElementById('feed').disabled = true;
                document.getElementById('play').disabled = true;
                document.getElementById('sleep').disabled = true;
                document.getElementById('wash').disabled = true;
            }, 1000);
            
            setTimeout( () =>{
                clearInterval(sleeping);
                this.catPic.setAttribute('src', `images/cats/${this.breed}-idle.png`);
                this.info = `${this.name} had a good rest`;
                document.getElementById('feed').disabled = false;
                document.getElementById('play').disabled = false;
                document.getElementById('sleep').disabled = false;
                document.getElementById('wash').disabled = false;
            }, 5000);
        }
    }

    wash () {
        if (this.clean > 70) {
            this.info = `${this.name} doesnt need cleaning right now`;
        }
        else if (this.happiness < 20) {
            this.energy -= 20;
            this.clean += 45;
            this.points += 5;
            this.info = `You washed ${this.name}. They didnt like the water, but at least theyre clean!`;
        }
        else if (this.energy < 20) {
            this.info = `${this.name} is too tired to be bathed`;
        }
        else {
            this.happiness -= 20;
            this.energy -= 20;
            this.clean += 30;
            this.info = `You washed ${this.name}. They didnt like the water, but at least theyre clean!`;
        }
    }

    pet () {
        this.catItem.className = 'pet';
        this.catItem.style.AnimationPlayState = 'running';
        this.catItem.style.WebkitAnimationPlayState = 'running';
        this.points += 1;
        setTimeout( () =>{
            this.catItem.style.AnimationPlayState = 'paused';
            this.catItem.style.WebkitAnimationPlayState = 'paused';
            this.catItem.className = 'default';
        }, 1000);
    }

    checkBar (bar, percent){    
        if(percent < 50){
            bar.style.backgroundColor = 'yellow';
            bar.className = 'bar'; // reset alert
        }
        if(percent < 35){
            bar.style.backgroundColor = 'orange';
            bar.className = 'bar alert';
            
            if(bar === this.energyBar){
                this.info = 'Your cats energy is low. Tuck them into bed!';
            }
            else if(bar === this.hungerBar){
                this.info = 'Your cat is hungry. Give them some food!';
            }
            else if(bar === this.happinessBar){
                this.info = 'Your cat is unhappy. Play with them!';
            }
            else if(bar === this.cleanBar){
                this.info = 'Your cat is all dirty. Give them a bath!';
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
            
            if(bar === this.energyBar){
                this.catPic.setAttribute('src', `images/cats/${this.breed}-idle.png`);
            }
        }
    }

    update () {
        this.infoElement.innerHTML = this.info;
        this.energyBar.style.width = `${this.energy}%`;
        this.happinessBar.style.width = `${this.happiness}%`;
        this.hungerBar.style.width = `${this.hunger}%`;
        this.cleanBar.style.width = `${this.clean}%`;
        
        this.checkBar(this.energyBar, this.energy);
        this.checkBar(this.happinessBar, this.happiness);
        this.checkBar(this.hungerBar, this.hunger);
        this.checkBar(this.cleanBar, this.clean);

        if(this.points >= 100){
            this.infoElement.innerHTML = `Congratulations! You earned ${this.name}'s memento, ${this.memento}!`;
            // add to inventory
            // add to top right of cat profile
        }
        
        // reset so bars dont exceed 100
        if (this.energy > 100){
            this.energy = 100;
        }else if(this.happiness > 100){
            this.happiness = 100;
        }else if (this.hunger > 100){
            this.hunger = 100;
        }else if (this.clean > 100){
            this.clean = 100;
        }
    }
}