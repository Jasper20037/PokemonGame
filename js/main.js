// Lecture

const url = 'https://pokeapi.co/api/v2/pokemon';

function fetchPokemonData(pokemonID){
    const apiUrl = `${url}/${pokemonID}`;
    return fetch(apiUrl)
    // (.then is a promise)
        .then(response => {
            if(!response.ok){
                throw new Error(`Data fetch failed! (ID: ${pokemonID})`);
            }
            return response.json();
        })
}

// Pokemon card content 
function updatePokemonCard(cardElement, pokemonData) {
    if(pokemonData){
        cardElement.querySelector('h2').textContent = pokemonData.species.name;
        cardElement.querySelector('img').src = pokemonData.sprites.front_default;
        cardElement.querySelector('img').alt = pokemonData.species.name;
        cardElement.querySelector('span').textContent = "hp" + pokemonData.stats[0].base_stat + " "  + pokemonData.types[0].type.name;

        // Add attacks to attacks div
        const attacksDiv = cardElement.querySelector('.attacks');
        const abilities = pokemonData.abilities;
        abilities.forEach(abilityData => {
            const abilityP = document.createElement('p');
            abilityP.textContent = abilityData.ability.name;
            attacksDiv.appendChild(abilityP);            
        });
        
        // Get pokemon type (for background color)
        const pokemonType = pokemonData.types[0].type.name;
        cardElement.querySelector('.pokemon').classList.add(pokemonType);
    }
}

// Fetch data and update it for 2 random pokemon
function displayRandomPokemon(){
    cardElements = document.querySelectorAll('.pokecard');
    
    for (let i =0; i < cardElements.length; i++){
        // Get random pokemon ID    
        const randomPokemonID = Math.floor(Math.random() * 151) + 1;

        // Get pokemon data from specific ID
        fetchPokemonData(randomPokemonID)
            .then(pokemonData => updatePokemonCard(cardElements[i], pokemonData))
            .catch(error => console.log(error.message));
    }
}

// Event listener for onload
window.addEventListener('load', displayRandomPokemon);

