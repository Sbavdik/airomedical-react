import { Beer } from "./Types/Beer";


export const getAllBeers = async (count: number): Promise<Beer[]> => {
const apiAllBeers = `https://api.punkapi.com/v2/beers?page=${count}`;

    return fetch(apiAllBeers)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
  
        return response.json();
    });
};
