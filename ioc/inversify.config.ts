import "reflect-metadata";
import { Container } from "inversify";
import { COMMON_TYPES } from "./commonTypes";

import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { IFunctionService } from "../HttpTrigger/services/IFunctionService";
import { FunctionService } from "../HttpTrigger/services/FunctionService";
import { IApiService } from "../HttpTrigger/services/IApiService";
import { ApiService } from "../HttpTrigger/services/ApiService";
import { AxiosInstance } from "axios";
import { getAxiosConfiguration } from "../commonServices/axiosConfiguration";
import { IType } from "../HttpTrigger/services/types/IType";

const getContainer: (() => Container) = (): Container => {
  const container: Container = new Container();

  container
    .bind<ILogger>(COMMON_TYPES.ILogger)
    .to(Logger)
    .inSingletonScope();

  container
    .bind<IFunctionService<any>>(COMMON_TYPES.IFunctionService)
    .to(FunctionService);

  container
    .bind<IApiService<IType>>(COMMON_TYPES.IApiService)
    .to(ApiService);

  container
    .bind<AxiosInstance>(COMMON_TYPES.AxiosInstance)
    .toConstantValue(getAxiosConfiguration());

  return container;
};

export default getContainer;
