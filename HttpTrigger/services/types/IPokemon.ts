import { IPokemonTypeWrapper } from "./IPokemonTypeWrapper";

export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: object[];
  forms: object[];
  game_indices: object[];
  held_items: object[];
  location_area_encounters: string;
  moves: object[];
  species: object;
  sprites: object;
  stats: object[];
  types: IPokemonTypeWrapper[];
}
