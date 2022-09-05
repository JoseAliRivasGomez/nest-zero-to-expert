

export const pokemonIds = [1,2,3,4,5];

pokemonIds.push(+'6'); //convierte string a number

interface Pokemon {
    id: number;
    name: string;
    age?: number;
}

export const pokemon1: Pokemon = {
    id: 1,
    name: 'Kim',
}

export const pokemons: Pokemon[] = [];

pokemons.push(pokemon1);

console.log(pokemonIds);

console.log(pokemon1);

console.log(pokemons);

