import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useBeerListStore } from "./Store/store";
import { Beer } from "./Types/Beer";
import { ProductItem } from "./components/ProductItem";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const ITEMS_PER_PAGE = 5;

let count = 1;

function App() {
  const currentPage = useBeerListStore((state) => state.currentPage);
  const beers = useBeerListStore((state) => state.beers);
  const fetchBeers = useBeerListStore((state) => state.fetchBeers);

  useEffect(() => {
    fetchBeers(count);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, fetchBeers]);

  const handleBeerSelect = (event: React.MouseEvent<HTMLDivElement>, selectedBeer: Beer) => {
    event.preventDefault(); // Забороняємо типову поведінку контекстного меню
    const updatedBeers = beers.map((beer) =>
      beer.id === selectedBeer.id ? { ...beer, selected: !beer.selected } : beer
    );
    useBeerListStore.setState({ beers: updatedBeers });
  };

  const handleDeleteSelected = () => {
    const selectedBeers = beers.filter((beer) => !beer.selected);
    useBeerListStore.setState({ beers: selectedBeers });
  };

  const showDeleteButton = beers.some((beer) => beer.selected);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBeers = beers.slice(startIndex, endIndex);

  if (beers.length < 15) {
    count += 1;
  }

  return (
    <div>
      <Header />
      <div className="main">
        {showDeleteButton && (
          <button className="delete-button" onClick={handleDeleteSelected}>
            Delete
          </button>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ProductList beers={paginatedBeers} onBeerSelect={handleBeerSelect} />
            }
          />
          <Route path="/:id" element={<ProductItem />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
