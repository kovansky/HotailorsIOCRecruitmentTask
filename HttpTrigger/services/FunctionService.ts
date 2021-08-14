import { inject, injectable } from "inversify";
import { IFunctionService } from "./IFunctionService";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { ILogger } from "../../commonServices/iLogger";
import { IApiService } from "./IApiService";
import { IPokemon } from "./types/IPokemon";
import { IPokemonTypeWrapper } from "./types/IPokemonTypeWrapper";

@injectable()
export class FunctionService implements IFunctionService<any> {
  @inject(COMMON_TYPES.ILogger)
  private readonly _logger: ILogger;
  @inject(COMMON_TYPES.IApiService)
  private readonly _api: IApiService<IPokemon>;

  public async processMessageAsync(msg: any): Promise<any> {
    this._logger.info("Hello world");
    this._logger.verbose(`${JSON.stringify(msg)}`);
    return { msg: "success" };
  }

  public async parsePokemons(ids: string, type: string): Promise<any> {
    this._logger.info(`IDs: ${ids}, type: ${type}`);

    const numericIds: number[] = ids.split(",")
      .map(
        (id) => +id, // Try to convert each value from string to number
      )
      .filter(
        (id) => !isNaN(id), // Get rid of failed values (NaNs, were strings)
      );
    const matchingPokemons: string[] = Array<string>();

    for (const id of numericIds) {
      await this._api.pokemon(id).then((pokemon) => {
        if (
          pokemon.types.some((pokemonType) => pokemonType.type.name === type)
        ) {
          matchingPokemons.push(pokemon.name);
          this._logger.verbose(
            `Pokemon ${pokemon.name}(${id}) is of type ${type}`,
          );
        } else {
          this._logger.verbose(
            `Pokemon ${pokemon.name}(${id}) is not of type ${type}`,
          );
        }
      })
        .catch((e) => {
          this._logger.verbose(`Pokemon with id ${id} not found`);
        });
    }

    return { pokemons: matchingPokemons };
  }
}
