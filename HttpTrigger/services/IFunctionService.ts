import { IPokemon } from "./types/IPokemon";

export interface IFunctionService<T> {
  processMessageAsync(message: T): Promise<any>;
  parsePokemons(ids: string, type: string): Promise<any>;
}
