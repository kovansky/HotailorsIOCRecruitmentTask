export interface IFunctionService<T> {
  parsePokemons(ids: string, type: string): Promise<any>;
}
