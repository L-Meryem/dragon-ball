//Goal: Use data returned from one api to make a request to another api and display the data returned

//I want to display dragon ball characters
// but the descriptions are in spanish..
// Translator API to the rescue!!!
getCharacters();
function getCharacters() {
    for (let i = 1; i <= 6; i++) {
           const dbUrl = `https://dragonball-api.com/api/characters?page=${i}&limit=10`;

    fetch(dbUrl)
        .then(res => res.json())
        .then(data => {
            data.items.forEach(character => {
                const { name, race, ki, description, img } = createCard();
                name.innerText = character.name;
                race.innerText = character.race;
                ki.innerText = `KI: ${character.ki}`;
                img.src = character.image;
                img.alt = character.name;
                description.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident eaque corporis fugiat, excepturi, alias nulla incidunt blanditiis explicabo accusamus, rerum quos eligendi rem. Laborum, ducimus tenetur praesentium eveniet cumque sequi?';
                //Translate the description
                const srcLang = 'auto';
                const desLang = 'en';
                const translatorUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${srcLang}&tl=${desLang}&q=${character.description}`;
                fetch(translatorUrl)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        description.innerText = data[0][0];
                    })
                    .catch(error => console.log(error));
            });
        })
        .catch(error => console.log(error));
    }
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
    const ki = document.createElement('span');
    ki.className = 'ki';
    const description = document.createElement('span');
    description.className = 'description';
    const img = document.createElement('img');
    img.src = '';
    img.alt = '';
    //Adding style
    div.classList.add('card');
    img.classList.add('image');
    //Connect tags
    profile.append(name, race, ki)
    div.append(profile, img, description);
    cards.append(div);
    //return tags as an {} to diconstruct
    return { name, race, ki, description, img };
}

function clearPage(){
    document.querySelector('.cards').innerHTML = ""
}
