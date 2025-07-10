import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(private readonly http: HttpService) {}

  executeSeed() {
    const pokemons = this.http
      .get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      .pipe(
        map((resp) => {
          return resp.data.results.forEach(({ name, url }) => {
            const segments = url.split('/');
            const no: number = +segments[segments.length - 2];

            console.log({ name, no });
          });
        }),
      );

    return pokemons;
  }
}
