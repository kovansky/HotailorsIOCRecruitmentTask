export interface IApiService<T> {
  type(name: string): Promise<T>;
}
