import create from "zustand";
import { Beer } from "../types";
import { devtools } from "zustand/middleware";
type MyStore = {
  counter: number;
  increment: () => void;
  decrement: () => void;
  beers: Beer[];
  selectedBeers: number[];
  selectBeer: (beerId: number) => void;
  deselectBeer: (beerId: number) => void;
  deleteSelected: () => void;
  setBeers: (beers: Beer[]) => void;
  addBeer: (beer: Beer) => void;
};

export const useStore = create<MyStore>()(
  devtools((set) => ({
    counter: 0,
    increment: () => set((state) => ({ counter: state.counter + 1 })),
    decrement: () => set((state) => ({ counter: state.counter - 1 })),

    //   beer
    beers: [],
    selectedBeers: [],
    setBeers: (beers: Beer[]) => set({ beers }),
    addBeer: (beer: Beer) =>
      set((state) => ({ beers: [...state.beers, beer] })),
    selectBeer: (beerId: number) =>
      set((state) => ({
        selectedBeers: [...state.selectedBeers, beerId],
      })),
    deselectBeer: (beerId: number) =>
      set((state) => ({
        selectedBeers: state.selectedBeers.filter((id) => id !== beerId),
      })),
    deleteSelected: () =>
      set((state) => ({
        beers: state.beers.filter(
          (beer) => !state.selectedBeers.includes(beer.id)
        ),
        selectedBeers: [],
      })),
  }))
);
