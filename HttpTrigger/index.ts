import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { IFunctionService } from "./services/IFunctionService";
import { Container } from "inversify";

const httpTrigger: AzureFunction = async (
  ctx: Context,
  req: HttpRequest,
): Promise<any> => {
  const container: Container = getContainer();
  const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
  logger.init(ctx, "1");

  const functionService: IFunctionService<any> = container.get<
    IFunctionService<any>
  >(COMMON_TYPES.IFunctionService);

  let response: any;
  if (
    req.query.id !== undefined && req.query.id.length > 0 &&
    req.query.type !== undefined && req.query.type.length > 0
  ) {
    response = await functionService.parsePokemons(
      req.query.id,
      req.query.type,
    );
  } else {
    response = { pokemons: [] };
  }

  ctx.res = {
    body: response,
    status: 200,
    headers: { "Content-Type": "application/json" },
  };
  return ctx.res;
};

export default httpTrigger;
