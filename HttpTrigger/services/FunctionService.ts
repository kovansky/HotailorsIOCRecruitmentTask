import { inject, injectable } from "inversify";
import { IFunctionService } from "./IFunctionService";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { ILogger } from "../../commonServices/iLogger";
import { IApiService } from "./IApiService";
import { IPokemon } from "./types/IPokemon";
import _ from "lodash";

@injectable()
export class FunctionService implements IFunctionService<any> {
  @inject(COMMON_TYPES.ILogger)
  private readonly _logger: ILogger;
  @inject(COMMON_TYPES.IApiService)
  private readonly _api: IApiService<IPokemon>;

  public async parsePokemons(ids: string, type: string): Promise<any> {
    this._logger.info(`IDs: ${ids}, type: ${type}`);

    const numericIds: number[] = _.filter(
      _.map(ids.split(","), (id) => +id), // Try to convert each value from string to number
      (id) => !isNaN(id), // Get rid of failed values (NaNs, were strings)
    );

    const matchingPokemons: string[] = Array<string>();
    type = type.toLowerCase();

    for (const id of numericIds) {
      // Catch every pokemon from API
      await this._api.pokemon(id).then((pokemon) => {
        // Check, if pokemon is of requested type
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
        // Pokemon not found
        .catch(() => {
          this._logger.verbose(`Pokemon with id ${id} not found`);
        });
    }

    return { pokemons: matchingPokemons };
  }
}
