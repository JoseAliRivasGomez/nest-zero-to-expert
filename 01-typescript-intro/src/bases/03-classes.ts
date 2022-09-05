import axios from 'axios';
import { Move, PokeAPIResponse } from '../interfaces/pokeapi-response.interface';

export class Pokemon {

    private id: number;
    private name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

}

export class Character {

    constructor(
        public readonly id: number, 
        public name: string,
    ) {
        this.speak();
    }

    get imageUrl(): string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    scream() {
        console.log(`${this.name.toUpperCase()}`);
    }

    private speak() {
        console.log(`${this.name}`);
    }

    async getMoves(): Promise<Move[]> {

        const {data} = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/4');

        return data.moves;
    }

}


export const pokemon1 = new Pokemon(1, 'Kim');

console.log(pokemon1);

export const character1 = new Character(1, 'Jimmy');
character1.name = 'James';

console.log(character1);

character1.scream();

console.log(await character1.getMoves());
