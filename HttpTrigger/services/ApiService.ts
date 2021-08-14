import { AxiosInstance, AxiosResponse } from "axios";
import { Container, inject, injectable } from "inversify";
import { ILogger } from "../../commonServices/iLogger";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import getContainer from "../../ioc/inversify.config";
import { IApiService } from "./IApiService";
import { IPokemon } from "./types/IPokemon";

@injectable()
export class ApiService implements IApiService<IPokemon> {
  @inject(COMMON_TYPES.AxiosInstance)
  private readonly _axios: AxiosInstance;

  public async pokemon(id: number): Promise<IPokemon> {
    const pokemon: AxiosResponse<IPokemon> = await this._axios.get<IPokemon>(
      `/pokemon/${id}`,
    );

    return pokemon.data;
  }
}
