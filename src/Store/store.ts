import { create } from "zustand";
import { Beer } from "../Types/Beer";

interface BeerList {
  beers: Beer[];
  currentPage: number;
  totalPages: number;
  fetchBeers: (pageNumber: number) => Promise<void>;
  setCurrentPage: (pageNumber: number) => void;
}

export const useBeerListStore = create<BeerList>((set) => ({
  beers: [],
  currentPage: 1,
  totalPages: 1,
  fetchBeers: async (pageNumber: number) => {
    try {
      const ITEMS_PER_PAGE = 5;
      const apiAllBeers = `https://api.punkapi.com/v2/beers?page=${pageNumber}`;

      const response = await fetch(apiAllBeers);
      const data = await response.json();
      console.log(data);

      set((state) => ({
        beers: data.map((beer: Beer) => ({ ...beer, selected: false })),
        currentPage: pageNumber,
        totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
      }));
    } catch (error) {
      console.error("Помилка при отриманні пив:", error);
    }
  },
  setCurrentPage: (pageNumber: number) => set((state) => ({ ...state, currentPage: pageNumber })),
}));

interface BeerItem {
  selectedBeer: null | Beer;
  setSelectedBeer: (beer: Beer) => void;
}

export const useBeerItemStore = create<BeerItem>((set) => ({
  selectedBeer: null,
  setSelectedBeer: (beer: Beer) => set({ selectedBeer: beer }),
}));
