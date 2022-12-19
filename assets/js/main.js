const pokemonList = document.getElementById("pokemonList");
const pokemonDetails = document.getElementById("pokemonDetails");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
	return `
        <li class="pokemon ${pokemon.number} ${pokemon.type}">
            <span class="number" onclick="openDetails('${pokemon.number}')">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map(convertPokemonToLi).join("");
		pokemonList.innerHTML += newHtml;
	});
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
	offset += limit;
	const qtdRecordsWithNexPage = offset + limit;

	if (qtdRecordsWithNexPage >= maxRecords) {
		const newLimit = maxRecords - offset;
		loadPokemonItens(offset, newLimit);

		loadMoreButton.parentElement.removeChild(loadMoreButton);
	} else {
		loadPokemonItens(offset, limit);
	}
});

function openDetails(id) {
	console.log("Open details " + id);

	let pokemonDetail = pokeApi.getPokemonById(id);

	$(".content").css("width", "50vw");
	$(".content").css("float", "left");
	$(".details").css("display", "block");

	// let pokeDetail = `
    // <li class="pokemon  ">
    //         <span class="number" onclick="openDetails('')">#2</span>
    //         <span class="name">teste</span>

    //         <div class="detail">
    //             <ol class="types">
                    
    //             </ol>

    //             <img src=""
    //                  alt="">
    //         </div>
    //     </li>`;

	$(pokemonDetails).html(pokeDetail);
}
