import axios, { AxiosInstance } from "axios";

export function getAxiosConfiguration(): AxiosInstance {
    return axios.create({
      baseURL: "https://pokeapi.co/api/v2/",
      method: "GET",
    });
  }
