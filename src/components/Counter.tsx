import React from "react";
import { useStore } from "../store/store";

function Counter() {
  const counter = useStore((state) => state.counter);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Counter: {counter}</h1>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={increment}
        >
          Increment
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
