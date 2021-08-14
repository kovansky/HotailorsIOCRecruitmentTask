import { AxiosInstance, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { IApiService } from "./IApiService";
import { IType } from "./types/IType";

@injectable()
export class ApiService implements IApiService<IType> {
  @inject(COMMON_TYPES.AxiosInstance)
  private readonly _axios: AxiosInstance;

  public async type(name: string): Promise<IType> {
    const type: AxiosResponse<IType> = await this._axios.get<IType>(
      `/type/${name}`,
    );

    return type.data;
  }
}
