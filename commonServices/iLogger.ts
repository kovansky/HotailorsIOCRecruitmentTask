export interface ILogger {
    error(message: any): void;
    warn(message: any): void;
    info(message: any): void;
    verbose(message: any): void;
}
