import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { Link } from "react-router-dom";

import RecipeCard from "./RecipeCard";
// import axios from "axios";

function Main() {
  const {
    beers,
    selectedBeers,
    selectBeer,
    deselectBeer,
    deleteSelected,
    setBeers,
    // addBeer,
  } = useStore();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const [visibleRecipes, setVisibleRecipes] = useState(beers.slice(0, 5));

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=15`)
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
        setVisibleRecipes(data.slice(0, 5));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [page, setBeers]);

  useEffect(() => {
    if (loadMoreRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      observer.observe(loadMoreRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const handleBeerSelection = (
    beerId: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const selected = selectedBeers.includes(beerId);
    selected ? deselectBeer(beerId) : selectBeer(beerId);
  };

  const handleDeleteSelected = () => {
    deleteSelected();
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setVisibleRecipes((prevVisibleRecipes) => {
          const newVisibleRecipes = beers.slice(
            prevVisibleRecipes.length,
            prevVisibleRecipes.length + 5
          );
          return [...prevVisibleRecipes, ...newVisibleRecipes];
        });
      }
    }
  };

  // const handleAddNewBeer = () => {
  //   const newBeer = {
  //     id: Date.now(),
  //     name: "New Beer",
  //     description: "This is a new beer added dynamically.",
  //   };
  //   addBeer(newBeer);
  // };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {visibleRecipes.map((beer) => (
        <div
          key={beer.id}
          onContextMenu={(event) => handleBeerSelection(beer.id, event)}
        >
          <Link to={`/beer/${beer.id}`}>
            <RecipeCard
              recipe={beer}
              isSelected={selectedBeers.includes(beer.id)}
            />
          </Link>
        </div>
      ))}
      {selectedBeers.length > 0 && (
        <div className="fixed bottom-0 right-0 p-4">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
      <div ref={loadMoreRef}></div>
    </div>
  );
}

export default Main;
