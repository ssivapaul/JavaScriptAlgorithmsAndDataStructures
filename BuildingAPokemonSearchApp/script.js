let bgColor = {
  normal: "#b7b7aa",
  fire: "#ff6f52",
  water: "#42a1ff",
  electric: "#fecc33",
  grass: "#78cc55",
  ice: "#66ccfe",
  fighting: "#d3887e",
  poison: "#c68bb7",
  ground: "#dfba52",
  flying: "#8899ff",
  psychic: "#ff66a3",
  bug: "#aabb23",
  rock: "#baaa66",
  ghost: "#9995d0",
  dragon: "#9e93f1",
  dark: "#b59682",
  steel: "#abaabb",
  fairy: "#ed99ed",
};

// Top container
const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const typesContainer = document.getElementById("types"); //(shapes)
const searchForm = document.getElementById("search-form");
//---------------------------------------------------------
const spriteContainer = document.getElementById("sprite");
//-----------------------------------------------
// Bottom container
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
//---------------------------------------------
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
//-------------------------------------------------------

const pokemonUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`;
//--------------------------------------------------------------
//searchForm.addEventListener('submit', e => {
//  e.preventDefault();
//  getPokemon();
//});
//---------------------------------------------
searchButton.addEventListener("click", () => {
  getPokemon();
});
//---------------------------------------------
const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(`${pokemonUrl}${pokemonNameOrId}`);
    const data = await response.json();

    // Top container
    let type = data.types.map((t) => t.type.name);

    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    let g2Sprite = document.getElementById("group2");
    g2Sprite.innerHTML = `<img id="sprite" src = ${data.sprites.front_default}>`;

    typesContainer.innerHTML = "";
    type.forEach((t) => {
      let span = document.createElement("span");
      span.classList.add("type"); // Apply predefined CSS class
      span.textContent = t; // Add text
      span.style.backgroundColor = bgColor[t] || "#ddd";
      typesContainer.appendChild(span);
    });

    // Bottom container
    let stat = [];
    let stats = data.stats;
    stats.forEach((s) => stat.push(s.base_stat));
    hp.textContent = stat[0];
    attack.textContent = stat[1];
    defense.textContent = stat[2];
    specialAttack.textContent = stat[3];
    specialDefense.textContent = stat[4];
    speed.textContent = stat[5];
  } catch (err) {
    alert("Pokémon not found");
    console.log(`Pokémon not found: ${err}`);
    resetDisplay();
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();
  typesContainer.innerHTML = "";
  container.innerHTML = "";
  searchInput.textContent = "";
};
