import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
      private readonly pokemonService: PokemonService,
      private readonly http: AxiosAdapter,
  ){}

  async runSeed() {

    await this.pokemonService.removeAll();

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //const insertPromisesArray = [];
    const pokemonsToInsert: CreatePokemonDto[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length-2];

      //await this.pokemonService.create({name, no});

      // insertPromisesArray.push(
      //   this.pokemonService.create({name, no})
      // );
      pokemonsToInsert.push({name, no});

    });

    //const newArray = await Promise.all(insertPromisesArray);
    await this.pokemonService.createMany(pokemonsToInsert);

    return data.results;
  }

}
