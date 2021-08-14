export interface IApiService<T> {
  pokemon(id: number): Promise<T>;
}
