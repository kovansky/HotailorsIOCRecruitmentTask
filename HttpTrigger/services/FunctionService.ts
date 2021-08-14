import { inject, injectable } from "inversify";
import { IFunctionService } from "./IFunctionService";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { ILogger } from "../../commonServices/iLogger";
import { IApiService } from "./IApiService";
import _ from "lodash";
import { IType } from "./types/IType";
import { ITypePokemonsWrapper } from "./types/ITypePokemonsWrapper";

@injectable()
export class FunctionService implements IFunctionService<any> {
  @inject(COMMON_TYPES.ILogger)
  private readonly _logger: ILogger;
  @inject(COMMON_TYPES.IApiService)
  private readonly _api: IApiService<IType>;

  public async parsePokemons(ids: string, type: string): Promise<any> {
    this._logger.info(`IDs: ${ids}, type: ${type}`);

    const numericIds: number[] = _.filter(
      _.map(ids.split(","), (id) => +id), // Try to convert each value from string to number
      (id) => !isNaN(id), // Get rid of failed values (NaNs, were strings)
    );

    const matchingPokemons: string[] = Array<string>();
    type = type.toLowerCase();

    // Catch type from API
    await this._api.type(type).then((response) => {
      // Iterate through pokemon IDs and check, if they exist in pokemon list
      _.forEach(numericIds, (id) => {
        const pokemonUrl: string = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        const find: ITypePokemonsWrapper = response.pokemon.find((pokemon) => pokemon.pokemon.url === pokemonUrl);
        if (find !== undefined) {
          matchingPokemons.push(find.pokemon.name);

          this._logger.verbose(
            `Pokemon ${find.pokemon.name}(${id}) is of type ${type}`,
          );
        } else {
          this._logger.verbose(
            `Pokemon with id ${id} is not of type ${type}`,
          );
        }
      });
    })
      // Type not found
      .catch((e) => {
        this._logger.error(e);
      });

    return { pokemons: matchingPokemons };
  }
}
