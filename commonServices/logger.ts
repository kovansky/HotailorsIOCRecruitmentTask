import { injectable } from "inversify";
import { Context } from "@azure/functions";
import { ILogger } from "./iLogger";

@injectable()
export class Logger implements ILogger {
  private _ctx: Context;
  private _processId: string;

  public init(ctx: Context, processId: string): void {
    this._ctx = ctx;
    this._processId = processId;
  }

  public error(message: any): void {
    this._ctx.log.error(`${message}, processId: ${this._processId}`);
  }

  public warn(message: any): void {
    this._ctx.log.warn(`${message}, processId: ${this._processId}`);
  }

  public info(message: any): void {
    this._ctx.log.info(`${message}, processId: ${this._processId}`);
  }

  public verbose(message: any): void {
    this._ctx.log.verbose(`${message}, processId: ${this._processId}`);
    this._ctx.log.verbose(message);
  }
}
