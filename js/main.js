//Goal: Use data returned from one api to make a request to another api and display the data returned

getCharacters();
document.querySelector('button').addEventListener('click', getCharacters);

function getCharacters() {
    clearPage();
    const fighterOne = randomCharacter();
    const fighterTwo = randomCharacter(fighterOne);

    fetch(`https://dragonball-api.com/api/characters/${fighterOne}`)
        .then(res => res.json())
        .then(characterOne => {

            const { name, race, description, img, imgContainer } = createCard();
            name.innerText = characterOne.name;
            race.innerText = characterOne.race;
            img.src = characterOne.image;
            img.alt = characterOne.name;
            description.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident eaque corporis fugiat, excepturi, alias nulla incidunt blanditiis explicabo accusamus, rerum quos eligendi rem. Laborum, ducimus tenetur praesentium eveniet cumque sequi?';

            //Translate the description
            const srcLang = 'auto';
            const desLang = 'en';
            const translatorUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${srcLang}&tl=${desLang}&q=${characterOne.description}`;
            fetch(translatorUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    description.innerText = data[0][0];
                })
            .catch(error => console.log(error));

            fetch(`https://dragonball-api.com/api/characters/${fighterTwo}`)
                .then(res => res.json())
                .then(characterTwo => {

                    const { name, race, description, img } = createCard();
                    name.innerText = characterTwo.name;
                    race.innerText = characterTwo.race;
                    img.src = characterTwo.image;
                    img.alt = characterTwo.name;
                    description.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident eaque corporis fugiat, excepturi, alias nulla incidunt blanditiis explicabo accusamus, rerum quos eligendi rem. Laborum, ducimus tenetur praesentium eveniet cumque sequi?';

                    //Translate the description
                    const srcLang = 'auto';
                    const desLang = 'en';
                    const translatorUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${srcLang}&tl=${desLang}&q=${characterTwo.description}`;
                    fetch(translatorUrl)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            description.innerText = data[0][0];
                        })
                    .catch(error => console.log(error));

                    //Compare KI
                    const characterCard = document.querySelectorAll('.card');
                    characterCard.forEach(card => card.addEventListener('click', () => {
                        const userSelect = card.querySelector('.name').innerText;
                        let winner = characterOne.ki > characterTwo.ki ? characterOne : characterTwo;
                        let answer = userSelect === winner.name ? "You're right!" : "Wrong!";
                        document.querySelector('h1').innerText = `${answer} ${winner.name}'s battle power is over ${winner.ki}!!`;
                    }));
                })
                .catch(error => console.log(error));

            //Set background
            const url = `https://dragonball-api.com/api/planets/${Math.floor(Math.random() * 7 + 1)}`;
            fetch(url)
                .then(res => res.json())
                .then(planet => {
                    const main = document.querySelector('.cards'); 
                    main.style.backgroundImage = `URL('${planet.image}')`;
                    main.style.backgroundRepeat = `no-repeat`;
                    main.style.backgroundSize = `cover`;
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

function createCard() {
    //Create a card
    const cards = document.querySelector('.cards');
    const div = document.createElement('div');
    div.className = 'card';
    //Create card's content
    const profile = document.createElement('div');
    profile.className = 'profile';
    const name = document.createElement('h2');
    name.className = 'name';
    const race = document.createElement('span');
    race.className = 'race';
    const description = document.createElement('span');
    description.className = 'description';
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    const img = document.createElement('img');
    img.src = '';
    img.alt = '';
    //Adding style
    div.classList.add('card');
    img.classList.add('image');
    //Connect tags
    profile.append(name, race)
    imgContainer.append(img);
    div.append(imgContainer, profile, description);
    cards.append(div);
    //return tags as an {} to diconstruct
    return { name, race, description, img, imgContainer };
}

function clearPage() {
    document.querySelector('.cards').innerHTML = ""
}

function randomCharacter(otherFighter = 0) {
    let random = 1;
    do {
        random = Math.floor(Math.random() * 40 + 1);
    } while (random === 36 || random === otherFighter)
    return random;
}
